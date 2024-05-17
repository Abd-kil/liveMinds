import { createContext, useState, ReactNode, FC, SetStateAction, Dispatch, useContext } from "react";
import axios from "../api/axios";
import { error } from "console";

type AuthData = {
    isLoggedIn: boolean;
    user: userData;
}

type userData = {
    name: String;
    userName: String;
    email: String;
    role: String;
}

type AuthContextType = {
    auth: AuthData;
    setAuth: Dispatch<SetStateAction<AuthData>>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{children:ReactNode}> = ({ children }) => {
    const [auth, setAuth] = useState<AuthData>({
        isLoggedIn:false,
        user: {
            name:'',
            userName:'',
            email:'',
            role:''
        }
    });
    // const contextValue = { auth, setAuth };
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    );
}


export  const useAuth = ():AuthContextType => {
    const context = useContext(AuthContext);
    if(context === undefined){
        throw new Error('useAuth must be used within an AuthProvide')
    }
    return context;
}