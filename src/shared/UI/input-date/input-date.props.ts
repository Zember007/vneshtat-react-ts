import {InputHTMLAttributes} from "react";

export interface InputDateProps extends InputHTMLAttributes<HTMLInputElement>{
    inputValue: Date | Date[] | null
    setter: any
    noNeedHandler?: () => void;
    isShortDate?: boolean
    withIcon?: boolean
    calendarOpt?: any
    placeholder?: string
    extraCalendarClass?: string
    extraClass?: string
}