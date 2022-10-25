import react from 'react';
import { Acessories } from '../../components/Acessories';
import { BackButon } from '../../components/BackButon';
import { Slider } from '../../components/Slider';
import {Feather} from 'expo-vector-icons'
import SpeedSvg from '../../assets/speed.svg'
import AcelerationSvg from '../../assets/acceleration.svg'
import ForceSvg from '../../assets/force.svg'
import GasolineSvg from '../../assets/gasoline.svg'
import ExchangeSvg from '../../assets/exchange.svg'
import PeopleSvg from '../../assets/people.svg'
import { useTheme } from 'styled-components';
import {Button} from '../../components/Button';
import { useNavigation, ParamListBase, NavigationProp } from '@react-navigation/native';



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
  AcessoriesWraper,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetail,
  RentalPriceQuote,
  RentalPriceTotal

} from './styles'
import { RFValue } from 'react-native-responsive-fontsize';

export function SchedulingDetail(){
  const navigation = useNavigation<NavigationProp<ParamListBase>>()

    function handleSchedullingConfirm(){
        navigation.navigate('SchedulingComplete')
    }
    function handleBack(){
      navigation.navigate('Home')
    }
  const theme = useTheme()
 return(

 <Container>
    <Header>
      <BackButon 
      onPress={handleBack}
     
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
         

         <RentalPeriod>
          <CalendarIcon>
            <Feather 
            name="calendar"
            size={RFValue(24)}
            color={theme.colors.shape}
            />
          </CalendarIcon>
          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue>18/08/2021</DateValue>
          </DateInfo>
          <Feather 
            name="chevron-rigth"
            size={RFValue(10)}
            color={theme.colors.text}
            />
          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue>18/08/2021</DateValue>
          </DateInfo>
         </RentalPeriod>

          <RentalPrice>
            <RentalPriceLabel>Total</RentalPriceLabel>
            <RentalPriceDetail>
              <RentalPriceQuote>R$580 x3 diárias</RentalPriceQuote>
              <RentalPriceTotal>R$2.900</RentalPriceTotal>
            </RentalPriceDetail>
          </RentalPrice>


      </Content>
      <Footer>
      <Button 
      title="Alugar agora!"
      color={theme.colors.success}
      onPress={handleSchedullingConfirm}
      />
      </Footer>
   
 </Container>
)

}