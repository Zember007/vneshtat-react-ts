import Icon from "@/assets/icons/arrow-top.svg?react";
import { useState } from "react";
import clsx from "clsx";


interface InputProps {
    title: string;
    value: string | null;
    default?: string;
    change: Function;
    items: Array<string>;
}



const InputSelect = (props: InputProps) => {


    const [active, setActive] = useState<boolean>(false)

    return (
        <div className="flex flex-col  rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA] relative">

            <div onClick={() => setActive(!active)} className="flex items-center gap-[20px] justify-between cursor-pointer relative">
                <span className={clsx("text-[#9B9FAD] text-[12px] font-medium transition-all duration-300 flex justify-start w-full", active && 'justify-center translate-x-[20px]')}>{props.title}</span>


                <div className={clsx("flex justify-end items-center", !active && 'w-full')}>
                    <span className={clsx("leading-[1.17] transition-all duration-300 w-full text-right text-[#9B9FAD] text-[12px] font-medium bg-[transparent] overflow-hidden  max-w-[100px] pr-[6px]", active && '!max-w-[0px] !max-h-[0px] !pr-[0px]')}> {props.value ? props.value : props.default}</span>
                    <Icon className={clsx("transition-all duration-300 block", !active && 'rotate-[180deg]')} />
                </div>

            </div>

            <div className={clsx("flex flex-col gap-[6px]  transition-all duration-300 max-h-[0px] overflow-hidden", active && 'mt-[6px] !max-h-[500px]')}>
                {
                    props.items.map(item => (
                        <div className="pt-[6px] border-0 border-solid border-t border-[#E5E7EA] text-center text-[12px] font-medium">
                            {item}
                        </div>
                    ))
                }
            </div>

        </div>
    );
};

export default InputSelect;