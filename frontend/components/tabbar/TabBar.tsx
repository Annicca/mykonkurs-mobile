import { FC } from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, View, Image} from 'react-native';
import Groups from "../../src/screens/Groups";
import Competitions from "../../src/screens/Competitions";
import Search from "../search/search";
import Header from "../header/header";
import NavBarAccount from "../navigation/navBarAccount";
import { NavigatorScreenParams } from '@react-navigation/native';
import { StackParamList } from "../navigation/navBarAccount";

import { AccountIcon, GroupsIcon, CompetitionsIcon } from "../../public/icons";

export type TabParamList = {
    Groups: undefined,
    Competitions: undefined,
    NavBarAccount: NavigatorScreenParams<StackParamList>,
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabBar: FC = () => {

    const headerStyle = {
        height: 60,
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
        backgroundColor: "#FFD700",
    }

    return(
        <Tab.Navigator
            screenOptions={({ route, navigation }) => ({
                 tabBarShowLabel: false,
                 tabBarStyle: {...styleTabBar.tabBar},
                 headerShown : route.name === 'NavBarAccount' ? false : true,
                 tabBarIcon: ({color}) => {
                            let iconName;
                            let label;

                            if (route.name === 'Groups') {
                              iconName = GroupsIcon;
                              label = 'Коллективы'
                            } else if (route.name === 'Competitions') {
                              iconName = CompetitionsIcon;
                              label = 'Конкурсы'
                            } else if(route.name === 'NavBarAccount') {
                              iconName = AccountIcon;
                              label = 'Кабинет'
                            }
                            return  (
                                <View style = {styleTabBar.containerIcon}>
                                    <Image
                                        source = {iconName}
                                        resizeMode = 'contain'
                                        style = {styleTabBar.icon}
                                        tintColor = {color}
                                    />
                                    <Text style = {{
                                    color: color,
                                    ...styleTabBar.text
                                    }} >
                                        {label}
                                    </Text>
                                </View>
                            )
                },
                    tabBarActiveTintColor: '#FF6B00',
                    tabBarInactiveTintColor: '#4F4F4F',
                  
            })} >
            <Tab.Screen name="Groups" component = {Groups} 
                options={{
                    headerTitle() {
                        return <Header><Search/></Header>
                    },
                    headerStyle: {...headerStyle}, 
                }}
            />
            <Tab.Screen name="Competitions" component = {Competitions}                 
                options={{
                    headerTitle() {
                        return <Header><Search/></Header>
                    },
                    headerStyle: {...headerStyle},  
                }}
            />
            <Tab.Screen name="NavBarAccount" key = {'accountNavbar'} component = {NavBarAccount} />
        </Tab.Navigator>
    )
}

const styleTabBar = StyleSheet.create({
    tabBar: {
        marginHorizontal: 20,
        borderRadius:20,
        position:'absolute',
        bottom: 10,
        backgroundColor: '#FFF',
        height: 60,
    },
    containerIcon: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

    },
    icon: {
        width: 25,
        height: 25,
    },
    text: {
        paddingTop: 5,
        fontFamily: 'Inter, sans-serif',
        fontSize: 8,
        fontWeight: '600',
        lineHeight: 8,
        textTransform: 'uppercase',
    },
})

export default TabBar;