import {FC} from 'react';
import {StyleSheet, Image, ImageSourcePropType} from 'react-native';
import Button from '../../uikit/button/button';
import { yelowButtonStyle } from '../../styles/yellowButton/yellowButton';

type ArrowButtonProps = {
    disabled: boolean, 
    activity: () => void, 
    icon: ImageSourcePropType
}

const ArrowButton: FC<ArrowButtonProps> = ({disabled, activity, icon}) => {
    return(
        <Button disabled={disabled} activity={activity} buttonStyle = {[yelowButtonStyle.button, arrowButtonStyle.button]}>
            <Image source = {icon} style = {arrowButtonStyle.icon}/>
        </Button>
    )
}

const arrowButtonStyle = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 40
    },

    icon: {
        width: 20, 
        height: 20
    }

})

export default ArrowButton;