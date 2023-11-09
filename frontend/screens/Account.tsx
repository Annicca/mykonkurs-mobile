import { FC } from 'react';
import {View, Button} from 'react-native';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const Account: FC = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    return(
        <View>
            <Button
                title="Statements"
                onPress={() => navigation.navigate('MyStatements')}
            />
        </View>
    )
}

export default Account;