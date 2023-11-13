import { UserRole } from "../consts/const"

export const getRoleUser = (role: UserRole): string => {
    switch (role) {
        case UserRole.ORGANIZER: return 'Организатор конкурсов';
        case UserRole.DIRECTOR: return 'Руководитель коллектива';
        case UserRole.ADMIN: return 'Администратор';
        case UserRole.CLIENT: return 'Клиент';
    }
}