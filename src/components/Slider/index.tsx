import react from 'react';

import {
  Container,
  ImageIndexes,
  CarImageWrapper,
  ImageIndex,
  CarImage
} from './styles'

interface Props {
    imagesUrl: string[]
}

export function Slider({imagesUrl}: Props){

 return(

 <Container>
    <ImageIndexes>
        <ImageIndex active={true}/>
        <ImageIndex active={false}/>
        <ImageIndex active={false}/>
        <ImageIndex active={false}/>
    </ImageIndexes>

    <CarImageWrapper>
        <CarImage 
        source={{uri: imagesUrl[0]}}
        resizeMode="contain"
        />
    </CarImageWrapper>
 </Container>
)

}