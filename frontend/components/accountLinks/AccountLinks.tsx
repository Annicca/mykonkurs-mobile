import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../button/button";
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import TextIcon from "../textIcon/TextIcon";
import { UserRole } from "../../src/consts/const";
import { StatementIcon, CompetitionsIcon, GroupsIcon } from "../../public/icons";



type AccountLinkspops = {
    role?: UserRole
}

const AccountLinks: FC<AccountLinkspops> = ({role}) => {

    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    const toNavigate = (nameScreen: string): void => {
        navigation.navigate(nameScreen)
    }

    if(role && role === UserRole.DIRECTOR)
        return (
            <View style = {styleAccountLinks.container}>
                <Button activity={() => toNavigate('MyStatements')}>
                    <TextIcon 
                        iconName={StatementIcon} 
                        text = 'Мои заявки'
                        textStyle={styleAccountLinks.text}
                        styleIcon = {{width: 20, height: 20}}
                        transition = {true} 
                    />
                </Button>
                <Button activity={() => toNavigate('StatementParticipant')}>
                <TextIcon 
                        iconName={CompetitionsIcon} 
                        text = 'Заявки на участие' 
                        textStyle={styleAccountLinks.text}
                        styleIcon = {{width: 20, height: 20}}
                        transition = {true} 
                    />
                </Button>
                <Button activity={() => toNavigate('MyGroups')}>
                    <TextIcon 
                        iconName={GroupsIcon} 
                        text = 'Мои коллективы' 
                        textStyle={styleAccountLinks.text}
                        styleIcon = {{width: 20, height: 20}}
                        transition = {true} 
                    />
                </Button>
            </View>
        )
    else if(role && role === UserRole.ORGANIZER)
        return (
            <View style = {styleAccountLinks.container}>
                <Button activity={() => toNavigate('MyStatements')}>
                    <TextIcon 
                        iconName={StatementIcon} 
                        text = 'Мои заявки'
                        textStyle={styleAccountLinks.text}
                        styleIcon = {{width: 20, height: 20}}
                        transition = {true} 
                    />
                </Button>
                <Button activity={() => toNavigate('MyCompetitions')}>
                    <TextIcon 
                        iconName={CompetitionsIcon} 
                        text = 'Заявки на участие' 
                        textStyle={styleAccountLinks.text}
                        styleIcon = {{width: 20, height: 20}}
                        transition = {true} 
                    />
                </Button>
            </View>
        )
    else if(role && role === UserRole.CLIENT)
        return (
            <View style = {styleAccountLinks.container}>
                <Button activity={() => toNavigate('MyStatements')}>
                    <TextIcon 
                        iconName={StatementIcon} 
                        text = 'Мои заявки'
                        textStyle={styleAccountLinks.text}
                        styleIcon = {{width: 20, height: 20}}
                        transition = {true} 
                    />
                </Button>
            </View>
        )
    else if(!role)
        return (
            <View style = {styleAccountLinks.containerLogin}>
                <Button activity={() => toNavigate('Login')} buttonStyle={styleAccountLinks.buttonLogin}>
                    <Text style = {[styleAccountLinks.text, styleAccountLinks.textButtonLogin]}>Вход</Text>
                </Button>
                <Button activity={() => toNavigate('Registry')} buttonStyle={styleAccountLinks.buttonLogin}>
                    <Text style = {[styleAccountLinks.text, styleAccountLinks.textButtonLogin]}>Регистрация</Text>
                </Button>
            </View>
        )
}

const styleAccountLinks = StyleSheet.create({
    container: {
        flexDirection: 'column',
        padding: 20,
        marginTop: 30,
        rowGap:15,
        marginHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#FFF',
        elevation: 8,
        shadowColor: '#000',
    },
    text: {
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        color: '#000'
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
        elevation: 8,
        shadowColor: '#000',
    },
    textButtonLogin: {
        fontFamily: 'Inter-Medium',
    }
})

export default AccountLinks;