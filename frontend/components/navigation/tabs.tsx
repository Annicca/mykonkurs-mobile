import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

import Groups from '../../screens/Groups';
import Competitions from '../../screens/Competitions';
import Account from '../../screens/Account';

const Tab = createBottomTabNavigator();

const Tabs: FC = () => {
    return(
        <Tab.Navigator
            screenOptions={({ route }) => ({
                 tabBarShowLabel: false,
                 tabBarStyle: {...styleTabBar.tabBar},
                 tabBarIcon: ({ focused, color, size }) => {
                            let iconName;
                            let label;

                            if (route.name === 'Groups') {
                              iconName = require('../../public/icons/groups.png');
                              label = 'Коллективы'
                            } else if (route.name === 'Competitions') {
                              iconName = require('../../public/icons/competitions.png');
                              label = 'Конкурсы'
                            } else if(route.name === 'Account') {
                              iconName = require('../../public/icons/account.png');
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
            <Tab.Screen name="Groups" component = {Groups} />
            <Tab.Screen name="Competitions" component = {Competitions} />
            <Tab.Screen name="Account" component = {Account} />
        </Tab.Navigator>
    )
}

const styleTabBar = StyleSheet.create({
    tabBar: {
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderTopStyle: 'solid',
      borderTopWidth: 2,
      borderTopColor: '#FFD700',
      backgroundColor: '#FFF',
      height: 50,
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
    }
})

export default Tabs;