import react, {useState, useEffect} from 'react';
import { Acessories } from '../../components/Acessories';
import { BackButon } from '../../components/BackButon';
import { Slider } from '../../components/Slider';

import Animated,{
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';

import { getAcessoryIcon } from '../../utils/getAcessoryIcon';

import {Button} from '../../components/Button';
import {Car, Car as CarModel} from '../../database/model/car'
import { useNavigation, ParamListBase, NavigationProp, useRoute } from '@react-navigation/native';

import {
  Container,
  Header,
  CarImages,
  Detail,
  Description,
  Brend,
  Name,
  Rent,
  Price,
  Period,
  About,
  AcessoriesWraper,
  Footer,
  OfflineInfo

} from './styles'
import { CarDTO } from '../../dtos/carDTO';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { StatusBar } from 'react-native';
import { api } from '../../services/api';
import { useNetInfo } from '@react-native-community/netinfo';

interface Params {
  car : CarModel
}

export function CarDetail(){
  const netInfo = useNetInfo()
  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO)
  const route = useRoute()
  const {car} = route.params as Params;
  const scrollY = useSharedValue(0)
  const scrollHandle = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y
   
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0,200],
        [200, 70],
        Extrapolate.CLAMP
      ),
    }
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(()=> {
    return{
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1,0],
        Extrapolate.CLAMP
      )
    }
  })

  function handleSchedulling(){
      navigation.navigate('Scheuling',{car})
  }

  function handleBack(){
    navigation.goBack()
  }

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
  <StatusBar 
  barStyle='dark-content'
  translucent
  backgroundColor='transparent'
  />
    <Animated.View
    style={[headerStyleAnimation, sliderCarsStyleAnimation]}
    >
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
      </Animated.View>
      <Animated.ScrollView
      contentContainerStyle={{
        paddingHorizontal: 24,
        paddingTop: getStatusBarHeight() ,
      }}
      onScroll={scrollHandle}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      >
      <Detail>
          <Description>
            <Brend>{car.brand}</Brend>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
           <Period>{car.period}</Period>
          <Price>R${ 
          netInfo.isConnected === true ?
          car.price :
          '...'
          }</Price>
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
          <About>
          {car.about}
          </About>
       
      </Animated.ScrollView>
      <Footer>
      <Button 
      title="Escolher Periodo do Aluguel!"
      onPress={handleSchedulling}
      enabled={netInfo.isConnected === true}
      />
      {
        netInfo.isConnected === false &&
        <OfflineInfo>
          Conecte-se a internet para ver mais detalhes e agendar seu carrro!
        </OfflineInfo>
      }
      </Footer>
   
 </Container>
)

}