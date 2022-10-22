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

export function Scheuling(){

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
  />
  </Footer>
 </Container>
)

}