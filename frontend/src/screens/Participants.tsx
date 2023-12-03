import { FC, useState, useEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { AccountParamList } from "../components/navigation/navBarAccount";
import { useUserContext } from "../context/UserContext";
import usePaginationFetch from "../hooks/usePaginationFetch";
import { GroupType } from "../types/GroupType";
import { Text } from "react-native";
import { accentTextStyle } from "../styles/accentText/AccentText";
import Spinner from "../components/spinner/Spinner";

const Participants: FC<StackScreenProps<AccountParamList, 'Participants'>> = ({navigation, route}) => {

    const {user, jwt: token} = useUserContext().context;

    const [url, setUrl] = useState<string>(`/mycompetitions/participants/${route.params.competitionId}`)

    const groupData = usePaginationFetch<GroupType>(url, token)

    useEffect(() => {
        setUrl(`/mycompetitions/participants/${route.params.competitionId}`)
    }, [route.params])


    if(groupData.loading) {
        return (
            <Spinner />
        )
    } else if(groupData.data && groupData.data.length === 0) {
        return(
            <Text style = {accentTextStyle}>У вас ещё нет участников</Text>
        )
    } else 
        return(
            
            <Text>Participants</Text>
        )
}

export default Participants;