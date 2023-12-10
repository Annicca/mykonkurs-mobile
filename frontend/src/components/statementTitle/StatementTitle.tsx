import {FC} from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import { textStyle } from '../../styles/text/textStyle'
import { accentTextStyle } from '../../styles/accentText/AccentText'
import { StatementIcon } from '../../../public/icons'
import { chooseStatusStatement } from '../../utils/chooseStatusStatement'
import { StatementStatus } from '../../consts/const'

type StatementTitleProps = {
    number: number,
    status: string | null
}

const StatementTitle : FC<StatementTitleProps> = ({number, status}) => {
    return (
        <View style={styleStatementTitle.info}>
            <Image source={StatementIcon} style={{width: 40, height: 40}} />
            <View>
                <Text style={textStyle}>Заявка № {number}</Text>
                <Text style={accentTextStyle}>Статус: {status ? chooseStatusStatement(status) : '-'}</Text>
            </View>
        </View>
    )
}

const styleStatementTitle = StyleSheet.create({
    info: {
        flexDirection: 'row',
        columnGap: 20
    },
})

export default StatementTitle;