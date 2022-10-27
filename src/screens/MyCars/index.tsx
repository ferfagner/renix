import react, { useEffect, useState } from 'react';
import { CarDTO } from '../../dtos/carDTO';
import { api } from '../../services/api';
import {  StatusBar } from 'react-native';
import { BackButon } from '../../components/BackButon';
import { useNavigation, ParamListBase, NavigationProp, useRoute } from '@react-navigation/native';
import {Car} from '../../components/Car'
import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Apontment,
  ApointmentTitle,
  ApointmentQnt,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate

} from './styles'
import { FlatList } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons'
import {Load} from '../../components/Load'


interface CarProps {
    id: string;
    user_id: string;
    car: CarDTO;
    startDate: string;
    endDate: string;
}

export function MyCars(){

    const [cars, setCars] = useState<CarProps[]>([])
    const [loading, setLoading] = useState(true)
    const navigation = useNavigation<NavigationProp<ParamListBase>>()
    function handleBack(){
        navigation.goBack()
      }

    useEffect(()=>{

        async function fetchCars() {
            try {
              const response =  await api.get('/schedules_byuser?user_id=1')
                setCars(response.data)

                console.log(response.data)
            } catch (error) {
                console.log(error)
            }finally{
                setLoading(false)
            }


            
        }

        fetchCars()
    },[])
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
        <Title>
    Seus agendamentos,{'\n'}
       estão aqui. 
       </Title>

       <SubTitle>
        Conforto, Segurança e Praticidade.
       </SubTitle>

   
  </Header>
  { loading ? <Load/> :
    <Content>
        <Apontment>
            <ApointmentTitle>Agendamentos Feitos</ApointmentTitle>
            <ApointmentQnt>{cars.length}</ApointmentQnt>
        </Apontment>

    <FlatList 
    data={cars}
    keyExtractor={item => item.id}
    showsVerticalScrollIndicator={false}
    renderItem={({item})=> (
    <CarWrapper>
    <Car data={item.car}/>
    <CarFooter>
        <CarFooterTitle>
            Period
        </CarFooterTitle>
        <CarFooterPeriod>
                <CarFooterDate>{item.startDate}</CarFooterDate>
                <AntDesign 
                name="arrowright" 
                size={20}
                style={{marginHorizontal: 10}}
                />
                <CarFooterDate>{item.endDate}</CarFooterDate>
        </CarFooterPeriod>
    </CarFooter>
    </CarWrapper>
    )}
    />

    </Content>
}
 </Container>

)

}