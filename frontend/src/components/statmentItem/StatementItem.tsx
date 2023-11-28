import {FC} from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { StatementType } from '../../types/StatementType'
import { mainContainerStyle } from '../../styles/containers/MainContainer'
import { StatementIcon } from '../../../public/icons'
import { textStyle } from '../../styles/text/textStyle'
import { accentTextStyle } from '../../styles/accentText/AccentText'
import { chooseStatusStatement } from '../../utils/chooseStatusStatement'
import { chooseTypeStatement } from '../../utils/chooseTypeStatement'
import { StatementType as TypeStatement } from '../../consts/const'
import DescriptionItem from '../descriptionItem/DescriptionItem'

type StatementItemProps = {
    statement: StatementType
}

const StatementItem: FC<StatementItemProps> = ({statement}) => {
    return(
        <View style = {mainContainerStyle}>
            <View style={styleStatementItem.info}>
                <Image source={StatementIcon} style={{width: 40, height: 40}} />
                <View>
                    <Text style={textStyle}>Заявка № {statement.idStatement}</Text>
                    <Text style={accentTextStyle}>Статус: {statement.statusStatement ? chooseStatusStatement(statement.statusStatement) : '-'}</Text>
                </View>
            </View>
            <View style={styleStatementItem.dataStatement}>
                <Text style = {textStyle}>Тип: {chooseTypeStatement(statement.type)}</Text>
                <Text style = {textStyle}>Название: {statement.name}</Text>
                {statement.type === TypeStatement.COMETITION && 
                    <>
                        <Text style = {textStyle}>Дата начала: {statement.dateStart}</Text>
                        <Text style = {textStyle}>Дата оконания: {statement.dateFinish}</Text>
                    </>
                }
                <DescriptionItem description={statement.description} />
            </View>
        </View>
    )
}

const styleStatementItem = StyleSheet.create({
    info: {
        flexDirection: 'row',
        columnGap: 20
    },
    dataStatement: {
        paddingTop: 10,
        rowGap: 5
    }
})

export default StatementItem;