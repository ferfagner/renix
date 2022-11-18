import react, { useState } from 'react';
import { BackButon } from '../../components/BackButon';
import { useTheme } from 'styled-components';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { Feather } from 'expo-vector-icons';
import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle
} from './styles'


export function Profile(){
    const theme = useTheme()
    const [option, setOption] = useState<'dataEdit'|'passwordEdit'>('dataEdit')
    const navigation = useNavigation<NavigationProp<ParamListBase>>()


    function handleBack(){
        navigation.goBack()
      }

    function handleSignout(){


    }  

    function handleOptionChange(optionSelected: 'dataEdit'|'passwordEdit'){
        setOption(optionSelected)
    }

 return(

 <Container>

    <Header>
        <HeaderTop>
            <BackButon 
            color={theme.colors.shape}
            onPress={handleBack}
            />
            <HeaderTitle>
                Editar Perfil
            </HeaderTitle>
            <LogoutButton>
                <Feather 
                name='power' 
                size={24} 
                color={theme.colors.shape}/>
            </LogoutButton>
        </HeaderTop>
        <PhotoContainer>
            <Photo source={{uri: 'https://avatars.githubusercontent.com/u/5932294?v=4'} }/>
            <PhotoButton onPress={()=>{}} >
            <Feather 
                name='camera' 
                size={24} 
                color={theme.colors.shape}/>
            </PhotoButton>
        </PhotoContainer>
    </Header>

    <Content>
        <Options>
            <Option 
            active={option == 'dataEdit'}
            onPress={()=>{handleOptionChange('dataEdit')}}
            >
                <OptionTitle active={option == 'dataEdit'}>Dados</OptionTitle>
            </Option>
            <Option 
            active={option == 'passwordEdit'}
            onPress={()=>{handleOptionChange('passwordEdit')}}
            >
                <OptionTitle active={option == 'passwordEdit'}>Trocar Senha</OptionTitle>
            </Option>
        </Options>
    </Content>

 </Container>

)

}