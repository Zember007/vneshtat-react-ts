 import { CheckboxItem } from "@/shared/UI/checkbox/checkbox.props";

export interface staffers {
    id: number;
    Name: string;
    Surname: string;
    MiddleName: string;
    BirthDate?: string;
    Email?: string;
    PermissionsClassName?: string;
    IsActive?: boolean | null;
    LastOnline?: Date;
    online?: boolean;
    isSelected?: boolean;
    content?: string;
}

export interface section_employee {
    id: number,
    Surname: string,
    Name: string,
    MiddleName: string,
    PermissionsClassName?: string,
    New?:boolean,
    content: string
}

export interface sections {
    id: number
    Name: string | null
    Supervisor: section_employee | null
    Employees?: section_employee[]
    EmployeesCount?:number
    New?: boolean
}

export interface access_staffers {
    id: number
    PermissionsClassName: string
    ValidityDeadline: string | null
    IsUnlimited: boolean
}


export interface groups {
    id: number
    Name: string | null
    Supervisor: section_employee | null
    Passengers?: section_employee[]
    PassengersCount?:number
    IsActive?:boolean
    New?: boolean
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



export interface periods {
    id: number;
    DateFrom: Date | string | null;
    DateTo: Date | string | null;
    DeputyId: number | null;
    new?: boolean;
}

export const categoryDocuments: CheckboxItem[] = [
    { content: "Основные документы", isSelected: false, id: 1, code: '' },
    { content: "Документы до 14 лет", isSelected: false, id: 2, code: '' },
    { content: "Временные документы РФ", isSelected: false, id: 3, code: '' },
    { content: "Военные документы", isSelected: false, id: 4, code: '' },
    { content: "Временное отсутствие документа", isSelected: false, id: 5, code: '' },
    { content: "Дипломатические", isSelected: false, id: 6, code: '' },
]

export const typeDocuments: CheckboxItem[] = [
    { content: "Паспорт РФ", isSelected: false, id: 1, code: '', category: '' },
    { content: "Заграничный паспорт РФ", isSelected: false, id: 2, code: '', category: '' },
    { content: "Паспорт СССР", isSelected: false, id: 3, code: '', category: '' },
    { content: "Иностранный документ", isSelected: false, id: 4, code: '', category: '' },
]

export const gender: CheckboxItem[] = [
    { content: "Мужской", isSelected: true, id: 1, code: 'male' },
    { content: "Женский", isSelected: false, id: 2, code: 'female' }
]

export const access: CheckboxItem[] = [
    { content: "Сотрудник", isSelected: false, id: 1, code: 'employee' },
    { content: "Сотрудник+", isSelected: false, id: 2, code: 'employee_plus' },
    { content: "Менеджер", isSelected: false, id: 3, code: 'manager' },
    { content: "Менеджер+", isSelected: false, id: 4, code: 'manager_plus' }
]

export const level: CheckboxItem[] = [
    { content: "Руководство", isSelected: true, id: 1 },
    { content: "Линейный персонал", isSelected: false, id: 2 }
]

export const tickets: CheckboxItem[] = [
    { content: "Руководство", isSelected: true, id: 1 },
    { content: "Линейный персонал", isSelected: false, id: 2 }
]

export const accommodation: CheckboxItem[] = [
    { content: "Руководство", isSelected: true, id: 1 },
    { content: "Линейный персонал", isSelected: false, id: 2 }
]

export const taxi: CheckboxItem[] = [
    { content: "Руководство", isSelected: false, id: 1 },
    { content: "Линейный персонал", isSelected: true, id: 2 }
]

export const right: CheckboxItem[] = [
    { content: "Руководство", isSelected: false, id: 1 },
    { content: "Линейный персонал", isSelected: true, id: 2 }
]

export const reports: CheckboxItem[] = [
    { content: "По умолчанию", isSelected: true, id: 1 },
]

export const deputy: CheckboxItem[] = [
    { content: "Соколовская Анастасия", isSelected: true, id: 1 },
]

export const structure: structure[] = [
    {
        id: 1,
        name: 'Должность'
    },
    {
        id: 2,
        name: 'Администрация'
    },
]

export const require: CheckboxItem[] = [
    { content: "Нет", isSelected: true, id: 1 },
    { content: "Да", isSelected: false, id: 2 },
]

