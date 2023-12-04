import { FC } from 'react';
import {View, StyleSheet} from 'react-native';
import AccountInfo from '../components/accountInfo/AccountInfo';
import AccountLinks from '../components/accountLinks/AccountLinks';
import StatementButton from '../components/statementButton/StatementButton';
import { UserRole } from '../consts/const';
import { useUserContext } from '../context/UserContext';

const Account: FC = () => {

    const user = useUserContext().context?.user;

    return(
        <View>
            {user?.role && <AccountInfo user = {user} styleContainer = {styleAccount.containerAccountInfo} /> }
            <AccountLinks role={user?.role} idUser={user?.idUser}/>
            {user && user.role !== UserRole.ADMIN && 
                <StatementButton 
                    text={ 
                        user.role === UserRole.ORGANIZER ? '+ Разместить конкурс' :
                        user.role === UserRole.DIRECTOR ? '+ Разместить коллектив' : 
                        user.role === UserRole.CLIENT ? 'Подать заявку' : 'Подать заявку' } 
                    containerStyle={styleAccount.containerButton}/>}
        </View>
    )
}

const styleAccount = StyleSheet.create({
    containerButton: {
        display: 'flex',
        marginTop: 40,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerAccountInfo: {
        padding: 20,
        marginTop: 50,
        marginHorizontal: 20,
    },
})

export default Account;