import react from 'react';
import {StatusBar} from 'react-native'

import {RFValue} from 'react-native-responsive-fontsize'

import Logo from '../../assets/logo.svg'

import { Car } from '../../components/Car';

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList
} from './styles'

export function Home(){

    const carData = {
        brand: "Audi",
    name: "r5 coupe",
    rent:{
        period: "Ao dia",
        price: "R$120.00",
        },
    type: "Gasoline",
    thumbnail: "https://production.autoforce.com/uploads/version/profile_image/6737/comprar-tiptronic_13d79f3c1b.png"

    }
 return(

 <Container>
    <StatusBar 
    barStyle="light-content"
    backgroundColor="trasparent"
    translucent
    />
    <Header>
        <HeaderContent>
        <Logo 
        width={RFValue(108)}
        height={RFValue(12)}
        />
        <TotalCars> 
        Total de 12 Carros
        </TotalCars>
        </HeaderContent>
    </Header>
    <CarList 
    data={[1,2,3,4]}
    keyExtractor={item => String(item)}
    renderItem={({item}) => <Car data={carData}/>}
    />   

 </Container>
)

}