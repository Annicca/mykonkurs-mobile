import {FC} from 'react'
import { View, Text, StyleSheet, Image} from 'react-native'
import { GroupType } from '../../types/GroupType'
import CustomImage from '../customImage/CustomImage'
import GroupAddress from '../groupAddress/GroupAddress'
import DescriptionItem from '../descriptionItem/DescriptionItem'
import { mainContainerStyle } from '../../styles/containers/MainContainer'
import { accentTextStyle } from '../../styles/accentText/AccentText'
import { CompetitionsIcon, EditIcon, TrashIcon } from '../../../public/icons'
import TextIcon from '../../uikit/textIcon/TextIcon'
import Button from '../../uikit/button/button'
import { useNavigation } from '@react-navigation/native'
import { AccountParamList } from '../navigation/navBarAccount'
import { StackNavigationProp } from '@react-navigation/stack'


type MyGroupItemProps = {
    group: GroupType,
    deleteItem: () => void
}

const MyGroupItem: FC<MyGroupItemProps> = ({group, deleteItem}) => {

    const navigation = useNavigation<StackNavigationProp<AccountParamList>>()

    return(
        <View style = {[mainContainerStyle, styleMyGroupItem.mainContainer]}>
            <View style={styleMyGroupItem.titleContainer}>
                <TextIcon iconName={EditIcon} styleIcon={{width: 25, height: 25}} text={group.nameGroup} colorIcon='#FF6B00' />
                <Button activity={deleteItem}>
                    <Image source={TrashIcon} style={{width: 25, height: 25}} tintColor={'red'} />
                </Button>
                
            </View>
            <View style = {styleMyGroupItem.container}>
                <CustomImage source={group.img} containerStyle={styleMyGroupItem.imgContainer} alt={group.nameGroup}/>
                <View >
                    <Text style={accentTextStyle}>Стиль: {!!group.category ? group.category : '-'}</Text>
                    <GroupAddress address={group.addressGroup} city={group.cityGroup.city} />
                </View>
            </View>
            <Button activity={() => navigation.navigate('CompetitionsGroup', {})} buttonStyle={styleMyGroupItem.link}>
                <TextIcon iconName={CompetitionsIcon} styleIcon={{width: 20, height: 20}} text='Конкурсы  ->' colorIcon='#FF6B00' styleText = {accentTextStyle} />
            </Button>
            <DescriptionItem description={group.descriptionGroup} />
        </View>
    )
}

const styleMyGroupItem = StyleSheet.create({
    mainContainer: {
        rowGap: 10,
        alignItems: 'flex-start'
    },
    container : {
        flexDirection: 'row',
        columnGap: 20,
        alignItems: 'center'
    },
    imgContainer: {
        width: 150,
        height: 100
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    link: {
        padding: 10,
        width: 150,
        borderWidth: 1,
        borderColor: '#FF6B00',
        borderRadius: 10,
    }
})

export default MyGroupItem;