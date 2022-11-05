
import react, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet, BackHandler} from 'react-native'
import { ParamListBase, NavigationProp, useNavigation } from '@react-navigation/native';

import {RFValue} from 'react-native-responsive-fontsize'
import Logo from '../../assets/logo.svg'
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';
import theme from '../../styles/theme';
import { Car } from '../../components/Car';

import Animated, {
    useAnimatedStyle,
    useSharedValue,
    useAnimatedGestureHandler,
    withSpring

} from 'react-native-reanimated';

const ButtonAnimatted = Animated.createAnimatedComponent(RectButton);

import {api} from '../../services/api';
import { CarDTO } from '../../dtos/carDTO';

import { Load } from '../../components/Load';

import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
} from './styles'





export function Home(){

    const [cars, setCarts] = useState<CarDTO[]>([]);
    const [load, setLoad] = useState(true);
    const theme = useTheme()
    const navigation = useNavigation<NavigationProp<ParamListBase>>()


    const positionY = useSharedValue(0);
    const positionX = useSharedValue(0);

    const myCarsButtonStyle = useAnimatedStyle(()=>{
        return{
            transform: [
                {translateX: positionX.value},
                {translateY: positionY.value}
            ]
        }
    });

    const onGestureEvent = useAnimatedGestureHandler({
        onStart(_, ctx: any){
            ctx.positionX = positionX.value;
            ctx.positionY = positionY.value;
        },
        onActive(event, ctx: any){
            positionX.value = ctx.positionX + event.translationX;
            positionY.value = ctx.positionY + event.translationY;
        },
        onEnd(){
            positionX.value = withSpring(0);
            positionY.value = withSpring(0);

        }
    })

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

    useEffect(()=>{
        BackHandler.addEventListener('hardwareBackPress', ()=> {
            return true
        })
    })

    


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
    <PanGestureHandler
    onGestureEvent={onGestureEvent}
    >
     <Animated.View
     style={[
        myCarsButtonStyle, 
        {position: 'absolute', bottom: 13, right: 22}]}
     >
    <ButtonAnimatted
    onPress={handleOpenMycars}
    style={styles.button}
    >
    <Ionicons 
    name="ios-car-sport" 
    size={32} 
    color={theme.colors.shape} 
    />       
    </ButtonAnimatted>
    </Animated.View>
    </PanGestureHandler>
 </Container>
)

}

const styles = StyleSheet.create({

    button:{
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.main,
    }

})