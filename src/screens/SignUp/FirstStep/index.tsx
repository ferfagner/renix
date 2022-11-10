import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import react, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { BackButon } from '../../../components/BackButon';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import * as Yup from 'yup'
import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle
} from './styles'

export function FirstStep(){
    const navigate = useNavigation<NavigationProp<ParamListBase>>()

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [driveLicence, setDriveLicence] = useState('')

    function handleBack(){
        navigate.goBack()
    }

    async function handleNextStep(){

        try {

            const schema = Yup.object().shape({
                driveLicence: Yup.number().required('CNH é obrigatório!'),
                email: Yup.string().required('Email é obrigatório!').email('Digite um e-mail Válido!'),
                name: Yup.string().required('Nome é obrigatório!')
                
            })

            const data = {
                email,
                name,
                driveLicence
            }

            await schema.validate(data)
            navigate.navigate('SecondStep', {user: data})
        } catch (error) {
            if(error instanceof Yup.ValidationError){
                return Alert.alert('Opa', error.message)
            }
        }
        
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
        1. Dados
    </FormTitle>
    
    <Input
    iconName='user'
    placeholder='Digite seu Nome!'
    autoCorrect={false}
    onChangeText={setName}
    value={name}
    />
    <Input
    iconName='mail'
    placeholder='Digite seu e-mail'
    keyboardType='email-address'
    autoCorrect={false}
    onChangeText={setEmail}
    value={email}
    />
    <Input
    iconName='credit-card'
    placeholder='Digite sua CNH'
    keyboardType='numeric'
    onChangeText={setDriveLicence}
    value={driveLicence}
    />
    </Form>
    <Button
    title='Proxima'
    onPress={handleNextStep}
    />

 </Container>
 </TouchableWithoutFeedback>
 </KeyboardAvoidingView>
)

}