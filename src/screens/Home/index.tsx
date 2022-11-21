
import react, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native'
import { ParamListBase, NavigationProp, useNavigation } from '@react-navigation/native';

import {RFValue} from 'react-native-responsive-fontsize'
import Logo from '../../assets/logo.svg'
import { Car } from '../../components/Car';

import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
import {synchronize} from '@nozbe/watermelondb/sync'
import { database } from '../../database';

import {api} from '../../services/api';
import {Car as CarModel} from '../../database/model/car'
import { LoadAnimation } from '../../components/LoadAnimation';

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
} from './styles'





export function Home(){

    const [cars, setCarts] = useState<CarModel[]>([]);
    const [load, setLoad] = useState(true);
    const netInfo = useNetInfo()
    const navigation = useNavigation<NavigationProp<ParamListBase>>()


    async function offlineSincronize(){
        await synchronize({
            database,
            pullChanges: async ({lastPulledAt}) => {
                const response = await api
                .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);
                
                const {changes, latestVersion} = response.data;
               
                return {changes, timestamp: latestVersion}
                
            },
            pushChanges: async({changes}) => {
               
                const user = changes.users;
                
                await api.post('/users/sync', user).catch(console.log)

            }
        });
    }
  

    function handleCarDetails(car: CarModel){
        navigation.navigate('CarDetail', {car})
    }

   


    useEffect(()=>{
        let isMounted = true;
        
        async function fatchCars(){

           try {
           const carCollection = database.get<CarModel>('cars')
           const cars = await carCollection.query().fetch()
           if(isMounted){
                setCarts(cars)
           }
         
           } catch (error) {
            console.log(error)
            }finally{
                if(isMounted){
                    setLoad(false)
                }
            }             
     
        }
       fatchCars();
      
        return ()=> {
         isMounted = false;
        }
    },[])
    
    useEffect(()=>{

        if(netInfo.isConnected === true){
            offlineSincronize()
        }

    },[netInfo.isConnected])

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

       {!load ?  <TotalCars> 
        Total de {cars.length} Carros
        </TotalCars>: <></>}
        </HeaderContent>
    </Header>
    {
    load ? <LoadAnimation/> : 
    <CarList 
    data={cars}
    keyExtractor={item => item.id}
    renderItem={({item}) => 
    <Car 
    onPress={() => handleCarDetails(item)}
    data={item}/>}
    />  
    }
  
 </Container>
)

}

