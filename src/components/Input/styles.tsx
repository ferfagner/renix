import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'

export const Container = styled.View`
    flex-direction: row;
    margin-bottom: 10px;
`;

export const IconContainer = styled.View`
    height: 56px;
    width: 56px;
    justify-content: center;
    align-items: center;
    background-color: ${({theme})=> theme.colors.background_secondary};
    margin-right: 5px;
`;

export const InputText = styled.TextInput`
    flex: 1;
    font-family: ${({theme})=> theme.fonts.primary_400};
    font-size: ${RFValue(15)}px;
    color: ${({theme})=> theme.colors.text};
    background-color: ${({theme})=> theme.colors.background_secondary};
    padding: 0 23px;
    
`;

