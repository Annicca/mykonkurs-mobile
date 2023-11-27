import { FC } from "react";
import { imgURL } from "../../consts/const";
import { imgStyle } from "../../styles/img/ImgStyle";
import { PhotoImage } from "../../../public/images";
import { View, Image, StyleProp, ViewStyle } from "react-native";

type ImageProps = {
    containerStyle: StyleProp<ViewStyle>, 
    source: string | null, 
    alt: string
}

const CustomImage:FC<ImageProps> = ({containerStyle, source, alt}) => {
    return(
        <View style = {containerStyle}>
            <Image source={source ? {uri: imgURL + source } : PhotoImage} style = {imgStyle} alt = {alt} resizeMethod="resize" resizeMode="cover" />
        </View>
    )
}

export default CustomImage;