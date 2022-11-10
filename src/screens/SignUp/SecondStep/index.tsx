import { NavigationProp, ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import react, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from 'styled-components';
import { BackButon } from '../../../components/BackButon';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { PasswordInput } from '../../../components/PasswordInput';

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle
} from './styles'


interface Params{
    user: {
        name: string;
        email:string;
        driveLicence: string;
    }
}

export function SecondStep(){
    const navigate = useNavigation<NavigationProp<ParamListBase>>()
    const route = useRoute()
    const {user} = route.params as Params

    const theme = useTheme()

    const [senha, setSenha] = useState('')
    const [confSenha, setConfSenha] = useState('')

    function handleBack(){
        navigate.goBack()
    }

    function handleNextStep(){
        navigate.navigate('SecondStep')
    }

    function handleRegister(){
       if(!senha || !confSenha){
        return Alert.alert('Informe a senha e a confirmação')
       }
       if(senha != confSenha){
        return Alert.alert('As senhas não são iguais!')
       }

       //Enviar para Api e cadastrar e chamar a tela de conf cadastro
       navigate.navigate('Confirmation', {
        title: 'Conta Criada',
        mensage: `Agora é só fazer \n login e aproveitar.`,
        nextScreenRoute: 'SignIn'
    })
    }

 return(
<KeyboardAvoidingView
behavior='position' enabled
>
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
 <Container>
    <Header>
        <BackButon 
        onPress={handleBack}
        />
        <Steps>
        <Bullet active/>
        <Bullet active/>
        <Bullet active/>
        </Steps>
    </Header>
    <Title>
        Crie {`\n`}sua Conta 
    </Title>
    <Subtitle>
        Faça seu cadastro de {`\n`}
        forma rápida e fácil!
    </Subtitle>

    <Form>
    <FormTitle>
        2. Senha
    </FormTitle>
    
    <PasswordInput
    iconName='lock'
    placeholder='Digite sua Senha'
    autoCorrect={false}
    onChangeText={setSenha}
    value={senha}
    />
    <PasswordInput
    iconName='lock'
    placeholder='Repetir Senha!'
    autoCorrect={false}
    onChangeText={setConfSenha}
    value={confSenha}
    />
    </Form>
    <Button
    title='Cadastrar'
    onPress={handleRegister}
    color={theme.colors.success}
    
    />

 </Container>
 </TouchableWithoutFeedback>
 </KeyboardAvoidingView>
)

}