import react, {useRef, useState} from 'react';
import { FlatList, ViewToken } from 'react-native';
import { Bullet } from '../Bullet';

import {
  Container,
  ImageIndexes,
  CarImageWrapper,
  CarImage
} from './styles'

interface Props {
    imagesUrl: string[]
}

interface ChangeImageProps{
  
    viewableItems: ViewToken[];
    changed: ViewToken[];

}

export function Slider({imagesUrl}: Props){
    const [imageIndex, setImageIndex] = useState(0)

 const indexChange = useRef((info:ChangeImageProps) => {

    setImageIndex(info.viewableItems[0].index!)


 })


 return(

 <Container>
    <ImageIndexes>
        {
            imagesUrl.map((item, index) => (
                <Bullet 
                key={String(index)}
                active={index === imageIndex}/>
            ))
        
        }
    </ImageIndexes>

   
        <FlatList 
        data={imagesUrl}
        keyExtractor={key => key}
        renderItem={({item})=> (
            <CarImageWrapper>
            <CarImage 
            source={{uri: item}}
            resizeMode="contain"
            />
            </CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChange.current}
        />
       
   
 </Container>
)

}