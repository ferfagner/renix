import react from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import Gasoline from '../../assets/gasoline.svg'
import { getAcessoryIcon } from '../../utils/getAcessoryIcon';
import { Car as CarModel} from '../../database/model/car'
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
import { useNetInfo } from '@react-native-community/netinfo';



interface Props extends RectButtonProps{
    data: CarModel
}

export function Car({data, ...rest}: Props){
    const netInfo = useNetInfo()
    const MotorIcon = getAcessoryIcon(data.fuel_type);
 return(

 <Container {...rest}>
    <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
            <Rent>
                <Period>{data.period}</Period>
                <Price>R${
                    netInfo.isConnected === true?
                data.price:
                '...'
                }</Price>
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