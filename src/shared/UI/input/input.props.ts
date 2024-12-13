import {InputHTMLAttributes} from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    extraClass?: string
    extraClassInput?: string
    withEraser?: boolean
}