export const chooseStatusStatement = (status: string): string | undefined => {
    switch (status) {
        case 'ACCEPTED': return 'Принято'
        case 'REJECTED': return 'Отклонено'
    }
}