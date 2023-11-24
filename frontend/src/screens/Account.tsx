import { FC } from 'react';
import {View, StyleSheet} from 'react-native';
import AccountInfo from '../components/accountInfo/AccountInfo';
import AccountLinks from '../components/accountLinks/AccountLinks';
import StatementButton from '../components/statementButton/StatementButton';
import { UserRole } from '../consts/const';

const Account: FC = () => {
    
    type UserType = {
        surname: string,
        name: string,
        patronimic: string,
        role: UserRole,
        mail: string,
        phone: string
    }

    const User: UserType = {
        surname: 'Саулова',
        name: 'Анна',
        patronimic: 'Михайловна',
        role: UserRole.DIRECTOR,
        mail: 'anutohkalilia@gmail.com',
        phone: '88005553535'
    }


    return(
        <View>
            {User.role && <AccountInfo surname={User.surname} name = {User.name} patronimic={User.patronimic} role = {User.role} mail={User.mail} phone={User.phone} /> }
            <AccountLinks role={User.role} />  
            { User.role === UserRole.ORGANIZER && <StatementButton text='+ Разместить конкурс' containerStyle={styleAccount.containerButton}/> } 
            { User.role === UserRole.DIRECTOR && <StatementButton text='+ Разместить коллектив' containerStyle={styleAccount.containerButton}/> }
            { User.role === UserRole.CLIENT && <StatementButton text='Подать заявку' containerStyle={styleAccount.containerButton}/>  }
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
    }
})

export default Account;