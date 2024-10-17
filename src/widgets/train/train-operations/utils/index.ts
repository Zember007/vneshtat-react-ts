import {CheckboxItem} from "@/shared/UI/checkbox/checkbox.props";
import {Range, TicketOption} from "@/shared/types";

export const priceRanges: Range = {min: 13000, max: 130000}
export const timeOnWayRanges: Range = {min: 0, max: 885}

export const prices: CheckboxItem[] = [
    {content: "Любой тип поезда", isSelected: true, id: 1},
    {content: "Скоростной", isSelected: false, id: 2},
    {content: "Фирменный", isSelected: false, id: 3},
    {content: "Двухэтажный", isSelected: false, id: 4},
]

export const weignTypes: CheckboxItem[] = [
    {content: "Все поезда", isSelected: true, id: 1},
    {content: "Ласточка", isSelected: false, id: 2},
    {content: "Сапсан", isSelected: false, id: 3},
    {content: "Красная Стрела", isSelected: false, id: 4},
]

export const carriers: CheckboxItem[] = [
    {content: "ГРАНД", isSelected: true, id: 1},
    {content: "ДОСС", isSelected: false, id: 2},
    {content: "ТВЕРСК", isSelected: false, id: 3},
    {content: "ФПК", isSelected: false, id: 4},
]

export const railwaysFrom: CheckboxItem[] = [
    {content: "Ленинградский вокзал", isSelected: true, id: 1},
    {content: "Восточный вокзал (ТПУ Черкизово)", isSelected: false, id: 2},
]

export const services: CheckboxItem[] = [
    {content: "Питание", isSelected: false, id: 1},
    {content: "Специальные тарифы", isSelected: false, id: 2},
    {content: "Электронная регистрация", isSelected: false, id: 3},
    {content: "Для пассажиров с детьми", isSelected: false, id: 4},
    {content: "На этот поезд можно купить билет по невозвратному билету", isSelected: false, id: 5},
    {content: "Места для инвалидов", isSelected: false, id: 6},
    {content: "Вагон-ресторан или буфет", isSelected: false, id: 7},
    {content: "ИРС (Информационно-развлекательный сервис)", isSelected: false, id: 8},
    {content: "Фирменный", isSelected: false, id: 9},
    {content: "Перевозка животных без сопровождающего", isSelected: false, id: 10},
    {content: "Багаж в специализированном купе", isSelected: false, id: 11},
    {content: "Постельное белье", isSelected: false, id: 12},
    {content: "Двухэтажный поезд", isSelected: false, id: 13},
]

export const ticketOptionsMock: TicketOption[] = [{
    id: 1,
    title: "Сидячие",
    isSelected: false,
    count: 345,
    fromPrice: "000"
},{
    id: 2,
    title: "Плацкарт",
    isSelected: false,
    count: 25,
    fromPrice: "0000"
},{
    id: 3,
    title: "Купе",
    isSelected: false,
    count: 0,
    fromPrice: "00 000"
},{
    id: 4,
    title: "Люкс",
    isSelected: false,
    count: 14,
    fromPrice: "000 000"
},]