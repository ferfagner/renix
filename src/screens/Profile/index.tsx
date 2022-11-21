import react, { useState } from 'react';
import { KeyboardAvoidingView, 
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
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
  OptionTitle,
  Section
} from './styles'
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { useAuth } from '../../hook/auth';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '../../components/Button';
import * as Yup from 'yup'
import { useNetInfo } from '@react-native-community/netinfo';

export function Profile(){
    const {user, signOut, updateUser} = useAuth()
    const theme = useTheme()
    const [option, setOption] = useState<'dataEdit'|'passwordEdit'>('dataEdit')
    const navigation = useNavigation<NavigationProp<ParamListBase>>()
    const [name, setName] = useState('')
    const [driveLicence, setDriveLicence] = useState('')
    const netInfo = useNetInfo()
    const [avatar, setAvatar] = useState(user.avatar)
    
    
    function handleBack(){
        navigation.goBack()
      }

    

    function handleOptionChange(optionSelected: 'dataEdit'|'passwordEdit'){
        if(netInfo.isConnected === false && optionSelected==='passwordEdit'){
            Alert.alert('Você está offline!','para mudar a senha conecte-se a internet')
        }else{
            setOption(optionSelected)
        }
        
    }

    async function handleSelectAvatar(){
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,4],
            quality: 1
        });

        if(result.cancelled){
            return
        }

        if(result.uri){
            setAvatar(result.uri)
        }
    }

    async function handleProfileUpdate(){
        try {
            const schema = Yup.object().shape({
                driveLicence: Yup.string().required('A CNH é Obrigatório'),
                name: Yup.string().required('Nome é Obrigatório')
            })

            const data={name, driveLicence}
            await schema.validate(data);

            await updateUser({
                id: user.id,
                user_id: user.user_id,
                email: user.email,
                name: name,
                drive_license: driveLicence,
                avatar: avatar,
                token: user.token
            })

            Alert.alert('Perfil atualizado!')

        } catch (error) {
            if(error instanceof Yup.ValidationError){
            Alert.alert('Opa', error.message)
            }
            Alert.alert('Não foi possivel atualizar o perfil')
        }
    }

    async function handleSignOut(){

        Alert.alert('Lembre-se!',
        'Se você sair irá precisar de internet para se conectar novamente',
        [
            {
                text: 'Cancelar',
                onPress: ()=>{},
            },
            {
                text: 'Sair',
                onPress: () => signOut()
            }
        ]
        )

        
    }

 return(
<KeyboardAvoidingView
behavior='position' enabled
>
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            <LogoutButton
            onPress={handleSignOut}
            >
                <Feather 
                name='power' 
                size={24} 
                color={theme.colors.shape}/>
            </LogoutButton>
        </HeaderTop>
        <PhotoContainer>
            {!!avatar && <Photo source={{uri: avatar} }/>}
            <PhotoButton onPress={handleSelectAvatar} >
            <Feather 
                name='camera' 
                size={24} 
                color={theme.colors.shape}/>
            </PhotoButton>
        </PhotoContainer>
    </Header>

    <Content style={{marginBottom: useBottomTabBarHeight()}}>
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
        {
            option === 'dataEdit'?
            <Section >
            <Input 
            iconName='user'
            placeholder='Nome'
            autoCorrect={false}
            defaultValue={user.name}
            onChangeText={setName}
            />
            <Input 
            iconName='mail'
            editable={false}
            autoCorrect={false}
            defaultValue={user.email}
            />
            <Input 
            iconName='credit-card'
            placeholder='CNH'
            keyboardType='numeric'
            defaultValue={user.drive_license}
            onChangeText={setDriveLicence}
            />
        </Section>
            :
            <Section>
            <PasswordInput 
            iconName='lock'
            placeholder='Senha Atual'
            />
            <PasswordInput 
            iconName='lock'
            placeholder='Nova Senha'
            />
            <PasswordInput 
            iconName='lock'
            placeholder='Repetir Senha'
            />
        </Section>
        }

<Button 
        title='Salvar Alterações'
        onPress={handleProfileUpdate}
        />
       
       
    </Content>
   

 </Container>
 </TouchableWithoutFeedback>
</KeyboardAvoidingView>
)

}