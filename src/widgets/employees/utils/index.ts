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
    New?: boolean,
    content: string
}

export interface sections {
    id: number
    Name: string | null
    Supervisor: section_employee | null
    Employees?: section_employee[]
    EmployeesCount?: number
    New?: boolean
}

export interface access_staffers {
    EmployeeId: number
    PermissionsClassName: string
    ValidityDeadline: string | null
    IsUnlimited: boolean
}

export interface documents_staffers {   
    EmployeeId?: number,
    Passengerid?: number,
    Documents: documents[] 
}

export interface documents {
    id?: number,
    content?: string,
    DocumentType: string,
    Type: string,
    Nationality: string,
    Species: string,
    Number: string,
    ValidityDeadline: string | null,
    Surname: string,
    Name: string,
    MiddleName: string,
    DateOfIssue: string | null,
    New?: boolean,
    Edit?: boolean,
    isSelected?:boolean
}



export interface groups {
    id: number
    Name: string | null
    Supervisor: section_employee | null
    Passengers?: section_employee[]
    PassengersCount?: number
    IsActive?: boolean
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
    { content: "Основные документы", isSelected: false, id: 1, code: '1' },
    { content: "Документы до 14 лет", isSelected: false, id: 2, code: '2' },
    { content: "Временные документы РФ", isSelected: false, id: 3, code: '3' },
    { content: "Военные документы", isSelected: false, id: 4, code: '4' },
    { content: "Временное отсутствие документа", isSelected: false, id: 5, code: '5' },
    { content: "Дипломатические", isSelected: false, id: 6, code: '6' },
]

export const typeDocuments: CheckboxItem[] = [
    { content: "Паспорт РФ", isSelected: false, id: 1, code: 'passport_rf', category: '1' },
    { content: "Заграничный паспорт РФ", isSelected: false, id: 2, code: 'transpartncy_rf', category: '1' },
    { content: "Паспорт СССР", isSelected: false, id: 3, code: 'passport_ussr', category: '1' },
    { content: "Иностранный документ", isSelected: false, id: 4, code: 'foreign_passport', category: '1' },
    { content: "Свидетельство о рождении", isSelected: false, id: 5, code: 'birth_certificate', category: '2' },
    { content: "Мед. свидетельство о рождении", isSelected: false, id: 6, code: 'medical_birth_certificate', category: '2' },
    { content: "Удостоверение личности лица без гражданства", isSelected: false, id: 7, code: 'stateless_person_id_card', category: '3' },
    { content: "Вид на жительство", isSelected: false, id: 8, code: 'residence_permit', category: '3' },
    { content: "Свидетельство беженца", isSelected: false, id: 9, code: 'asylum_certificate', category: '3' },
    { content: "Удостоверение беженца", isSelected: false, id: 10, code: 'refugee_certificate', category: '3' },
    { content: "Удостоверение личности моряка", isSelected: false, id: 11, code: 'seafarers_id_card', category: '4' },
    { content: "Военный билет для военнослужащих срочной службы, по контракту и курсантов", isSelected: false, id: 4, code: 'military_card', category: '4' },
    { content: "Удостоверение личности военнослужащего", isSelected: false, id: 12, code: 'servicemans_id_card', category: '4' },
    { content: "Свидетельство на возвращение", isSelected: false, id: 13, code: 'certificate_of_return', category: '5' },
    { content: "Справка об утере паспорта", isSelected: false, id: 14, code: 'certificate_of_lost_passport', category: '5' },
    { content: "Дипломатический паспорт", isSelected: false, id: 15, code: 'diplomatic_passport', category: '6' },
    { content: "Служебный паспорт", isSelected: false, id: 16, code: 'service_passport', category: '6' },
]

export const getNameDocument = (code: string) => {
    const name = typeDocuments.find(item => item.code === code)?.content

    return name
}

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

