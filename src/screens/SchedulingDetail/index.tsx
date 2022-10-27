import react, { useEffect, useState } from 'react';
import { Acessories } from '../../components/Acessories';
import { BackButon } from '../../components/BackButon';
import { Slider } from '../../components/Slider';
import {Feather} from 'expo-vector-icons'
import { useTheme } from 'styled-components';
import {Button} from '../../components/Button';
import { useNavigation, ParamListBase, NavigationProp, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/carDTO';
import { getAcessoryIcon } from '../../utils/getAcessoryIcon';

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
import { format } from 'date-fns';

import { getPlataformDate } from '../../utils/getFormatDate'
import { api } from '../../services/api';
import { Alert } from 'react-native';

interface Params {
  car : CarDTO;
  dates: string[];
}

interface RentalPeriod{
  start: string;
  end: string;
}




export function SchedulingDetail(){
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>()
  const [loading, setLoading] = useState(false)

  const route = useRoute()
  const {car, dates} = route.params as Params;

  const navigation = useNavigation<NavigationProp<ParamListBase>>()

   async function handleSchedullingConfirm(){

      const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`)

      const unavailable_dates = [
        ...schedulesByCar.data.unavailable_dates,
        ...dates,
      ]
      
      await api.post(`schedules_byuser`, {
        user_id: 1,
        car,
        startDate: format(getPlataformDate(new Date(dates[0])), 'dd/MM/yyy'),
        endDate: format(getPlataformDate(new Date(dates[dates.length -1])), 'dd/MM/yyy'),
      })

      await api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates: unavailable_dates,
      }).then(response => {
        setLoading(true)
        navigation.navigate('SchedulingComplete')
      
      })
      .catch(()=> {
        setLoading(false)
      Alert.alert('Náo foi possivel finalizar o aluguel!')
      
   })



        
    }
    function handleBack(){
      navigation.goBack()
    }
  const theme = useTheme()

  const rentTotal= Number(dates.length * car.rent.price)

  useEffect(() => { 

  setRentalPeriod({
      start: format(getPlataformDate(new Date(dates[0])), 'dd/MM/yyy'),
      end: format(getPlataformDate(new Date(dates[dates.length -1])), 'dd/MM/yyy'),
    })
  }
,[])
  console.log(rentalPeriod)
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
              car.accessories.map(acessoryes => (
              <Acessories 
                key={acessoryes.type}
                name={acessoryes.name}
                icon={getAcessoryIcon(acessoryes.type)} />

              ))
            }
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
            <DateValue></DateValue>
          </DateInfo>
          <Feather 
            name="chevron-rigth"
            size={RFValue(10)}
            color={theme.colors.text}
            />
          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue></DateValue>
          </DateInfo>
         </RentalPeriod>

          <RentalPrice>
            <RentalPriceLabel>Total</RentalPriceLabel>
            <RentalPriceDetail>
              <RentalPriceQuote>{`${car.rent.price} x${dates.length} diárias`}</RentalPriceQuote>
              <RentalPriceTotal>R${rentTotal}</RentalPriceTotal>
            </RentalPriceDetail>
          </RentalPrice>


      </Content>
      <Footer>
      <Button 
      title="Alugar agora!"
      color={theme.colors.success}
      onPress={handleSchedullingConfirm}
      enabled={!loading}
      loading={loading}
      />
      </Footer>
   
 </Container>
)

}