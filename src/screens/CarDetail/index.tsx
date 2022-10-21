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

export function CarDetail(){

 return(

 <Container>
    <Header>
      <BackButon 
      onPress={() => {}}
     
      />
       </Header>
      <CarImages>
      <Slider 
      imagesUrl={['https://production.autoforce.com/uploads/version/profile_image/6737/comprar-tiptronic_13d79f3c1b.png']}
      />
      </CarImages>

      <Content>
      <Detail>
          <Description>
            <Brend>Audi</Brend>
            <Name>RC6</Name>
          </Description>
          <Rent>
           <Period>Ao Dia</Period>
          <Price>R$500</Price>
          </Rent>
          </Detail>

          <AcessoriesWraper>
          <Acessories name="380km/h" icon={SpeedSvg} />
          <Acessories name="3.2s" icon={AcelerationSvg} />
          <Acessories name="800hp" icon={ForceSvg} />
          <Acessories name="Gasolina" icon={GasolineSvg} />
          <Acessories name="Auto" icon={ExchangeSvg} />
          <Acessories name="5Pessoas" icon={PeopleSvg} />
          </AcessoriesWraper>
          <About>
          Automóvel desportivo ou automóvel esportivo (em inglês: Sports car), ou mais popularmente no Brasil carro esportivo, é geralmente um automóvel pequeno

          </About>
       
      </Content>
      <Footer>
      <Button 
      title="Confirmar"
      />
      </Footer>
   
 </Container>
)

}