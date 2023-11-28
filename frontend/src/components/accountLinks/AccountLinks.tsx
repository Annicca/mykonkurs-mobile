import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { UserRole } from "../../consts/const";
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Button from "../../uikit/button/button";
import TextIcon from "../../uikit/textIcon/TextIcon";
import { StatementIcon, CompetitionsIcon, GroupsIcon, UserAdmin } from "../../../public/icons";
import { mainContainerStyle } from "../../styles/containers/MainContainer";
import { textStyle } from "../../styles/text/textStyle";

type AccountLinkspops = {
    role?: UserRole,
    idUser?: number
}

const AccountLinks: FC<AccountLinkspops> = ({role, idUser}) => {

    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    const toNavigate = (nameScreen: string, options?: object | undefined): void => {
        navigation.navigate(nameScreen, options)
    }

    if(!role) {
        return (
            <View style = {[styleAccountLinks.center]}>
                <Button activity={() => toNavigate('Login')} buttonStyle={styleAccountLinks.buttonLogin}>
                    <Text style = {[textStyle, styleAccountLinks.textButtonLogin]}>Вход</Text>
                </Button>
                <Button activity={() => toNavigate('Registry')} buttonStyle={styleAccountLinks.buttonLogin}>
                    <Text style = {[textStyle, styleAccountLinks.textButtonLogin]}>Регистрация</Text>
                </Button>
            </View>
        )
    } else if(role && role === UserRole.ADMIN) {
        return (
            <View style = {[mainContainerStyle, styleAccountLinks.container]}>
                <Button >
                    <TextIcon 
                        iconName={UserAdmin} 
                        text = 'Пользователи'
                        styleIcon = {{width: 20, height: 20}}
                        transition = {true} 
                        colorIcon="#000"
                    />
                </Button>
            </View>
        )
    } else if(role && role === UserRole.DIRECTOR)
        return (
            <View style = {[mainContainerStyle, styleAccountLinks.container]}>
                <Button activity={() => toNavigate('MyStatements', {idUser: idUser})}>
                    <TextIcon 
                        iconName={StatementIcon} 
                        text = 'Мои заявки'
                        border = {true}
                        styleIcon = {{width: 20, height: 20}}
                        transition = {true} 
                    />
                </Button>
                <Button activity={() => toNavigate('StatementParticipant')}>
                <TextIcon 
                        iconName={CompetitionsIcon} 
                        text = 'Заявки на участие' 
                        styleIcon = {{width: 20, height: 20}}
                        border = {true}
                        transition = {true} 
                    />
                </Button>
                <Button activity={() => toNavigate('MyGroups')}>
                    <TextIcon 
                        iconName={GroupsIcon} 
                        text = 'Мои коллективы' 
                        styleIcon = {{width: 20, height: 20}}
                        transition = {true} 
                    />
                </Button>
            </View>
        )
    else if(role && role === UserRole.ORGANIZER)
        return (
            <View style = {[mainContainerStyle, styleAccountLinks.container]}>
                <Button activity={() => toNavigate('MyStatements')}>
                    <TextIcon 
                        iconName={StatementIcon} 
                        text = 'Мои заявки'
                        styleIcon = {{width: 20, height: 20}}
                        border = {true}
                        transition = {true} 
                    />
                </Button>
                <Button activity={() => toNavigate('MyCompetitions')}>
                    <TextIcon 
                        iconName={CompetitionsIcon} 
                        text = 'Заявки на участие' 
                        styleIcon = {{width: 20, height: 20}}
                        border = {true}
                        transition = {true} 
                    />
                </Button>
            </View>
        )
    else if(role && role === UserRole.CLIENT)
        return (
            <View style = {[mainContainerStyle, styleAccountLinks.container]}>
                <Button activity={() => toNavigate('MyStatements')}>
                    <TextIcon 
                        iconName={StatementIcon} 
                        text = 'Мои заявки'
                        styleIcon = {{width: 20, height: 20}}
                        transition = {true} 
                    />
                </Button>
            </View>
        )
}

const styleAccountLinks = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 30,
        rowGap:15,
        marginHorizontal: 20,
    },
    center: {
        height: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: 20
        
    },
    containerLogin: {
        marginTop: '50%',
        alignItems: 'center',
        paddingVertical: 50,
        rowGap: 30,
    },
    buttonLogin: {
        backgroundColor: '#FFD700',
        borderRadius: 15,
        paddingVertical: 15,
        width: '50%',
        alignItems: 'center',
        borderColor: 'rgba(136, 136, 136, 0.1);',
        borderWidth: 1,
    },
    textButtonLogin: {
        fontFamily: 'Inter-Medium',
    }
})

export default AccountLinks;