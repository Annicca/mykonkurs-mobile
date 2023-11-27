import { useEffect, useState } from 'react';
import { UserType } from '../types/UserType';
import { getData } from '../utils/asyncStorage/getData';
import { StackNavigationProp } from '@react-navigation/stack';
import { AccountParamList } from '../components/navigation/navBarAccount';
import { RouteProp, useRoute } from '@react-navigation/native';

type AccountScreenNavigationProp = RouteProp<AccountParamList>;

export const useUser = () : {loading: boolean, user: UserType | null, setUser: (user: UserType | null) => void}   => {
    const [user, setUser] = useState<UserType | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const route = useRoute<AccountScreenNavigationProp>()

    useEffect(() => {
        setLoading(true)
        getData('user')
        .then(res => {
            setLoading(false)
            if(res === null) {
                if(route.params?.user) {
                    setUser(route.params.user) 
                } else {
                    setUser(res)
                }
            } else {
                setUser(JSON.parse(res))
            } 
        });
    }, [route.params])
    return {loading, user, setUser};
};