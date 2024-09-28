 interface staffers {
    id: number;
    name: string;
    speciality: string;
    archive: boolean;
    lastVisite: Date;
    online: boolean;
}

export const Staffers: staffers[] = [
    {
        id: 0,
        name: 'Вознесенский Иван Сергеевич',
        speciality: 'Тревел-менеджер',
        archive: false,
        online:  false,
        lastVisite: new Date()
    },
    {
        id: 1,
        name: 'Соколова Татьяна Ивановна',
        speciality: 'Тревел-менеджер',
        archive: true,
        online: true,
        lastVisite: new Date()
    },
]