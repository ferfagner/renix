import react from 'react';

import { Feather } from '@expo/vector-icons';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';
import {
  Container,
  InputText,
  IconContainer
} from './styles'

interface inputProrps extends TextInputProps{
    iconName: React.ComponentProps<typeof Feather>['name']
}

export function Input({iconName, ...rest}: inputProrps){
    const theme = useTheme()
 return(

 <Container>
    <IconContainer>
    <Feather
    name={iconName}
    size={24}
    color={theme.colors.text_detail}
    />
    </IconContainer>
    <InputText {...rest}/>
 </Container>
)

}