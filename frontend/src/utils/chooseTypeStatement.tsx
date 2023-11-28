export const chooseTypeStatement = (type: string): string | undefined => {
    switch (type) {
        case 'GROUP': return 'Коллектив'
        case 'COMPETITION': return 'Конкурс'
    }
}