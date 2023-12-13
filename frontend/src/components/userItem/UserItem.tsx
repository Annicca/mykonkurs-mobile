import { FC, memo } from 'react';
import { UserType } from '../../types/UserType';
import AccountInfo from '../accountInfo/AccountInfo';

type UserItemProps = {
    user: UserType
}

const UserItem : FC<UserItemProps> = ({user}) => {
    return(
        <AccountInfo user={user} isAccount = {false} />
    )
}

export default memo(UserItem,
    (oldProps, newProps) => {
      if (
        oldProps.user !== newProps.user &&
        oldProps.user.idUser !== newProps.user.idUser
      ) {
        return true;
      }
      return false;
    });