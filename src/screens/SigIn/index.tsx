
import react, {useState} from 'react';
import { 
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';

import * as Yup from 'yup'

import { useTheme } from 'styled-components';
import { Button } from '../../components/Button';

import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import {useAuth} from '../../hook/auth'
import {
  Container,
  Header,
  Title,
  Subtitle,
  Footer,
  Form
} from './styles'
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

export function SignIn(){

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const theme = useTheme()
  const navigate = useNavigation<NavigationProp<ParamListBase>>()

  const {signIn} = useAuth()

  function handleNewAccout(){
    navigate.navigate('FirstStep')
  }

  async function handleSignIn(){

    try {
      const schema = Yup.object().shape({
        email: Yup.string()
        .required('E-mail obrigatório').email('Digite um e-mail válido!'),
        password: Yup.string().required('A Senha é Obrigatoria!')
      })
  
      await schema.validate({email, password})

      signIn({
        email,
        password
      })
    } catch (error) {
      if(error instanceof Yup.ValidationError){
         Alert.alert('Opa', error.message)
      }else{
         Alert.alert('Erro na Autenticação!', 'Ocorreu um erro ao Fazer login, verifique as credenciais!')
      }
    }

  }

 return(
  
<KeyboardAvoidingView
behavior='position' enabled
>
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
 <Container>
  <StatusBar 
  barStyle='dark-content'
  backgroundColor='transparent'
  translucent
  />
    <Header>
      <Title>
        Estamos {`\n`}
        Quase lá.
      </Title>
      <Subtitle>
        Faça seu login para começar {`\n`}
        uma expêriencia incrivél.
      </Subtitle>
    </Header>

  <Form>
    <Input
    iconName='mail'
    placeholder='Digite o seu e-mail!'
    
    keyboardType='email-address'
    autoCorrect={false}
    autoCapitalize='none'
    onChangeText={setEmail}
    value={email}
    />
    <PasswordInput
    iconName='lock'
    placeholder='Digite a sua senha!'
    autoCorrect={false}
    autoCapitalize='none'
    onChangeText={setPassword}
    value={password}
    />
    </Form>

   <Footer>
    <Button
    title='Login'
    onPress={handleSignIn}
    enabled={!!email && !!password}
    loading={false}
    />

    <Button
    title='Criar Conta Gratuíta'
    onPress={handleNewAccout}
    enabled={true}
    loading={false}
    color={theme.colors.background_secondary}
    light
    />
   </Footer>

 </Container>
 </TouchableWithoutFeedback>
 </KeyboardAvoidingView>

)

}