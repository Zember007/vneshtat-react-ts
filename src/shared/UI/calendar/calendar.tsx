import LibCalendar from 'react-calendar';
import ArrowLeftImg from '@/assets/icons/arrow-left.svg?react';
import "./calendar.css";

interface CalendarProps {
    value: Date | Date[] | [Date, Date] | null;
    setter: (value: Date | Date[] | [Date, Date] | null) => void;
    allowPartialOptions?: boolean;
    [key: string]: any;
}

const Calendar = ({value, setter, ...opt}: CalendarProps) => {
    // if provide date[] it will be multiple, but just date it will be a single-selectable
    // @ts-ignore
    const allowPartialOptions = opt.allowPartialOptions ?? false;
    const tileContent = (tile: { view: string }) => {
        if (tile.view === 'month') {
            return <p className="tile-text">5439</p>;
        }
        return null;
    };

    const classes = {
        dayTile: "dayTile",
        activeDay: "activeDay",
    };

    const dateAlreadyClicked = (dates: Date[], date: Date): boolean => {
        return dates.some(d => d.getTime() === date.getTime());
    };

    const datesExcept = (dates: Date[], date: Date): Date[] => {
        return dates.filter(d => d.getTime() !== date.getTime());
    };

    const onClickDay = (date: Date) => {
        const valueArray = Array.isArray(value) ? value : (value ? [value] : []);
        const newDates = dateAlreadyClicked(valueArray, date)
            ? datesExcept(valueArray, date)
            : [...valueArray, date];

        setter(newDates);
    };

    const tileClassName = ({date}: { date: Date }) => {
        const valueArray = Array.isArray(value) ? value : (value ? [value] : []);
        const isActive = dateAlreadyClicked(valueArray, date);
        const classNames = [];

        if (isActive) {
            classNames.push(classes.activeDay);
        } else {
            classNames.push(classes.dayTile);
        }

        return classNames.join(' ');
    };

    return (
        // @ts-ignore
        <LibCalendar
            className={"!border-none"}
            {...(Array.isArray(value) && !allowPartialOptions ? {onClickDay, tileClassName} : {value, onChange: setter})}
            next2Label={null}
            prev2Label={null}
            prevLabel={
                <button className={"controller-button"}>
                    <ArrowLeftImg className={"black-stroke"}/>
                </button>
            }
            nextLabel={
                <button className={"controller-button"}>
                    <ArrowLeftImg className={"rotate-180 black-stroke"}/>
                </button>
            }
            tileContent={tileContent}
            showNeighboringMonth={false}
            {...opt}
        />
    );
};

export {Calendar};
