import { RFValue } from 'react-native-responsive-fontsize';
import {getStatusBarHeight} from 'react-native-iphone-x-helper'
import styled from 'styled-components/native'

export const Container = styled.View`
    
    padding: 24px;
    background-color: ${({theme})=> theme.colors.background_primary};
`;

export const Header = styled.View`
    width: 100%;
    margin-top: ${getStatusBarHeight() + 70}px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(40)}px;
    font-family: ${({theme})=> theme.fonts.secondary_500};
    color: ${({theme})=> theme.colors.title};
`;

export const Form  = styled.View`
    width: 100%;
    margin: 64px 0;
`;

export const Subtitle = styled.Text`
    margin-top: 16px;
    font-size: ${RFValue(15)}px;
    font-family: ${({theme})=> theme.fonts.primary_400};
    color: ${({theme})=> theme.colors.text};
    line-height: ${RFValue(25)}px;
`;

export const Footer  = styled.View`
    
`;

