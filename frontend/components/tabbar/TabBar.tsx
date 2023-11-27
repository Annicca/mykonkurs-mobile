import { FC } from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, View, Image} from 'react-native';
import { NavigatorScreenParams } from '@react-navigation/native';
import NavBarAccount, { AccountParamList } from "../navigation/navBarAccount";
import NavBarGroups, { GroupsParamList } from "../navigation/navBarGroups";
import NavBarCompetitions, { CompetitionsParamList } from "../navigation/navBarCompetitions";
import { AccountIcon, GroupsIcon, CompetitionsIcon } from "../../public/icons";

export type TabParamList = {
    NavBarGroups: NavigatorScreenParams<GroupsParamList>,
    NavBarCompetitions: NavigatorScreenParams<CompetitionsParamList>,
    NavBarAccount: NavigatorScreenParams<AccountParamList>,
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabBar: FC = () => {

    return(
        <Tab.Navigator
            screenOptions={({ route }) => ({
                 tabBarShowLabel: false,
                 tabBarStyle: {...styleTabBar.tabBar},
                 headerShown : route.name === 'NavBarAccount' ? false : true,
                 tabBarIcon: ({color}) => {
                            let iconName;
                            let label;

                            if (route.name === 'NavBarGroups') {
                              iconName = GroupsIcon;
                              label = 'Коллективы'
                            } else if (route.name === 'NavBarCompetitions') {
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
            <Tab.Screen name="NavBarGroups" key = {'groupsNavbar'} component = {NavBarGroups} options={{headerShown: false}} />
            <Tab.Screen name="NavBarCompetitions" key = {'competitionsNavBar'} component = {NavBarCompetitions} options={{headerShown: false}} />
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
        borderColor: 'rgba(136, 136, 136, 0.2);',
        borderWidth: 1,
        shadowColor: '#FFF',
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