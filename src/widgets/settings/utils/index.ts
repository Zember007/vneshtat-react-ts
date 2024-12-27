import { CheckboxItem } from "@/shared/UI/checkbox/checkbox.props";

export const langs: CheckboxItem[] = [
    { content: "Русский", isSelected: true, id: 1, code: 'russian' }
]

export const currency: CheckboxItem[] = [
    { content: "₽, Российский рубль", isSelected: true, id: 1, code: 'rub' }
]

export const time_zone: CheckboxItem[] = [
    { content: "Определять автоматически", isSelected: true, id: 1, code: 'Auto' }
]

export const time_zone_jorneys: CheckboxItem[] = [
    { content: "Как в городе", isSelected: true, id: 1, code: 'InTraveledTown' }
]

export const theme: CheckboxItem[] = [
    { content: "Светлая тема", isSelected: true, id: 1 }
]

export const email_services: CheckboxItem[] = [
    { content: "Создание поездки ", isSelected: false, id: 1, code: 'CreatingTrip'},
    { content: "Бронирование услуги ", isSelected: false, id: 2, code: 'BookingService'},
    { content: "Оформление услуги", isSelected: false, id: 3, code: 'FormalizationService'},
    { content: "Отмена услуги", isSelected: false, id: 4, code: 'CancelingService'},
    { content: "Запрос отмены услуги", isSelected: false, id: 5, code: 'RequestToCancelService'},
    { content: "Аннуляция услуги", isSelected: false, id: 6, code: ''},
    { content: "Согласование или отказ", isSelected: false, id: 7, code: 'AcceptedOrDeclined'},
]

export const email_reserve: CheckboxItem[] = [
    { content: "Истекающий резерв", isSelected: false, id: 1 }
]

export const email_jorneys: CheckboxItem[] = [
    { content: "Предстоящая поездка", isSelected: false, id: 1 }
]

export const email_jorneys_time: CheckboxItem[] = [
    { content: "1 день", isSelected: true, id: 1 },
]

export const email_reserve_time: CheckboxItem[] = [
    { content: "15 минут", isSelected: true, id: 1 },
]