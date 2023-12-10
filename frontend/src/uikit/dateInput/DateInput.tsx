import { FC, useState } from 'react'
import { InputProps } from '../../types/InputProps'
import Button from '../button/button'
import DatePicker, {getFormatedDate} from 'react-native-modern-datepicker'
import Input from '../input/input'
import { View, Text, Modal, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Controller } from 'react-hook-form'
import { accentTextStyle } from '../../styles/accentText/AccentText'
import { styleInput } from '../../styles/input'
import { CalendarIcon } from '../../../public/icons'
import { textStyle } from '../../styles/text/textStyle'
import ButtonWithText from '../buttonWithText/ButtonWithText'

const DateInput: FC<InputProps> = ({
    control, 
    rules,
    name,
    error,
    placeholder, 
    placeholderTextColor, 
    defaultValue,
    secureTextEntry}) => {

    const [date, setDate] = useState<string | undefined>()
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isFocused, setFocused] = useState(false)

    const today = new Date()

    const minDate = getFormatedDate(new Date(today.setDate(today.getDate() + 1)), 'YYYY/MM/DD')

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    const handleDate = (date: string) => {
        setDate(date)
    }

    const handleFocus = () => {
        setFocused(true)
    }

    return(
        <>
            
            <View style = {dateInputStyle.containerDate}>
                <View style={dateInputStyle.dateInput}>
                    {rules?.required && <Text style={accentTextStyle}>*</Text>}
                    <Input
                        defaultValue={date ? date : defaultValue}
                        placeholder={placeholder}
                        style = {isFocused ? [styleInput.input, styleInput.focused] : styleInput.input}
                        onFocus={handleFocus}
                        placeholderTextColor='#888'
                        
                    />
                </View>
                <Button activity={handleOpen} buttonStyle={{width: '100%'}}>
                    <Image source={CalendarIcon} style={{width: 35, height: 35}} />
                </Button>
            </View>
            {error && <Text style={accentTextStyle}>{error.toString()}</Text>}
            <Modal 
                animationType='slide'
                transparent={true}
                visible={isOpen}
                onRequestClose={handleOpen}>
                <TouchableOpacity activeOpacity={1} onPress={handleOpen} style={{width: '100%', height: '100%'}}>
                    <View style={dateInputStyle.datePickerContainer}>
                        <View style={dateInputStyle.modalView}>
                            <Controller
                                control = {control}
                                name={name}
                                rules={rules}
                                render = {({field: {value, onChange}}) => (
                                    <DatePicker
                                        mode='calendar'
                                        selected={value ? value : defaultValue}
                                        onSelectedChange={(date) => {onChange(date), handleDate(date)}}
                                        minimumDate={minDate}
                                        options={{
                                            textHeaderColor: '#FF6B00',
                                            selectedTextColor: '#FFF',
                                            mainColor: '#FF6B00',
                                        }}
                                    />
                                )} 
                            />
                            <ButtonWithText activity={handleOpen} text='Закрыть' textStyle={textStyle}/>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
            
        </>
    )
}

const dateInputStyle = StyleSheet.create({
    dateInput: {
        width: '80%'
    },
    containerDate: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        columnGap: 20,
    },
    datePickerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalView: {
        margin: 20,
        backgroundColor: '#FFF',
        opacity: 1,
        borderRadius: 20,
        width: '90%',
        padding: 20,
        alignItems: 'center'
    }
})

export default DateInput;