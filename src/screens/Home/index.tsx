
import react, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native'
import { ParamListBase, NavigationProp, useNavigation } from '@react-navigation/native';

import {RFValue} from 'react-native-responsive-fontsize'
import Logo from '../../assets/logo.svg'

import { Car } from '../../components/Car';

import {api} from '../../services/api';
import { CarDTO } from '../../dtos/carDTO';

import { Load } from '../../components/Load';

import { Ionicons } from '@expo/vector-icons';

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
  MyCarsButton,
} from './styles'
import { useTheme } from 'styled-components';



export function Home(){

    const [cars, setCarts] = useState<CarDTO[]>([]);
    const [load, setLoad] = useState(true);
    const theme = useTheme()
    const navigation = useNavigation<NavigationProp<ParamListBase>>()

    function handleCarDetails(car: CarDTO){
        navigation.navigate('CarDetail', {car})
    }
    function handleOpenMycars(){
        navigation.navigate('MyCars')
    }

   


    useEffect(()=>{
        async function fatchCars(){

           try {
            const response = await api.get('/cars')
            setCarts(response.data)

           } catch (error) {
            console.log(error)
           } finally{
            setLoad(false)
           }
        }


        fatchCars();
    },[])

    


 return(

 <Container>
    <StatusBar 
    barStyle="light-content"
    backgroundColor="trasparent"
    translucent
    />
    <Header>
        <HeaderContent>
        <Logo 
        width={RFValue(108)}
        height={RFValue(12)}
        />
        <TotalCars> 
        Total de {cars.length} Carros
        </TotalCars>
        </HeaderContent>
    </Header>
    {
    load ? Load : 
    <CarList 
    data={cars}
    keyExtractor={item => item.id}
    renderItem={({item}) => 
    <Car 
    onPress={() => handleCarDetails(item)}
    data={item}/>}
    />  
    }
     
    <MyCarsButton
    onPress={handleOpenMycars}
    >
    <Ionicons 
    name="ios-car-sport" 
    size={32} 
    color={theme.colors.shape} 
    />       
    </MyCarsButton>
 </Container>
)

}