import {ReactNode, useState} from "react";
import EraserImg from "@/assets/icons/eraser.svg?react";
import ArrowImg from "@/assets/icons/arrow-top.svg?react";

interface DropdownProps {
    isChanged?: boolean,
    title: string,
    onErase?: () => void,
    selectedText?: string
    children: ReactNode
    extraClass?: string
}

const Dropdown = ({ isChanged = false, onErase = () => {}, title, selectedText, children, extraClass }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`p-3 rounded-[18px] bg-secondary flex flex-col justify-center cursor-pointer min-h-9 ${extraClass}`}>
            <div className={"flex flex-row justify-between items-center"} onClick={() => setIsOpen(prev => !prev)}>
                <div className={"flex flex-row items-center gap-1 relative"}>
                    {isChanged && <span className={"absolute h-[5px] w-[5px] rounded-[100%] bg-red mb-3"}/>}
                    <h6 className={"text-xs font-medium whitespace-nowrap ml-2"}>{title}</h6>
                    {selectedText && <p className={"text-xs font-medium whitespace-nowrap text-[#9B9FAD]"}>{selectedText}</p>}
                    {isChanged && (
                        <button onClick={(e) => {
                            e.stopPropagation();
                            onErase && onErase();
                        }}>
                            <EraserImg className={"transition hover:brightness-50"}/>
                        </button>
                    )}
                </div>
                <button>
                    <ArrowImg className={`transform transition-transform duration-300 ${!isOpen ? "rotate-180" : ""}`}/>
                </button>
            </div>
            <div
                className={`transition-max-height duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-screen mt-2.5" : "max-h-0 mt-0"}`}
            >
                {children}
            </div>
        </div>
    )
};

export {Dropdown};