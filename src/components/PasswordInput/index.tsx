import react, {useState} from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';
import {
  Container,
  InputText,
  IconContainer,
} from './styles'

interface inputProrps extends TextInputProps{
    iconName: React.ComponentProps<typeof Feather>['name']
}

export function PasswordInput({iconName, ...rest}: inputProrps){
    const theme = useTheme()

    const [isvisible, setIsVisible] = useState(true)

    function handleChangePassword() {
      setIsVisible(prevState => !prevState)
    }
 return(

 <Container>
    <IconContainer>
    <Feather
    name={iconName}
    size={24}
    color={theme.colors.text_detail}
    />
    </IconContainer>
    <InputText  
    {...rest}
    secureTextEntry={isvisible}
    />
    <BorderlessButton onPress={handleChangePassword}>
    <IconContainer>
    <Feather
    name={isvisible? 'eye': 'eye-off'}
    size={24}
    color={theme.colors.text_detail}
    />
     </IconContainer>
    </BorderlessButton>
 </Container>
)

}