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
import { useNetInfo } from '@react-native-community/netinfo';

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
  const netInfo = useNetInfo()
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO)
  const route = useRoute()
  const {car, dates} = route.params as Params;

  const navigation = useNavigation<NavigationProp<ParamListBase>>()

   async function handleSchedullingConfirm(){
    setLoading(true)
      await api.post('rentals', {
        user_id: 1,
        car_id: car.id,
        start_date: new Date(dates[0]),
        end_date: new Date(dates[dates.length -1]),
        total: rentTotal
      }).then(response => {
        setLoading(true)
        navigation.navigate('Confirmation', {
        title: 'Carro Alugado',
        mensage: `Agora é só ir \n até uma concessionária da RENTX \n pegar o seu carro.`,
        nextScreenRoute: 'Home'
        })
      
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

  const rentTotal= Number(dates.length * car.price)

  useEffect(() => { 

  setRentalPeriod({
      start: format(getPlataformDate(new Date(dates[0])), 'dd/MM/yyy'),
      end: format(getPlataformDate(new Date(dates[dates.length -1])), 'dd/MM/yyy'),
    })
  }
,[])

useEffect(()=>{
  async function fatchCarUpdated(){
    const response = await api.get(`/cars/${car.id}`)
    setCarUpdated(response.data)

   
  }

  if(netInfo.isConnected === true){
    fatchCarUpdated()
  }

},[netInfo.isConnected])


 return(

 <Container>
   <Header>
      <BackButon 
      onPress={handleBack}
     
      />
       </Header>
      <CarImages>
      <Slider 
      imagesUrl={
        !!carUpdated.photos?
        carUpdated.photos:
        [{id: car.thumbnail, photo: car.thumbnail}]
      }
      />
      </CarImages>

      <Content>
      <Detail>
          <Description>
            <Brend>{car.brand}</Brend>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
           <Period>{car.period}</Period>
          <Price>R${car.price}</Price>
          </Rent>
          </Detail>

          { 
         carUpdated.accessories &&
         <AcessoriesWraper>
            {
              carUpdated.accessories.map(acessoryes => (
              <Acessories 
                key={acessoryes.type}
                name={acessoryes.name}
                icon={getAcessoryIcon(acessoryes.type)} />

              ))
            }
          </AcessoriesWraper>          
          }
         

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
              <RentalPriceQuote>{`${car.price} x${dates.length} diárias`}</RentalPriceQuote>
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