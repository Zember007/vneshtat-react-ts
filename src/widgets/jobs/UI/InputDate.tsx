import Icon from "@/assets/icons/calendar.svg?react";
import { Calendar } from "@/shared/UI/calendar/calendar";
import clsx from "clsx";
import { useState, useEffect, useRef } from "react";
import { useClickAway } from "@/shared/hooks/use-click-away";

interface InputProps {
    value: Date | string | null;
    placeholder?: string;
    change: Function;
    button?: string;
    ClassView?: string;
    ClassCalendar?: string;
}


const InputDate = (props: InputProps) => {
    const [open, setOpen] = useState<boolean>(false)

    const [value, setValue] = useState<string | undefined>()

    const GetDate = (date: Date): string => {
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()

        return (day > 9 ? day : '0' + day) + '.' + (month > 9 ? month : '0' + month) + '.' + year
    }

    const reviewTypeDate = (data: Date | string | null): Date | null => {
        if (data) {
            if (typeof data === 'string') {
                return new Date()
            } else {
                return data
            }
        } else {
            return null
        }
    }

    const reviewTypeString = (data: Date | string | null): string | undefined => {
        if (data) {
            if (typeof data === 'string') {
                return data
            } else {
                return GetDate(data)
            }
        }
    }

    useEffect(() => {

        if (props.value) {
            setValue(reviewTypeString(props.value))
        }


    }, [props.value])

    const box = useRef<HTMLDivElement | null>(null)

    useClickAway(box, () => { setOpen(false) })



    return (
        <div ref={box} className={"flex items-center gap-[6px] " + props.ClassView}>
            <input value={value} disabled type="text" placeholder={props.placeholder} className="w-[100%] text-right text-[12px] font-medium bg-[transparent]" />
            <div className={clsx("flex flex-col gap-[10px] absolute z-10 top-[100%] left-[-13px] right-[-13px] p-[13px] bg-[#F5F5F5D1] rounded-[23px]  transition-all duration-300 " + props.ClassCalendar, !open ? 'opacity-0 hidden' : 'opacity-1 visible')}>
                <Calendar value={reviewTypeDate(props.value)} setter={(date) => {
                    props.change(date)
                    setOpen(false)
                }} />
                {
                    props.button && (
                        <button
                            className="text-[14px] py-[13px] bg-[#DCE0E5] rounded-[13px] w-full"
                            onClick={() => { props.change(props.button); setOpen(false) }}>
                            {props.button}
                        </button>
                    )
                }
            </div>
            <button onClick={() => setOpen(!open)}>
                <Icon className="w-[20px] h-auto" />
            </button>
        </div>
    );
};

export default InputDate;