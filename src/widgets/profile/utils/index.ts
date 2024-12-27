import { CheckboxItem } from "@/shared/UI/checkbox/checkbox.props";

export const autoExitSwith: CheckboxItem[] = [
    { content: "Включен", isSelected: false, id: 1, code: 'on' },
    { content: "Выключен", isSelected: true, id: 2, code: 'off' }
]

export const idleTime: CheckboxItem[] = [
    { content: "15 мин", isSelected: false, id: 0, code: '15' },
    { content: "30 мин", isSelected: false, id: 1, code: '30' },
    { content: "1 час", isSelected: true, id: 2, code: '60' },
    { content: "2 часа", isSelected: false, id: 3, code: '120' },
    { content: "3 часа", isSelected: false, id: 4, code: '180' },
    { content: "4 часа", isSelected: false, id: 5, code: '240' },
    { content: "5 часов", isSelected: false, id: 6, code: '300' }
]