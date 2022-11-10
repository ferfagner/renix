import react from 'react';

import {useWindowDimensions, StatusBar} from 'react-native'

import { useNavigation, ParamListBase, NavigationProp, useRoute } from '@react-navigation/native';

import LogoSvg from '../../assets/logo_background_gray.svg'
import DoneSvg from '../../assets/done.svg'
import {
  Container,
  Content,
  Title,
  Message,
  Footer
} from './styles'
import { ConfirmButton } from '../../components/ConfirmButton';

interface Params{
    title: string;
    mensage: string;
    nextScreenRoute: string
}

export function Confirmation(){

    const route = useRoute()
    const {title, mensage, nextScreenRoute} = route.params as Params

    const {width} = useWindowDimensions()

    const navigation = useNavigation<NavigationProp<ParamListBase>>()

    function handleSchedullingComplete(){
        navigation.navigate(nextScreenRoute)
    }
 return(

 <Container>

    <StatusBar
    barStyle='light-content'
    backgroundColor="transparent"
    />
    <LogoSvg 
    width={width}
    
    />

    <Content>
        <DoneSvg 
        width={80}
        height={80}
        />
        <Title>{title}</Title>

        <Message>
            {mensage}
        </Message>
    </Content>
    <Footer>
    <ConfirmButton 
    title="OK"
    onPress={handleSchedullingComplete}
    />
    </Footer>
 </Container>
)

}