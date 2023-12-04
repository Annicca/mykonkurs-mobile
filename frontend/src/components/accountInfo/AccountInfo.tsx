import { FC } from 'react';
import { useUserContext } from '../../context/UserContext';
import { useForm } from 'react-hook-form';
import { UserType } from '../../types/UserType';
import {View, Text, StyleSheet, Image, StyleProp, ViewStyle, Alert} from 'react-native';
import FioUser from '../fioUser/FioUser';
import Button from '../../uikit/button/button';
import TextIcon from '../../uikit/textIcon/TextIcon';
import { getRoleUser } from '../../utils/getRoleUser';
import { removeData } from '../../utils/asyncStorage/removeData';
import { accentTextStyle } from '../../styles/accentText/AccentText';
import { mainContainerStyle } from '../../styles/containers/MainContainer';
import { EmailIcon, ExitIcon, KeyIcon, OkIcon, PhoneIcon } from '../../../public/icons';
import { confirm } from '../../utils/confirm';
import { instance } from '../../utils/instance';
import { getRequestConfig } from '../../utils/getRequestConfig';
import DropDown from '../../uikit/dropDown/DropDown';
import { UserRole } from '../../consts/const';
import { textStyle } from '../../styles/text/textStyle';


type AccountInfoProps = {
    user: UserType,
    styleContainer?: StyleProp<ViewStyle>,
    isAccount?: boolean
}

const AccountInfo: FC<AccountInfoProps> = ({user, styleContainer, isAccount = true}) => {

    const {control , handleSubmit, formState: {errors, isValid}} = useForm({mode: "onChange"})

    const {context, setContext} = useUserContext();

    const roleItems = [
        {label: 'Администратор', value: UserRole.ADMIN},
        {label: 'Организатор конкурсов', value: UserRole.ORGANIZER},
        {label: 'Руководитель коллектива', value: UserRole.DIRECTOR},
        {label: 'Клиент', value: UserRole.CLIENT}
    ]
    
    const exit = () => {
        removeData('user')
        removeData('jwt')
        setContext({user: null, jwt: null})
    }

    const changeRole = (user: UserType) => {
        instance.put('users', user, getRequestConfig(context.jwt))
        .then((result) =>{
            console.log(result.data);
            Alert.alert("Успешно")
        }).catch((e)=>{
            console.log(e);
            if(e.response){
                Alert.alert('Ошибка',e.response.data.message)
             }else{
                Alert.alert('Ошибка', "Мы не смогли изменить данные(");
            }
        })
    }

    const onChangeRole = handleSubmit(async (data) => {
        confirm('Вы действительно хотите изменить пользователя?', () => changeRole({...user, ...data}))
    })
    
    return(
        <View style = {[mainContainerStyle, styleContainer]}>
            <View style = {infoStyle.containerExit}>
                <FioUser surname={user.surnameUser} name={user.nameUser} patronimic={user.patronimycUser} />
                {isAccount && <Button activity={exit}>
                    <Image source = {ExitIcon} style={{width: 25, height: 25}} />
                </Button>}
            </View>
            <View style = {infoStyle.containerInfo}>
                {isAccount ? 
                    <TextIcon iconName={KeyIcon} text = {getRoleUser(user.role)} styleIcon = {{width: 20, height: 20 }} colorIcon='#FF6B00' styleText={accentTextStyle}/> :
                    <>
                        <View style={infoStyle.containerEditRole}>
                            <DropDown
                                items = {roleItems}
                                placeholder={{ label : 'Выберите роль' , значение : null }}
                                control={control}
                                name = 'role'
                                rules = {{
                                    required : 'Поле обязательно',
                                }}
                                containerWidth={'70%'}
                                value={user.role}
                                onValueChange={() => {}}
                                error = {errors.role && errors.role.message?.toString()}
                            />
                            <Button buttonStyle={infoStyle.buttonSave} activity={onChangeRole}>
                                <Image source={OkIcon} style={{width: 20, height: 20}} />
                            </Button>
                        </View>
                        <Text style = {textStyle}>Логин: {user.loginUser}</Text>
                    </>
                }
                <TextIcon iconName={PhoneIcon} text = {user.phoneUser} styleIcon = {{width: 20, height: 16}} />
                <TextIcon iconName={EmailIcon} text = {user.mailUser} styleIcon = {{width: 20, height: 16}} />
            </View>

        </View>
    )
}

const infoStyle = StyleSheet.create({
    containerInfo: {
        paddingTop: 20,
        rowGap: 15
    },
    role: {
        paddingTop: 15,
    },
    containerEditRole: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10
    },
    containerExit: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    buttonSave: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#FFD700',
        alignItems: 'center'
    }
})

export default AccountInfo;