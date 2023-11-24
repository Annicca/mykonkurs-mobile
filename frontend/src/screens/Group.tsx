import {FC} from 'react';
import useFetch from '../hooks/useFetch';
import { View, Text } from "react-native"
import { ScrollView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { GroupType } from '../types/GroupType';
import { GroupsParamList } from '../components/navigation/navBarGroups';
import { detailStyle as groupStyle } from '../styles/detail/detail';
import { generalContainerStyle } from '../styles/containers/GeneralContainer';
import { bigTileStyle } from '../styles/title/BigTitle';
import { accentTextStyle } from '../styles/accentText/AccentText';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import Spinner from '../components/spinner/Spinner';
import Info from '../components/info/Info';
import Description from '../components/description/Description';
import CustomImage from '../components/customImage/CustomImage';

const Group: FC<StackScreenProps<GroupsParamList, 'Group'>> = ({route}) => {

    const {data: group, loading, error} = useFetch<GroupType>(`${route.params.url}/${route.params.idGroup}`)

    return (
        <ScrollView style = {generalContainerStyle}>
            {
                error ? <ErrorMessage message='Произошла ошибка' /> :
                loading ? <Spinner /> :
                !!group && 
                <View style={groupStyle.container}> 
                    <CustomImage 
                        source = {group.img} 
                        containerStyle = {groupStyle.imgContainer} 
                        alt = {group.nameGroup} />
                    <Text style = {[bigTileStyle, groupStyle.title]}>{group.nameGroup}</Text>
                    <Text style = {accentTextStyle}>Город: {group.cityGroup.city}</Text>
                    <Info address={group.addressGroup} number={group.director.phoneUser} mail={group.director.phoneUser} />
                    <Description description={group.descriptionGroup} />
                </View>
            }
        </ScrollView>
    )
}

export default Group;

