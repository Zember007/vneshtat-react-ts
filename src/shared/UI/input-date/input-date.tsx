import { InputDateProps } from "./input-date.props";
import CalendarImg from "@/assets/icons/calendar.svg?react";
import { useEffect, useRef, useState } from "react";
import { Calendar } from "@/shared/UI";
import { formatDate, getDayOfWeek } from "@/shared/utils";
import { useClickAway } from "@/shared/hooks/use-click-away";

const InputDate = ({
    extraClass,
    extraCalendarClass,
    inputValue,
    viewValue,
    setter,
    isShortDate = false,
    withIcon = true,
    calendarOpt,
    placeholder,
    noNeedButton = false,
    noNeedHandler,
    extraClassIcon,
    ...rest
}: InputDateProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    useClickAway(containerRef, () => setIsOpen(false))

    useEffect(() => {
        if (inputValue && !Array.isArray(inputValue)) setIsOpen(false)
    }, [inputValue])

    const renderDate = (date: Date) => {
        try {
            return isShortDate ? (
                <div className="flex items-center gap-1" key={date.toISOString()}>
                    <p className="text-sm leading-none">{formatDate(date, true)},</p>
                    <p className="text-sm leading-none">{getDayOfWeek(date, true)}</p>
                </div>
            ) : (
                <div className="flex items-center gap-1" key={date.toISOString()}>
                    <p className="text-xs leading-none">{formatDate(date)}</p>
                    <p className="text-xs leading-none text-[#787B86]">{getDayOfWeek(date)}</p>
                </div>
            )
        } catch (e) {
            return null;
        }
    };

    const [top, setTop] = useState('')
    const [right, setRight] = useState('')

    useEffect(() => {

        let position = containerRef.current?.getBoundingClientRect()
        console.log(position);

        let top = position?.top
        let right = position?.x
        let height = containerRef.current?.clientHeight
        let width = containerRef.current?.clientWidth

        if (typeof top === 'number' && typeof height === 'number' && typeof right === 'number' && typeof width === 'number') {
            setTop((top + height + window.pageYOffset) + 'px')
            setRight((window.innerWidth - right - width) + 'px')
        }




    }, [containerRef])

    return (
        <div className={`flex flex-col min-h-7 cursor-none grow`} ref={containerRef} {...rest}>

            <label className="relative flex justify-end items-center w-full cursor-pointer">
                <div
                    className={`${extraClass} w-full bg-secondary flex items-center rounded-primary text-sm py-2 px-2.5`}
                    onClick={() => setIsOpen(prev => !prev)}>
                    {viewValue && Array.isArray(viewValue) && viewValue.length ? (
                        viewValue.map(renderDate)
                    ) : viewValue && !Array.isArray(viewValue) ? (
                        renderDate(viewValue)
                    ) : (
                        <p className="text-sm text-[#787B86]">{placeholder}</p>
                    )}
                </div>
                {withIcon ? (
                    <button className={`absolute pr-1.5`} onClick={() => setIsOpen(prev => !prev)}>
                        <CalendarImg className={`w-[24px] h-[24px] ${extraClassIcon}`} />
                    </button>
                ) : null}
            </label>
            {isOpen && (
                <div
                    className={`absolute rounded-[23px] p-5 z-50 flex flex-col gap-2.5 ${extraCalendarClass}`}
                    style={{
                        background: "rgba(245, 245, 245, 0.82)",
                        boxShadow: "0px 4px 6.5px 0px rgba(0, 0, 0, 0.04)",
                        backdropFilter: "blur(4.849999904632568px)",
                        top: top,
                        right: right
                    }}
                >
                    <Calendar value={inputValue} setter={setter} {...calendarOpt} />
                    {noNeedButton ? (
                        <button className={"bg-primary rounded-primary py-4 w-full"} onClick={() => {
                            noNeedHandler && noNeedHandler();
                            setIsOpen(false)
                        }}>
                            <p className={"text-md leading-none"}>Обратный билет не нужен</p>
                        </button>
                    ) : null}
                </div>
            )}
        </div>
    )
};

export { InputDate };