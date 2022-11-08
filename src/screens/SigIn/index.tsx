import { StatusBar } from 'react-native';
import react from 'react';
import { useTheme } from 'styled-components';
import { Button } from '../../components/Button';

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

  const theme = useTheme()

 return(

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
    />
    <PasswordInput
    iconName='lock'
    placeholder='Digite a sua senha!'
    autoCorrect={false}
    autoCapitalize='none'
    />
    </Form>

   <Footer>
    <Button
    title='Login'
    onPress={()=> {}}
    enabled={false}
    loading={false}
    />

    <Button
    title='Criar Conta Gratuíta'
    onPress={()=> {}}
    enabled={true}
    loading={false}
    color={theme.colors.background_secondary}
    light
    />
   </Footer>

 </Container>


)

}