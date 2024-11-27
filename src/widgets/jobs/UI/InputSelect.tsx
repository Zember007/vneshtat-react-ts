import Icon from "@/assets/icons/arrow-top.svg?react";
import { useRef, useState } from "react";
import clsx from "clsx";
import { useClickAway } from "@/shared/hooks/use-click-away";
import { CheckboxItem } from "@/shared/UI/checkbox/checkbox.props";
import { documents, staffers } from "@/widgets/employees/utils";


interface InputProps {
    title?: string;
    default?: string;
    change: Function;
    icon?: JSX.Element;
    data:CheckboxItem[] | staffers[] | documents[];
    center?:boolean;
    activeId?: number | null;
}



const InputSelect = (props: InputProps) => {


    const activeElement = typeof props.activeId !== 'number' ? props.data.find(item => item.isSelected) : props.data.find(item => item.id === props.activeId)

    const [active, setActive] = useState<boolean>(false)

    const box = useRef<HTMLDivElement | null>(null)

    useClickAway(box, () => { setActive(false) })

    return (
        <div ref={box} className="flex flex-col  rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA] relative">

            <div onClick={() => setActive(!active)} className="flex gap-[10px] justify-between cursor-pointer ">
               {props.title &&  <span className={clsx("text-[#9B9FAD] text-[12px] font-medium transition-all duration-300 flex justify-start w-full", active && 'justify-center translate-x-[10px]')}>{props.title}</span> }


                <div className={clsx("flex items-center", !active && 'w-full', !props.title && !props.center ? 'w-full justify-between'  :props.center? 'justify-center w-full' : 'justify-end')}>
                    <span className={clsx("leading-[1.17] transition-all duration-300 w-full  text-[12px] font-medium bg-[transparent] overflow-hidden   pr-[6px]", (active && props.title)&& '!max-w-[0px] !max-h-[0px] !pr-[0px]', props.title && 'text-right max-w-[100px]', props.center && '!pr-[0px] text-center', !activeElement?.content && '!text-[#9B9FAD]')}> {activeElement?.content ? activeElement.content : props.default}</span>
                    {
                        (!props.icon || active) ? <Icon className={clsx("transition-all duration-300 block", !active && 'rotate-[180deg]', props.center && 'absolute right-[10px] top-[8px]')} /> : (!active && props.icon)
                    }
                </div>

            </div>

            <div className={clsx("flex flex-col gap-[6px]  transition-all duration-300 max-h-[0px] overflow-hidden", active && 'mt-[6px] !max-h-[500px]')}>
                {
                    props.data.map(item => (
                        <button onClick={() => {
                            props.change(item.id)
                            setActive(false)
                        }} className="hover:text-[#007BFB] transition-all duration-300 pt-[6px] border-0 border-solid border-t border-[#E5E7EA] text-center text-[12px] font-medium">
                            {item.content}
                        </button>
                    ))
                }
            </div>

        </div>
    );
};

export default InputSelect;