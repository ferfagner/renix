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
    iconName: React.ComponentProps<typeof Feather>['name'];
    value?: string
}

export function PasswordInput({iconName,value, ...rest}: inputProrps){

  const [focus, setFocus] = useState(false)
  const [filled, setFilled] = useState(false)


  function handleFocus(){
      setFocus(true)
  }

  function handleBlur(){
      setFocus(false)
      setFilled(!!value)
  }

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
    color={(focus || filled ) ? theme.colors.main: theme.colors.text_detail}
    />
    </IconContainer>
    <InputText  
    {...rest}
    placeholderTextColor={theme.colors.text_detail}
    secureTextEntry={isvisible}
    onFocus={handleFocus}
    onBlur={handleBlur}
    isfocus={focus}
    />
    <BorderlessButton onPress={handleChangePassword}>
    <IconContainer
    isfocus={focus}
    >
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