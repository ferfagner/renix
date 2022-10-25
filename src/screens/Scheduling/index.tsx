import react from 'react';
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
import { StatusBar } from 'react-native';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';
import { useNavigation, ParamListBase, NavigationProp } from '@react-navigation/native';

export function Scheuling(){

  const navigation = useNavigation<NavigationProp<ParamListBase>>()

    function handleSchedullingDetail(){
        navigation.navigate('SchedulingDetail')
    }

  
  

 return(

 <Container>
  <Header>
    <StatusBar 
    barStyle='light-content'
    translucent
    backgroundColor="transparent"
    />
    <BackButon />
    <Title>Escolha uma{'\n'}
       data de inicio e {'\n'}
       fim do alugel</Title>

    <RentalPeriod>
    <DateInfo>
      <DateTitle>De</DateTitle>
      <DateValue selected={false}>18/06/2021</DateValue>
    </DateInfo>  

    <ArrowSvg />

    <DateInfo>
      <DateTitle>Até</DateTitle>
      <DateValue selected={false}>18/06/2021</DateValue>
    </DateInfo>  
    </RentalPeriod>   
  </Header>
  <Content>
  <Calendar />
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