import Icon from "@/assets/icons/cross.svg?react";
import clsx from "clsx";

interface InputProps {
    active: boolean;
    title: string;
    change: any;
}

const CheckerFilter = (props: InputProps) => {
    return (
        <div className={'relative'}>
            <button className={clsx('absolute top-[50%] left-[9px] translate-y-[-50%] opacity-0 invisible transition-all duration-300', props.active && '!opacity-100 !visible')}
            onClick={() => props.change(false)}><Icon /></button>
            <div className={clsx('rounded-[13px] px-[9px] py-[8px] text-[12px] font-normal transition-all duration-300 border border-solid border-[#e5e7ea]', props.active && '!border-0 !pl-[25px] text-[#fafafa] bg-[#121212]')} onClick={() => props.change(true)}>
                {props.title}</div>
        </div>
    );
};

export default CheckerFilter;