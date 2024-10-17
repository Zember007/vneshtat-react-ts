export interface CheckboxProps {
    items: CheckboxItem[]
    onChange: any
    childClass?: string
}

export interface CheckboxItem {
    id: number
    content: string
    isSelected: boolean
    code?:string
}