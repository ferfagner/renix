import React, {
    createContext,
    useState,
    useContext,
    ReactNode
} from "react";
import { api } from "../services/api";

interface User{
    id: string;
    email: string;
    name: string;
    driver_license: string;
    avatar: string;
}

interface authState{
    token: string;
    user: User;
}

interface SingInCredential{
    email: string;
    password: string;
}

interface authContexData{
    user: User;
    signIn: (credential: SingInCredential) => Promise<void>
}

interface authProviderProrps{
    children: ReactNode
}

const AuthContex = createContext<authContexData>({} as authContexData)

function AuthProvider({children}: authProviderProrps){
    const [data, setData] = useState<authState>({} as authState)

    async function signIn({email, password}:SingInCredential) {
        const response = await api.post('/sessions', {
            email,
            password
        })

        const {token, user} = response.data;
        api.defaults.headers.common['Authorization']= `Bearer ${token}`
        
        setData({token, user})
    }

    return(
        <AuthContex.Provider value={{
            user: data.user,
            signIn
        }}>
            {children}
        </AuthContex.Provider>
    )
}


function useAuth(): authContexData{
    const contex = useContext(AuthContex)

    return contex;
}


export{AuthProvider, useAuth}