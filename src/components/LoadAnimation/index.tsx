import react from 'react';
import LottieView from 'lottie-react-native';

import loadAnimated from '../../assets/loadAnimated.json'

import {
  Container
} from './styles'

export function LoadAnimation(){

 return(

 <Container>
    <LottieView
    source={loadAnimated}
    style={{height: 200}}
    resizeMode="contain"
    autoPlay
    loop
    />

 </Container>
)

}