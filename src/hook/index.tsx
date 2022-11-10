import React, { ReactNode } from "react";

import { AuthProvider } from "./auth";


interface authProviderProrps{
    children: ReactNode
}


function AppProvider({children}: authProviderProrps){
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}

export {AppProvider}