import { CheckboxItem } from "@/shared/UI/checkbox/checkbox.props";

export const autoExitSwith: CheckboxItem[] = [
    { content: "Включен", isSelected: false, id: 1 },
    { content: "Выключен", isSelected: true, id: 2 }
]

export const idleTime: CheckboxItem[] = [
    { content: "15 мин", isSelected: false, id: 1 },
    { content: "30 мин", isSelected: false, id: 1 },
    { content: "1 час", isSelected: true, id: 2 },
    { content: "2 часа", isSelected: false, id: 3 },
    { content: "3 часа", isSelected: false, id: 4 },
    { content: "4 часа", isSelected: false, id: 5 },
    { content: "5 часов", isSelected: false, id: 6 }
]