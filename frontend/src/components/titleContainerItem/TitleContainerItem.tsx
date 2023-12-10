import { FC } from 'react'
import { View, Text, StyleSheet, Image} from 'react-native'
import TextIcon from '../../uikit/textIcon/TextIcon'
import Button from '../../uikit/button/button'
import { EditIcon, TrashIcon } from '../../../public/icons'
import { textStyle } from '../../styles/text/textStyle'

type TitleContainerItemProps = {
    name: string,
    actionTrash?: () => void,
    actionChange?: () => void
}

const TitleContainerItem : FC<TitleContainerItemProps> = ({name, actionTrash, actionChange}) => {
    return (
        <View style={styleTitle.titleContainer}>
            {actionChange ?
                <Button activity={actionChange}>
                    <TextIcon iconName={EditIcon} styleIcon={{width: 25, height: 25}} text={name} colorIcon='#FF6B00' />
                </Button> :
                <Text style={textStyle}>{name}</Text>}
            {actionTrash && <Button activity={actionTrash}>
                <Image source={TrashIcon} style={{width: 25, height: 25}} tintColor={'red'} />
            </Button>}
        </View>
    )
}

const styleTitle = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
})

export default TitleContainerItem;