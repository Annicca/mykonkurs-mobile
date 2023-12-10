import {FC} from 'react';
import Button from '../button/button';
import {Image, StyleSheet} from 'react-native'
import { OkIcon } from '../../../public/icons';

type ButtonSaveProps = {
    activity: () => void
}

const ButtonSave: FC<ButtonSaveProps> = ({activity}) => {
    return(
        <Button buttonStyle={buttonStyle.save} activity={activity}>
            <Image source={OkIcon} style={{width: 20, height: 20}} />
        </Button>
    )
}

const buttonStyle = StyleSheet.create({
    save: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#FFD700',
        alignItems: 'center'
    }
})

export default ButtonSave;