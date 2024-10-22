import {Dispatch, ReactNode, SetStateAction} from "react";

export interface SwitchProps {
    firstChild: ReactNode
    secondChild: ReactNode
    isSelected: boolean,
    extraChildClass?: string,
    extraActiveChildClass?: string,
    selectedBg?: string,
    unselectedBg?: string,
    extraClass?: string,
    setter: Dispatch<SetStateAction<boolean>>
}