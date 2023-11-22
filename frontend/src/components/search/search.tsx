import { FC } from "react"
import { View, StyleSheet, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { NavigationProp } from "@react-navigation/native"
import Input from "../input/input"
import Button from "../button/button"
import { TabParamList } from "../tabbar/TabBar"
import { SearchIcon } from "../../../public/icons"
import { GroupsParamList } from "../navigation/navBarGroups"
import { CompetitionsParamList } from "../navigation/navBarCompetitions"

type SearchProps = {
    url: string
}

const Search: FC<SearchProps> = ({url}) => {

    const navigation = useNavigation();

    const search = (value: string) =>{
        navigation.setParams({url: url, city: value}) 
    }

    return(
        <View style = {searchStyle.search}>
            <Button
                buttonStyle={searchStyle.iconButton}
            >
                <Image 
                    resizeMode = 'contain'
                    source={SearchIcon} 
                    
                />
            </Button>

            <Input 
                placeholder="Введите город"
                style = {searchStyle.input}
                placeholderTextColor= '#888'
                // defaultValue={valueSearch}
                onChangeText={text =>search(text)}
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
        color: '#888'
    },
    iconButton: {
        position: 'absolute',
        zIndex: 1,
        top: '25%',
        left: 10,
        height: 10,
        width: 15,

    },
})

export default Search;