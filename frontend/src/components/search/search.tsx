import { FC } from "react"
import { View, StyleSheet, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Input from "../../uikit/input/input"
import Button from "../../uikit/button/button"
import { SearchIcon } from "../../../public/icons"
import { StackNavigationProp } from "@react-navigation/stack"
import { CompetitionsParamList } from "../navigation/navBarCompetitions"
import { GroupsParamList } from "../navigation/navBarGroups"

type SearchProps = {
    url: string,
    placeholder?: string
}

type SearchScreenNavigationProp = StackNavigationProp<CompetitionsParamList> | StackNavigationProp<GroupsParamList>

const Search: FC<SearchProps> = ({url, placeholder}) => {

    const navigation = useNavigation<SearchScreenNavigationProp>();

    const search = (value: string) => {
        navigation.setParams({url: url, value: value}) 
        
    }

    return (
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
                placeholder={placeholder ? placeholder : "Введите город"}
                style = {searchStyle.input}
                placeholderTextColor= '#888'
                onChangeText={text => search(text)}
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