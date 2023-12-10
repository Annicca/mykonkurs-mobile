import {FC} from 'react';
import {View} from 'react-native';
import { StepProps } from '../../types/StepProps';
import InputControl from '../../uikit/input/inputControl';
import { StatementType } from '../../consts/const';
import { StatementType as TStatement } from '../../types/StatementType';
import DateInput from '../../uikit/dateInput/DateInput';
import DropDown from '../../uikit/dropDown/DropDown';
import { authStyle } from '../../styles/auth/authStyle';
import { styleInput } from '../../styles/input';
import { Cities } from '../../hooks/useFetchCity';
import { getFormatedDate } from 'react-native-modern-datepicker';

type StatementFormInnerProps = StepProps & {
    type: string,
    cities: Cities[],
    initialData?: TStatement & {category?: string | null}
}

const StatementFormInner: FC<StatementFormInnerProps> = ({control, errors, type, cities, initialData}) => {
    return(
        <View style = {authStyle.form}>
            <InputControl 
                control={control}
                name = 'name'
                placeholder='Название'
                defaultValue={initialData?.name}
                rules={{
                    maxLength : {value: 25, message: "Введено более 25 символов"},
                    required : 'Поле обязательно',
                }}
                error={errors.name?.message}
            />
            <DropDown
                items = {cities}
                placeholder={{ label : 'Выберите город' , value : null }}
                control={control}
                name = 'city'
                rules = {{
                    required : 'Поле обязательно',
                }}
                value={initialData?.city.city}
                containerWidth={'100%'}
                onValueChange={() => {}}
                error = {errors.city && errors.city.message?.toString()}
            />
            {type === StatementType.GROUP &&
                <InputControl 
                    control={control}
                    name = 'address'
                    defaultValue={initialData?.address !== null ? initialData?.address : ''}
                    placeholder='Адрес'
                    rules={{
                        required : 'Поле обязательно',
                    }}
                    error={errors.address?.message}
                />
            }
            {initialData &&                 
                <InputControl 
                    control={control}
                    name = 'category'
                    defaultValue={initialData?.category !== null ? initialData?.category : ''}
                    placeholder='Стиль'
                    error={errors.address?.message}
                />}
            {type === StatementType.COMETITION &&
                <>
                    <DateInput
                        control={control}
                        name = 'dateStart'
                        defaultValue={initialData?.dateStart ? getFormatedDate(new Date(Date.parse(initialData?.dateStart)), 'YYYY/MM/DD' ) : ''}
                        placeholder='Дата начала'
                        rules = {{
                            required: 'Поле обязательно'
                        }}
                        error = {errors.dateSatert?.message}
                    />
                    <DateInput
                        control={control}
                        name = 'dateFinish'
                        defaultValue={initialData?.dateFinish ? getFormatedDate(new Date(Date.parse(initialData?.dateFinish)), 'YYYY/MM/DD' ) : ''}
                        placeholder='Дата окончания'
                        rules = {{
                            required: 'Поле обязательно'
                        }}
                        error = {errors.dateFinish?.message}
                    />
                </>
            }
            <InputControl 
                control={control}
                name = 'description'
                defaultValue = {initialData?.description}
                placeholder='Описание'
                style = {styleInput.textarea}
                multiline = {true}
            />
        </View>
    )
}

export default StatementFormInner;