import react, {useState} from 'react';

import { Feather } from '@expo/vector-icons';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';
import {
  Container,
  InputText,
  IconContainer
} from './styles'

interface inputProrps extends TextInputProps{
    iconName: React.ComponentProps<typeof Feather>['name'];
    value?: string
}

export function Input({iconName,value, ...rest}: inputProrps){
    const [focus, setFocus] = useState(false)
    const [filled, setFilled] = useState(false)

    const theme = useTheme();

    function handleFocus(){
        setFocus(true)
    }

    function handleBlur(){
        setFocus(false)
        setFilled(!!value)
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
    onFocus={handleFocus}
    onBlur={handleBlur}
    isfocus={focus}
    />
 </Container>
)

}