import {FC} from 'react';
import { Text } from "react-native"
import { StackScreenProps } from '@react-navigation/stack';
import { GroupsParamList } from '../components/navigation/navBarGroups';


const Group: FC<StackScreenProps<GroupsParamList, 'Group'>> = ({route}) => {
    return (
        <Text style = {{color: "#000"}}>{route.params.idGroup}</Text>
    )
}

export default Group;