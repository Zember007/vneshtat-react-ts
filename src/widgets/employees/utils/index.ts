import {CheckboxItem} from "@/shared/UI/checkbox/checkbox.props";

 interface staffers {
    id: number;
    name: string;
    speciality: string;
    archive: boolean;
    lastVisite: Date;
    online: boolean;
}

interface sections {
    id: number;
    name: string;
    manager: string;
    staffers: number;
}

interface groups {
    id: number;
    name: string;
    archive: boolean;
    staffers: number;
}

interface structure {
    id: number;
    name: string;
}

interface require {
    id: number;
    name: string;
    code: boolean;
}




export const access: CheckboxItem[] = [
    {content: "Сотрудник", isSelected: true, id: 1},
    {content: "Менеджер", isSelected: false, id: 2}
]

export const level: CheckboxItem[] = [
    {content: "Руководство", isSelected: true, id: 1},
    {content: "Линейный персонал", isSelected: false, id: 2}
]

export const tickets: CheckboxItem[] = [
    {content: "Руководство", isSelected: true, id: 1},
    {content: "Линейный персонал", isSelected: false, id: 2}
]

export const accommodation: CheckboxItem[] = [
    {content: "Руководство", isSelected: true, id: 1},
    {content: "Линейный персонал", isSelected: false, id: 2}
]

export const taxi: CheckboxItem[] = [
    {content: "Руководство", isSelected: false, id: 1},
    {content: "Линейный персонал", isSelected: true, id: 2}
]

export const right: CheckboxItem[] = [
    {content: "Руководство", isSelected: false, id: 1},
    {content: "Линейный персонал", isSelected: true, id: 2}
]

export const reports: CheckboxItem[] = [
    {content: "По умолчанию", isSelected: true, id: 1},
]

export const deputy: CheckboxItem[] = [
    {content: "Соколовская Анастасия", isSelected: true, id: 1},
]

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

export const passengers: staffers[] = [
    {
        id: 0,
        name: 'Вознесенский Иван Сергеевич',
        speciality: 'Тревел-менеджер',
        archive: false,
        online: false,
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

export const sections: sections[] = [
    {
        id:1,
        name: 'Администрация',
        manager: 'Вознесенский Иван Сергеевич',
        staffers: 3
    },
    {
        id:2,
        name: 'Администрация',
        manager: 'Вознесенский Иван Сергеевич',
        staffers: 3
    },
]

export const groups: groups[] = [
    {
        id: 0,
        name: 'Сборная Самары по биатлону',
        staffers: 18,
        archive: false
    },
    {
        id: 1,
        name: 'ДЮСШ №5 г. Самары',
        staffers: 34,
        archive: true
    },
]

export const structure: structure[]  = [
    {
        id: 1,
        name: 'Должность'
    },
    {
        id: 2,
        name: 'Администрация'
    },
]

export const require: CheckboxItem[]  = [
    {content: "Нет", isSelected: true, id: 1},
    {content: "Да", isSelected: false, id: 2},
]