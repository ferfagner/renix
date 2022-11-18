import react from 'react';

import {NavigationContainer} from '@react-navigation/native'
import { AppTabRoutes } from './app.tab.routes';
import { AuthRoutes } from './auth.routes';

import { useAuth } from '../hook/auth';

export function Routes(){

    const {user} = useAuth()

 return(
    <NavigationContainer>
        {user.id ? <AppTabRoutes/> : <AuthRoutes/>}
    </NavigationContainer>

)

}