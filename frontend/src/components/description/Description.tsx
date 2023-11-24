import { FC } from "react";
import { Text, StyleSheet } from "react-native";
import { tileStyle } from "../../styles/title/TitleStyle";

type DescriptionProps = {
    description: string
}

const Description:FC<DescriptionProps> = ({description}) => {
    return(
        <Text style={[tileStyle, styleDescription.description]}>{description}</Text>
    )
}

const styleDescription = StyleSheet.create({
    description: {
        paddingTop: 30,
        fontSize: 16,
        lineHeight: 24
    },
})

export default Description;