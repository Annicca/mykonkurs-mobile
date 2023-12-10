import { FC, Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import {View, Image, Modal, StyleSheet, Dimensions} from 'react-native';
import Button from '../../uikit/button/button';
import { CloseIcon, FilterIcon } from '../../../public/icons';
import DateInput from '../../uikit/dateInput/DateInput';
import CheckBox from '../../uikit/checkBox/CheckBox';
import ButtonWithText from '../../uikit/buttonWithText/ButtonWithText';
import { yelowButtonStyle } from '../../styles/yellowButton/yellowButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { formatDateAny } from '../../utils/transformDate';
import { generalContainerStyle } from '../../styles/containers/GeneralContainer';
import { FilterType } from '../../types/FilterType';


type FilterProps = {
    filter?: FilterType,
    setFilter: Dispatch<SetStateAction<any>>
}

const Filter : FC<FilterProps> = ({filter, setFilter}) => {

    const {control , handleSubmit, formState: {errors, isValid}} = useForm({mode: "onChange"})

    const [isOpenFilter, setIsOpenFilter] = useState(false)
    
    const handleOpenFilter = () => {
        setIsOpenFilter(!isOpenFilter)
        console.log('a')
    }

    const resetFilter = () => [
        setFilter({})
    ]
    
    const onFilter = handleSubmit((data) =>{
        data.dateStart = data.dateStart &&  formatDateAny(data.dateStart, '/', '-') ;
        data.dateFinish = data.dateFinish &&  formatDateAny(data.dateFinish, '/', '-') 
        setFilter({
            ...data
        })
        handleOpenFilter()
    })
    
    return(
        <View style={[generalContainerStyle, {backgroundColor: 'transparent'}]}>
            <View style={styleFilter.buttonConteiner}>
                <Button activity={handleOpenFilter} buttonStyle={styleFilter.filterButton}>
                    <Image source={FilterIcon} style = {{width: 20, height: 20}} />
                </Button>
            </View>
            <Modal
            animationType='slide'
            transparent={true}
            visible={isOpenFilter}
            onRequestClose={handleOpenFilter}
            >
                <TouchableOpacity onPress={handleOpenFilter} activeOpacity={1} style={{width: '100%', height: '100%'}}>
                    <View style={styleFilter.modal}>
                        <Button activity={handleOpenFilter}>
                            <Image source={CloseIcon} style = {{width: 30, height: 30}} />
                        </Button>
                        <DateInput
                            control={control}
                            defaultValue={filter?.dateStart}
                            name = 'dateStart'
                            error={errors.dateStart?.message}
                        />
                        <DateInput
                            control={control}
                            defaultValue={filter?.dateFinish}
                            name = 'dateFinish'
                            error={errors.dateFinish?.message}
                        />

                        <CheckBox 
                            label = 'Набор участников'
                            control={control}
                            defaultValue = {filter?.isStatusCompetition}
                            name='isStatusCompetition'
                            error={errors.isStatusCompetition?.message}
                        />
                        <ButtonWithText activity={resetFilter} text='Отменить' buttonContainerStyle={[yelowButtonStyle.button, {width: '100%'}]} textStyle={yelowButtonStyle.textButton} />
                        <ButtonWithText activity={onFilter} text='Применить' buttonContainerStyle={[yelowButtonStyle.button,  {width: '100%'}]} textStyle={yelowButtonStyle.textButton} />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}

const styleFilter = StyleSheet.create({
    filterButton: {
        backgroundColor: '#FF6B00',
        padding: 10,
        borderRadius: 10,
    },
    buttonConteiner: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    modal: {
        position: 'absolute',
        bottom: 0,
        alignItems: 'flex-end',
        width: Dimensions.get('window').width,
        backgroundColor: '#FFF',
        padding: 20, 
        paddingTop: 10,
        rowGap: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderColor: 'rgba(136, 136, 136, 0.1);',
        borderWidth: 1
    }
})

export default Filter;