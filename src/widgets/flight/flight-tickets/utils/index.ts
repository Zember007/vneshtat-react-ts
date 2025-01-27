import { v4 as uuidv4 } from 'uuid';



export interface PriceData {
    id: string;
    value: number;
    month: string;
    startDay: number;
    finishDay: number;
}

export interface DayData {
    day: number;
    value: number;
}

export interface MonthData {
    month: string;
    days: DayData[];
}

function generateDayData(startValue: number, daysInMonth: number, increment: number): DayData[] {
    return Array.from({ length: daysInMonth }, (_, index) => ({
        day: index + 1,
        value: startValue + increment * index
    }));
}

function generateMonthData(): MonthData[] {
    return [
        { month: 'Январь', days: generateDayData(9400, 31, 50) },
        { month: 'Февраль', days: generateDayData(8570, 28, 40) },
        { month: 'Март', days: generateDayData(8220, 31, 60) },
        { month: 'Апрель', days: generateDayData(980, 30, 20) },
        { month: 'Май', days: generateDayData(9000, 31, 70) },
        { month: 'Июнь', days: generateDayData(970, 30, 10) },
        { month: 'Июль', days: generateDayData(5400, 31, 30) },
        { month: 'Август', days: generateDayData(8900, 31, 40) },
        { month: 'Сентябрь', days: generateDayData(920, 30, 15) },
        { month: 'Октябрь', days: generateDayData(8600, 31, 50) },
        { month: 'Ноябрь', days: generateDayData(880, 30, 25) },
        { month: 'Декабрь', days: generateDayData(9300, 31, 60) },
    ];
}

function generatePriceData(monthData: MonthData): PriceData[] {
    const { month, days } = monthData;
    const priceData: PriceData[] = [];
    const daysInMonth = days.length;
    const numIntervals = 4;

    const intervalSize = Math.ceil(daysInMonth / numIntervals);

    for (let i = 0; i < numIntervals; i++) {
        const startDay = i * intervalSize + 1;
        const finishDay = Math.min((i + 1) * intervalSize, daysInMonth);
        const value = days.find(day => day.day === startDay)?.value || 0;

        priceData.push({
            id: uuidv4(),
            month,
            startDay,
            finishDay,
            value
        });
    }

    return priceData;
}

export const generateBoardMonthData = () => {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        const date = new Date(currentYear, currentMonth, day);
        const dayOfWeek = date.toLocaleDateString('ru-RU', { weekday: 'short' });
        const month = date.toLocaleDateString('ru-RU', { month: 'short' });

        return {
            day,
            dayOfWeek,
            month,
            value: Math.floor(Math.random() * 10000),
        };
    });
    const startOffset = Math.max(0, currentDay - 12);
    const endOffset = Math.min(daysInMonth, currentDay + 11);
    const neededDays = 30;
    const startIdx = Math.max(0, startOffset - (neededDays - (endOffset - startOffset)));
    const endIdx = Math.min(daysInMonth, startOffset + neededDays);
    const displayedDays = days.slice(startIdx, endIdx);

    return { displayedDays };
};

function generateAllPriceData(months: MonthData[]): PriceData[] {
    return months.flatMap(monthData => generatePriceData(monthData));
}

export const dashboardData = [{
    date: new Date(),
}]

export const months = generateMonthData();
export const priceData = generateAllPriceData(months);
