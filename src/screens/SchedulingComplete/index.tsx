import react from 'react';

import {useWindowDimensions, StatusBar} from 'react-native'

import { useNavigation, ParamListBase, NavigationProp } from '@react-navigation/native';

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

export function SchedulingComplete(){

    const {width} = useWindowDimensions()

    const navigation = useNavigation<NavigationProp<ParamListBase>>()

    function handleSchedullingComplete(){
        navigation.navigate('Home')
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
        <Title>Carro Alugado!</Title>

        <Message>
            Agora você só precisa ir {'\n'}
            até uma concersionaria da RentEx {'\n'}
            pegar o seu automovel
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