import { CheckboxProps } from "./checkbox.props";
import SuccessImg from "@/assets/icons/success.svg?react";
import SuccessFilledImg from "@/assets/icons/success-filled.svg?react";
import clsx from "clsx";

const Checkbox = ({ items, onChange, childClass, button }: CheckboxProps) => {
    return (
        <div className={"flex flex-col gap-[6px] w-full"}>
            {items.map((item) => (
                <div className="flex gap-[4px] items-center">
                    <div
                        key={item.id}
                        onClick={() => onChange(item.id)}
                        className={`flex items-center gap-1.5 py-1.5 px-2 bg-primary rounded-primary cursor-pointer w-full ${childClass}`}>
                        {item.isSelected ? <SuccessFilledImg className={"min-w-7 min-h-7"} /> :
                            <SuccessImg className={"min-w-7 min-h-7"} />}
                        <p className={clsx("font-medium text-[12px]", !item.isSelected && 'text-[#787B86]')}>{item.content}</p>
                    </div>
                    {
                        button && button
                    }
                </div>
            ))}
        </div>
    )
};

export { Checkbox };