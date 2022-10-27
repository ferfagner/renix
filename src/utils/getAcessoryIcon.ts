import SpeedSvg from '../assets/speed.svg'
import AcelerationSvg from '../assets/acceleration.svg'
import ForceSvg from '../assets/force.svg'
import GasolineSvg from '../assets/gasoline.svg'
import ExchangeSvg from '../assets/exchange.svg'
import PeopleSvg from '../assets/people.svg'
import EnergySvg from '../assets/energy.svg'
import HibridSvg from '../assets/hybrid.svg'
import CarSvg from '../assets/car.svg'


export function getAcessoryIcon(type: string){

    switch(type){
        case 'speed' : 
        return SpeedSvg;
        case 'acceleration' : 
        return AcelerationSvg;
        case 'turning_diameter' : 
        return ForceSvg;
        case 'gasoline_motor' : 
        return GasolineSvg;
        case 'exchange' : 
        return ExchangeSvg;
        case 'seats' : 
        return PeopleSvg;
        case 'electric_motor' : 
        return EnergySvg;
        case 'hybrid_motor' : 
        return HibridSvg;
       default:
        return CarSvg;
        break;
    }
    

}