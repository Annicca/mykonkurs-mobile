import { FC, PropsWithChildren} from "react";
import {Dimensions} from 'react-native';
import {StyleSheet, View} from 'react-native';


const Header: FC<PropsWithChildren> = ({children}) => {
    return(
        <View style = {headerStyle.container}>
            {children}
        </View>
    )
}

const headerStyle = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width - 50,
        marginHorizontal: 10,
        columnGap: 20,
        alignItems: 'flex-start',
        justifyContent: 'center',
    }
})


export default Header;