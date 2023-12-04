import {FC, useState, memo} from 'react'
import { useUserContext } from '../../context/UserContext'
import { Image, StyleSheet, Text, View } from 'react-native'
import { StatementType } from '../../types/StatementType'
import { mainContainerStyle } from '../../styles/containers/MainContainer'
import { StatementIcon } from '../../../public/icons'
import { textStyle } from '../../styles/text/textStyle'
import { accentTextStyle } from '../../styles/accentText/AccentText'
import { chooseStatusStatement } from '../../utils/chooseStatusStatement'
import { chooseTypeStatement } from '../../utils/chooseTypeStatement'
import { StatementType as TypeStatement, UserRole } from '../../consts/const'
import DescriptionItem from '../descriptionItem/DescriptionItem'
import Button from '../../uikit/button/button'
import { confirm } from '../../utils/confirm'
import { changeStatus } from '../../utils/changeStatus'

type StatementItemProps = {
    statementInit: StatementType
}

const StatementItem: FC<StatementItemProps> = ({statementInit}) => {

    const {user, jwt} = useUserContext().context;

    const [statement, setStatement] = useState<StatementType>(statementInit)

    const changeStatementStatus = (id: number, status: string ) => {
        confirm('Вы действительно хотите изменить статус?', () =>
        changeStatus(id, status, setStatement, jwt))
    }

    const styleStatementItem = StyleSheet.create({
        info: {
            flexDirection: 'row',
            columnGap: 20
        },
        dataStatement: {
            paddingTop: 10,
            rowGap: 5
        },
        buttonContainer: {
            flexDirection: 'row',
            columnGap: 10,
            paddingTop: 10,
        },
        button: {
            padding: 10,
            borderRadius: 10,
            maxWidth: 150,
        },
        textButton: {
            color: '#FFF',
            textAlign: 'center'
        },
        acceptButton: {
            backgroundColor: statement.statusStatement ? '#888' : '#01C22B'
        },
        rejectButton: {
            backgroundColor: statement.statusStatement ? '#888' : '#FF6B00'
        }
    })

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
                <Text style = {accentTextStyle}>Тип: {chooseTypeStatement(statement.type)}</Text>
                <Text style = {textStyle}>Название: {statement.name}</Text>
                {statement.type === TypeStatement.COMETITION && 
                    <>
                        <Text style = {textStyle}>Дата начала: {statement.dateStart}</Text>
                        <Text style = {textStyle}>Дата оконания: {statement.dateFinish}</Text>
                    </>
                }
                {user?.role === UserRole.ADMIN && 
                    <>
                        <Text style = {textStyle}>Пользователь: {statement.user.patronimycUser + ' ' + statement.user.nameUser + ' ' + statement.user.surnameUser}</Text>
                        <Text style = {textStyle}>Почта: {statement.user.mailUser}</Text>
                        <Text style = {textStyle}>Телефон: {statement.user.phoneUser ? statement.user.phoneUser : '-'}</Text>
                    </>
                }
                <DescriptionItem description={statement.description} />

                {user?.role === UserRole.ADMIN && 
                    <View style={styleStatementItem.buttonContainer}>
                        <Button buttonStyle = {[styleStatementItem.button, styleStatementItem.acceptButton]} 
                        activity={() => changeStatementStatus(statement.idStatement, 'accept')}>
                            <Text style={styleStatementItem.textButton}>Принять</Text>
                        </Button>
                        <Button buttonStyle = {[styleStatementItem.button, styleStatementItem.rejectButton]}
                        activity={() => changeStatementStatus(statement.idStatement, 'accept')}>
                            <Text style={styleStatementItem.textButton}>Отклонить</Text>
                        </Button>
                    </View>
                }
            </View>
        </View>
    )
}

export default memo(StatementItem,
    (oldProps, newProps) => {
      if (
        oldProps.statementInit !== newProps.statementInit &&
        oldProps.statementInit.idStatement !== newProps.statementInit.idStatement
      ) {
        return true;
      }
      return false;
    });