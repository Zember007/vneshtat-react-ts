import {CheckboxItem} from "@/shared/UI/checkbox/checkbox.props";

export const Departments: CheckboxItem[] = [
    {content: "Администрация", isSelected: true, id: 1},
    {content: "Бухгалтерия", isSelected: false, id: 2},
    {content: "Финансовый отдел", isSelected: false, id: 3},
]

export const NoDepartments: CheckboxItem[] = [
    {content: "Вознесенский Иван Сергеевич", isSelected: true, id: 1},
    {content: "Соколовская Анастасия Александрован", isSelected: false, id: 2},
    {content: "Романов Пётр Николаевич", isSelected: false, id: 3},
]

export const Services: CheckboxItem[] = [
    {content: "Самолёт", isSelected: true, id: 1},
    {content: "Поезд", isSelected: false, id: 2},
    {content: "Отели", isSelected: false, id: 3},
    {content: "Автобус", isSelected: false, id: 4},
    {content: "Аэроэкспресс", isSelected: false, id: 5},
    {content: "Трансфер", isSelected: false, id: 6},
    {content: "Такси", isSelected: false, id: 7},
]