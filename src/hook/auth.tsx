import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect
} from "react";
import { api } from "../services/api";
import {database} from "../database"
import {User as modelUser} from "../database/model/user"

interface User{
    id: string;
    user_id: string;
    email: string;
    name: string;
    driver_license: string;
    avatar: string;
    token: string;
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
    const [data, setData] = useState<User>({} as User)

    async function signIn({email, password}:SingInCredential) {

        try {
            const response = await api.post('/sessions', {
                email,
                password
            })
    
            const {token, user} = response.data;

            api.defaults.headers.common['Authorization']= `Bearer ${token}`
            
            const userCollection = database.get<modelUser>('users')

            await database.write(async()=>{
                await userCollection.create((newUser)=>{
                        newUser.user_id = user.id
                        newUser.name = user.name
                        newUser.avatar = user.avatar
                        newUser.drive_license = user.drive_license
                        newUser.email = user.email
                        newUser.token = token
                })
            })

            setData({...user, token})
        } catch (error) {
            throw new Error()
        }
       
    }

   useEffect(()=>{
    async function loadUserData(){
        const userCollection = database.get<modelUser>('users')
        const response = await userCollection.query().fetch()
        
        if(response.length > 0){
            const userData = response[0]._raw as unknown as User;
            api.defaults.headers.common['Authorization']= `Bearer ${userData.token}`
            setData(userData)
        }
    }

    loadUserData()
   })

    return(
        <AuthContex.Provider value={{
            user: data,
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