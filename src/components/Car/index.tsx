import react from 'react';
import Gasoline from '../../assets/gasoline.svg'


import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage
} from './styles'

interface CarData {
    brand: string,
    name: string,
    rent:{
        period: string,
        price: string,
        },
    type: string,
    thumbnail: string

}

interface Props{
    data: CarData
}

export function Car({data}: Props){

 return(

 <Container>
    <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
            <Rent>
                <Period>{data.rent.period}</Period>
                <Price>{data.rent.price}</Price>
            </Rent>

            <Type>
                <Gasoline />
            </Type>
        </About>
    </Details>

    <CarImage 
    source={{uri: data.thumbnail}}
    resizeMode="contain"
    />

 </Container>

)

}