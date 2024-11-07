import { ReactNode } from "react"

export interface CheckboxProps {
    items: CheckboxItem[]
    onChange: any
    childClass?: string
    button?: ReactNode
}

export interface CheckboxItem {
    id: number
    content: string
    isSelected: boolean
    code?:string
    category?:string
}