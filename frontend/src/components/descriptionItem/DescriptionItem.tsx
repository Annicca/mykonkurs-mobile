import {FC, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { textStyle } from '../../styles/text/textStyle'
import ButtonWithText from '../../uikit/buttonWithText/ButtonWithText'
import { accentTextStyle } from '../../styles/accentText/AccentText'

type DescriptionItemProps = {
    description: string
}

const DescriptionItem: FC<DescriptionItemProps> = ({description}) => {

    const [isUnwrap, setIsUnWrap] = useState<boolean>(false)

    const handleUnWrap = () => {
        setIsUnWrap(!isUnwrap)
    }

    return(
        <View>
            <Text style = {textStyle}>
                {isUnwrap || description.length < 100 ? description : `${description.slice(0,100)}...`}
                
            </Text>
            {description.length > 100 && <ButtonWithText activity={handleUnWrap} text={isUnwrap ? 'Скрыть' :'Развернуть всё'} textStyle={accentTextStyle} />}
        </View>
        
    )
}

export default DescriptionItem;