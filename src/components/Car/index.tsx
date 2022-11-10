import react from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import Gasoline from '../../assets/gasoline.svg'
import { CarDTO } from '../../dtos/carDTO';
import { getAcessoryIcon } from '../../utils/getAcessoryIcon';

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



interface Props extends RectButtonProps{
    data: CarDTO
}

export function Car({data, ...rest}: Props){

    const MotorIcon = getAcessoryIcon(data.fuel_type);
 return(

 <Container {...rest}>
    <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
            <Rent>
                <Period>{data.period}</Period>
                <Price>{data.price}</Price>
            </Rent>

            <Type>
                <MotorIcon />
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