import react from 'react';
import { Acessories } from '../../components/Acessories';
import { BackButon } from '../../components/BackButon';
import { Slider } from '../../components/Slider';



import SpeedSvg from '../../assets/speed.svg'
import AcelerationSvg from '../../assets/acceleration.svg'
import ForceSvg from '../../assets/force.svg'
import GasolineSvg from '../../assets/gasoline.svg'
import ExchangeSvg from '../../assets/exchange.svg'
import PeopleSvg from '../../assets/people.svg'

import {Button} from '../../components/Button';

import { useNavigation, ParamListBase, NavigationProp, useRoute } from '@react-navigation/native';

import {
  Container,
  Header,
  CarImages,
  Content,
  Detail,
  Description,
  Brend,
  Name,
  Rent,
  Price,
  Period,
  About,
  AcessoriesWraper,
  Footer

} from './styles'
import { CarDTO } from '../../dtos/carDTO';

interface Params {
  car : CarDTO
}

export function CarDetail(){

  const navigation = useNavigation<NavigationProp<ParamListBase>>()

  const route = useRoute()
  const {car} = route.params as Params;


  function handleSchedulling(){
      navigation.navigate('Scheuling')
  }

  function handleBack(){
    navigation.navigate('Home')
  }



 return(

 <Container>
    <Header>
      <BackButon 
      onPress={handleBack}
     
      />
       </Header>
      <CarImages>
      <Slider 
      imagesUrl={car.photos}
      />
      </CarImages>

      <Content>
      <Detail>
          <Description>
            <Brend>{car.brand}</Brend>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
           <Period>{car.rent.period}</Period>
          <Price>R${car.rent.price}</Price>
          </Rent>
          </Detail>

          <AcessoriesWraper>
            {
              car.accessories.map(acessorie => (
                <Acessories 
                key={acessorie.type}
                name={acessorie.name}
                icon={SpeedSvg} />
              ))
            }
          </AcessoriesWraper>
          <About>
          {car.about}
          </About>
       
      </Content>
      <Footer>
      <Button 
      title="Escolher Periodo do Aluguel!"
      onPress={handleSchedulling}
      />
      </Footer>
   
 </Container>
)

}