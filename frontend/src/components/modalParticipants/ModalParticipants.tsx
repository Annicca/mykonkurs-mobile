import {FC} from 'react'
import usePaginationFetch from '../../hooks/usePaginationFetch';
import { useUserContext } from '../../context/UserContext';
import { GroupType } from '../../types/GroupType';
import PaginationList from '../paginationList/PaginationList';
import { View, TouchableOpacity, ListRenderItem, Modal, StyleSheet } from 'react-native'
import Button from '../../uikit/button/button';
import ParticipantItem from '../participantItem/ParticipantItem';

type ModalParticipantsProps = {
    handleOpen: () => void,
    handleGroup: (group: GroupType) => void,
    isOpen: boolean
}

const ModalParticipants : FC<ModalParticipantsProps> = ({handleOpen, handleGroup, isOpen}) => {

    const {user, jwt} = useUserContext().context;

    const participants = usePaginationFetch<GroupType>(`mygroups/${user?.idUser}`, jwt)

    const renderParticipant: ListRenderItem<GroupType> = ({item}) => {
        return (
            <Button activity={() => handleGroup(item)}>
                <ParticipantItem participant={item}/>
            </Button>
        );
    };

    if(!user) return null;
    else 
        return(
            <Modal
            animationType='slide'
            transparent={true}
            visible={isOpen}
            onRequestClose={handleOpen}>
                <TouchableOpacity activeOpacity={1} onPress={handleOpen} style={{width: '100%', height: '100%'}}>
                    <View style={modalStyle.modal}>
                        <PaginationList 
                            stateList={participants}
                            renderItem={renderParticipant}
                            emtytext='У вас ещё нет коллективов'
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        )
}

const modalStyle = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
})

export default ModalParticipants;