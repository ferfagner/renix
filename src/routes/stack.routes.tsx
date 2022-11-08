import React from "react";

import {createNativeStackNavigator} from '@react-navigation/native-stack'


import { Home } from '../screens/Home';
import { CarDetail } from '../screens/CarDetail';
import { Scheuling } from '../screens/Scheduling';
import { SchedulingDetail } from '../screens/SchedulingDetail';
import { SchedulingComplete } from '../screens/SchedulingComplete';
import {MyCars} from '../screens/MyCars'
import {Splash} from '../screens/Splash'
import { SignIn } from "../screens/SigIn";


const {Navigator, Screen} = createNativeStackNavigator()


export function StackRoutes(){

    return(
        <Navigator 
        screenOptions={{ headerShown: false }}
        initialRouteName="SignIn"
        >
            <Screen 
             name="Splash"
             component={Splash}
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
             name="SchedulingComplete"
             component={SchedulingComplete}
            />
            <Screen 
             name="MyCars"
             component={MyCars}
            />
            <Screen 
             name="SignIn"
             component={SignIn}
            />

        </Navigator>
    )

}