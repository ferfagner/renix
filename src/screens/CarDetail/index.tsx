import react from 'react';
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
  Footer

} from './styles'
import { CarDTO } from '../../dtos/carDTO';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { StatusBar } from 'react-native';

interface Params {
  car : CarDTO
}

export function CarDetail(){

  const navigation = useNavigation<NavigationProp<ParamListBase>>()

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
      imagesUrl={car.photos}
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
           <Period>{car.rent.period}</Period>
          <Price>R${car.rent.price}</Price>
          </Rent>
          </Detail>

          <AcessoriesWraper>
            {
              car.accessories.map(acessoryes => (
              <Acessories 
                key={acessoryes.type}
                name={acessoryes.name}
                icon={getAcessoryIcon(acessoryes.type)} />

              ))
            }
          </AcessoriesWraper>
          <About>
          {car.about}
          </About>
       
      </Animated.ScrollView>
      <Footer>
      <Button 
      title="Escolher Periodo do Aluguel!"
      onPress={handleSchedulling}
      />
      </Footer>
   
 </Container>
)

}