import {CheckboxItem} from "@/shared/UI/checkbox/checkbox.props";

export interface RouteItem {
    id: number;
    cityFrom: string | null;
    cityBefore: string | null;
}

interface Route {
    class: string | null;
    items: RouteItem[];
}

interface Team {
    name: string;
    surname: string;
    passport: string;
    international_passport: string;
}

interface Option {
    name: string;
    type?: string;
    time?: string;
}

export interface Services {
    id: number;
    type: string | null;
    route: Route;
    city: string | null;
    team: Array<Team> | number | null;
    filters: Array<any> | null;
    option: Array<Option> | null;
}

export const projects: CheckboxItem[] = [
    {content: "project-1", isSelected: false, id: 1},
    {content: "project-2", isSelected: false, id: 2},
]

export const center_costs: CheckboxItem[] = [
    {content: "center-1", isSelected: false, id: 1},
    {content: "center-2", isSelected: false, id: 2},
]

export const serviceTypes: CheckboxItem[] = [
    {content: "Самолёт", isSelected: false, id: 1, code:'flight'},
    {content: "Поезд", isSelected: false, id: 2, code:'train'},
    {content: "Автобус", isSelected: false, id: 3, code:'bus'},
    {content: "Отели", isSelected: false, id: 4, code:'hotels'},
]

export const passagersType: CheckboxItem[] = [
    {content: "Ввести количество пассажиров", isSelected: false, id: 1, code:'number'},
    {content: "Указать конкретных пассажиров", isSelected: false, id: 2, code:'array'},
]