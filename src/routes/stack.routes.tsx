import React from "react";

import {createNativeStackNavigator} from '@react-navigation/native-stack'


import { Home } from '../screens/Home';
import { CarDetail } from '../screens/CarDetail';
import { Scheuling } from '../screens/Scheduling';
import { SchedulingDetail } from '../screens/SchedulingDetail';
import { Confirmation } from '../screens/Confimation';
import {MyCars} from '../screens/MyCars'
import {Splash} from '../screens/Splash'
import { SignIn } from "../screens/SigIn";
import { FirstStep } from "../screens/SignUp/FirstStep";
import { SecondStep } from "../screens/SignUp/SecondStep";


const {Navigator, Screen} = createNativeStackNavigator()


export function StackRoutes(){

    return(
        <Navigator 
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"
        >
            <Screen 
             name="Splash"
             component={Splash}
            />
            <Screen 
             name="SignIn"
             component={SignIn}
            />
            <Screen 
             name="FirstStep"
             component={FirstStep}
            />
            <Screen 
             name="SecondStep"
             component={SecondStep}
            />
            <Screen 
             name="Home"
             component={Home}
             options={{
                gestureEnabled: false
             }}
            />
            <Screen 
             name="CarDetail"
             component={CarDetail}
            />
            <Screen 
             name="Scheuling"
             component={Scheuling}
            />
            <Screen 
             name="SchedulingDetail"
             component={SchedulingDetail}
            />
            <Screen 
             name="Confirmation"
             component={Confirmation}
            />
            <Screen 
             name="MyCars"
             component={MyCars}
            />
            

        </Navigator>
    )

}