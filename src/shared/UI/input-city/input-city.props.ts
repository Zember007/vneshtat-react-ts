import {InputHTMLAttributes} from "react";

export interface InputCityProps extends InputHTMLAttributes<HTMLInputElement>{
    callback: (city: any) => void;
    value: string,
    setValue: (str: string) => void;
    extraClass?: string
    inputClass?: string
    withEraser?: boolean
}