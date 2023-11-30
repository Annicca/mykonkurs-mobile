import {FC, PropsWithChildren, createContext, useState, useEffect, useContext, Dispatch, SetStateAction} from 'react';
import { UserType } from '../types/UserType';
import { getData } from '../utils/asyncStorage/getData';

type AuthType = {
    user: UserType | null,
    jwt: string | null,
}

type ContextType = {
    context: AuthType,
    setContext: Dispatch<SetStateAction<AuthType>>
}

const UserContext = createContext<ContextType>({context: {jwt: null, user: null}, setContext: () => {}});

export const UserContextProvider: FC<PropsWithChildren> = ({ children}) => {
    
    const saveContext = useCreateUserContext();

    const [context, setContext] = useState<AuthType>(saveContext);

    useEffect(() => {
        setContext(saveContext)
    }, [saveContext.jwt, saveContext.user])

    return <UserContext.Provider value={{context, setContext}}>{children}</UserContext.Provider>;
};

export const useCreateUserContext = (): AuthType => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserType | null>(null)

    const getContext = async() => {
        await Promise.all([
            getData('user')
                .then(d => {
                    if(d !== null) setUser(JSON.parse(d))
                    else setUser(d)
                }),
            getData('jwt')
                .then(d => setToken(d))
        ])
    }

    useEffect(() => {
        getContext()
    }, [])

    return {
        user: user,
        jwt: token
    }
}

export const useUserContext = () => useContext(UserContext)