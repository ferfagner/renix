import react, { useState } from 'react';
import { BackButon } from '../../components/BackButon';


import ArrowSvg from '../../assets/arrow.svg'

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer
} from './styles'
import { Alert, StatusBar } from 'react-native';
import { Button } from '../../components/Button';
import { Calendar, DayProps, generateInterval, MarkedDateProps } from '../../components/Calendar';
import { useNavigation, ParamListBase, NavigationProp, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { getPlataformDate } from '../../utils/getFormatDate';
import { CarDTO } from '../../dtos/carDTO';

interface RentalPeriod {

  startFormated: string;
  endFormated: string

}

interface Params {
  car : CarDTO
}


export function Scheuling(){
  const [lestSelectedDate, setLestSelectedDate] = useState<DayProps>({} as DayProps)
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps)
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)
  const navigation = useNavigation<NavigationProp<ParamListBase>>()

  const route = useRoute()
  const {car} = route.params as Params;

    function handleSchedullingDetail(){
        if(!rentalPeriod.startFormated || !rentalPeriod.endFormated){
          Alert.alert('Selecione uma data!')
        }else{
          navigation.navigate('SchedulingDetail',{
            car,
            dates: Object.keys(markedDates)
          })
        }
        
    }

    function handleBack(){
      navigation.goBack()
    }

    function handleChangeDate(date: DayProps){
      let start = !lestSelectedDate.timestamp ? date : lestSelectedDate;
      let end = date;

      if(start.timestamp > end.timestamp){
        start = end;
        end = start;
      }

      setLestSelectedDate(end)

      const interval = generateInterval(start, end);

      setMarkedDates(interval)

      const firstDay = Object.keys(interval)[0];
      const endDay = Object.keys(interval)[Object.keys(interval).length -1];

      setRentalPeriod({
        startFormated: format(getPlataformDate(new Date(firstDay)),'dd/MM/yyyy'),
        endFormated: format(getPlataformDate(new Date(endDay)),'dd/MM/yyyy')
      })
    }
  
  

 return(

 <Container>
  <Header>
    <StatusBar 
    barStyle='light-content'
    translucent
    backgroundColor="transparent"
    />
    <BackButon 
    onPress={handleBack}
    />
    <Title>Escolha uma{'\n'}
       data de inicio e {'\n'}
       fim do alugel</Title>

    <RentalPeriod>
    <DateInfo>
      <DateTitle>De</DateTitle>
      <DateValue selected={false}>{rentalPeriod.startFormated}</DateValue>
    </DateInfo>  

    <ArrowSvg />

    <DateInfo>
      <DateTitle>Até</DateTitle>
      <DateValue selected={false}>{rentalPeriod.endFormated}</DateValue>
    </DateInfo>  
    </RentalPeriod>   
  </Header>
  <Content>
  <Calendar 
    markedDates={markedDates}
    onDayPress={handleChangeDate}
  
  />
  </Content>

  <Footer>
  <Button 
  title='Confirmar'
  onPress={handleSchedullingDetail}
  />
  </Footer>
 </Container>
)

}