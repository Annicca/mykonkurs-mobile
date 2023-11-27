import { FC } from 'react';
import {View, StyleSheet} from 'react-native';
import AccountInfo from '../components/accountInfo/AccountInfo';
import AccountLinks from '../components/accountLinks/AccountLinks';
import StatementButton from '../components/statementButton/StatementButton';
import { UserRole } from '../consts/const';
import { useUser } from '../hooks/useUser';
import Spinner from '../components/spinner/Spinner';

const Account: FC = () => {

    const {loading, user, setUser} = useUser()

    if (loading) {
        return (
            <View><Spinner /></View>
        )
    } else {
        return(
            <View>
                {user?.role && <AccountInfo setUser = {setUser} surname={user?.surnameUser} name = {user?.nameUser} patronimic={user?.patronimycUser} role = {user.role} mail={user.mailUser} phone={user.phoneUser} /> }
                <AccountLinks role={user?.role} />
                {user && user.role !== UserRole.ADMIN && 
                    <StatementButton 
                        text={UserRole.ORGANIZER ? '+ Разместить конкурс' : UserRole.DIRECTOR ? '+ Разместить коллектив' : UserRole.CLIENT && 'Подать заявку' } 
                        containerStyle={styleAccount.containerButton}/>}
            </View>
        )
    }
}

const styleAccount = StyleSheet.create({
    containerButton: {
        display: 'flex',
        marginTop: 40,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Account;