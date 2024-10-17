import {InputHTMLAttributes} from "react";

export interface InputDateProps extends InputHTMLAttributes<HTMLInputElement>{
    viewValue: Date | Date[] | null
    inputValue: Date | Date[] | null
    setter: any
    noNeedButton?: boolean;
    noNeedHandler?: () => void;
    isShortDate?: boolean
    withIcon?: boolean
    calendarOpt?: any
    placeholder?: string
    extraCalendarClass?: string
    extraClass?: string
    extraClassIcon?:string;
}