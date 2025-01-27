import {Range} from "@/shared/types";
import {CheckboxItem} from "@/shared/UI/checkbox/checkbox.props";

export const priceRanges: Range = {min: 10000, max: 167450}
export const timeOnWayRanges: Range = {min: 0, max: 885}

export const airportsFrom: CheckboxItem[] = [
    {content: "Шереметьево", isSelected: true, id: 1},
    {content: "Домодедово", isSelected: false, id: 2},
    {content: "Внуково", isSelected: false, id: 3},
]

export const classes: CheckboxItem[] = [
    {content: "Эконом", isSelected: false, id: 1},
    {content: "Комфорт", isSelected: true, id: 2},
    {content: "Комфорт+", isSelected: false, id: 3},
    {content: "Бизнес", isSelected: false, id: 4},
]

interface time {
    time: string
    date: string
}

interface jorney {
    duration: string
    timeFrom: time
    timeTo: time
    transfer: boolean
}

export interface jorneys {
    id: number
    items: jorney[]
    price: number
    like: boolean
    pin: boolean
}

export interface filters {
    byQueue: boolean,
    isChair: boolean,
    NoTransfer: boolean,
    Cheaper: boolean,
    Faster: boolean    
}