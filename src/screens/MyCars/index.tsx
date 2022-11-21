import react, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import {  StatusBar } from 'react-native';
import { BackButon } from '../../components/BackButon';
import { useNavigation, ParamListBase, NavigationProp, useIsFocused } from '@react-navigation/native';
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
import {LoadAnimation} from '../../components/LoadAnimation'
import { Car as CarModel} from '../../database/model/car';
import { format, parseISO } from 'date-fns';


interface dataProps{
    id: string;
    car: CarModel;
    start_date: string,
    end_date: string
}

export function MyCars(){
    const screenIsFocused = useIsFocused()
    const [cars, setCars] = useState<dataProps[]>([])
    const [loading, setLoading] = useState(true)
    const navigation = useNavigation<NavigationProp<ParamListBase>>()
    function handleBack(){
        navigation.goBack()
      }

    useEffect(()=>{

        async function fetchCars() {
            try {
              const response =  await api.get('/rentals')
                const dataFormatted = response.data.map((data: dataProps)=>{
                    return {
                        id: data.id,
                        car: data.car,
                        start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
                        end_date: format(parseISO(data.end_date), 'dd/MM/yyyy'),
                    }
                })

                setCars(dataFormatted)

              
            } catch (error) {
                console.log(error)
            }finally{
                setLoading(false)
            }


            
        }

        fetchCars()
    },[screenIsFocused])
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
  { loading ? <LoadAnimation/> :
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
                <CarFooterDate>{item.start_date}</CarFooterDate>
                <AntDesign 
                name="arrowright" 
                size={20}
                style={{marginHorizontal: 10}}
                />
                <CarFooterDate>{item.end_date}</CarFooterDate>
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