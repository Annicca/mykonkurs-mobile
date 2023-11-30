import { useEffect, useState } from 'react';
import { UserType } from '../types/UserType';
import { getData } from '../utils/asyncStorage/getData';
import { AccountScreenNavigationProp } from '../types/AccountScreenNavigationProp';
import { useRoute } from '@react-navigation/native';

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