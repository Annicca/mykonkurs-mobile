import { FC } from "react"
import { View, StyleSheet, Image } from "react-native"
import Input from "../input/input"
import Button from "../button/button"

const Search: FC = () => {
    return(
        <View style = {searchStyle.search}>
            <Button
                // activity={}
                buttonStyle={searchStyle.icon}
            >
                <Image 
                    source={require('../../public/icons/search.png')} 
                    
                />
            </Button>

            <Input 
                placeholder="Введите город"
                inputStyle = {searchStyle.input}
                placeholderTextColor= '#888'
            />
        </View>
    )
}

const searchStyle = StyleSheet.create({
    search: {
        width: '100%',
        alignItems: 'stretch',
    },
    input: {
        height: 40,
        paddingLeft: 40,
        borderRadius: 10,
        backgroundColor: '#FFF',
    },
    icon: {
        position: 'absolute',
        zIndex: 1,
        top: '25%',
        left: 10,
    }
})

export default Search;