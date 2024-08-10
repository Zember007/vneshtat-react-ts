import {InputHTMLAttributes} from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    extraClass?: string
    withEraser?: boolean
}