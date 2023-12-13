import { FC, useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { AccountParamList } from "../components/navigation/navBarAccount";
import { useUserContext } from "../context/UserContext";
import usePaginationFetch from "../hooks/usePaginationFetch";
import { GroupType } from "../types/GroupType";
import { ListRenderItem } from "react-native";
import ParticipantItem from "../components/participantItem/ParticipantItem";
import PaginationList from "../components/paginationList/PaginationList";

const Participants: FC<StackScreenProps<AccountParamList, 'Participants'>> = ({navigation, route}) => {

    const {user, jwt: token} = useUserContext().context;

    const [url, setUrl] = useState<string>(`mycompetitions/participants/${route.params.competitionId}`)

    const isFocused = useIsFocused()

    const participants = usePaginationFetch<GroupType>(url, token, isFocused)

    useEffect(() => {
        setUrl(`mycompetitions/participants/${route.params.competitionId}`)
    }, [route.params])

    const renderParticipant: ListRenderItem<GroupType> = ({item}) => {
        return (
            <ParticipantItem participant={item}/>
        );
    };

    return(
        <PaginationList 
        stateList={participants}
        renderItem={renderParticipant}
        emtytext='У вас ещё нет коллективов'
        />
    )
}

export default Participants;