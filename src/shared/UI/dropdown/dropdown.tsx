import { ReactNode, useRef, useState } from "react";
import EraserImg from "@/assets/icons/eraser.svg?react";
import ArrowImg from "@/assets/icons/arrow-top.svg?react";
import LockImg from "@/assets/icons/lock.svg?react";
import { useClickAway } from "@/shared/hooks/use-click-away";

interface DropdownProps {
    isChanged?: boolean,
    title?: string,
    onErase?: () => void,
    selectedText?: string
    children: ReactNode
    isAbsoluteDrop?: boolean
    extraClass?: string
    extraClassBox?: string
    disable?: boolean
    extraClassTitle?: string
}

const Dropdown = ({
    isChanged = false, onErase = () => {
    }, title,extraClassTitle, selectedText, children, isAbsoluteDrop = false, extraClass, disable, extraClassBox
}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const box = useRef<HTMLDivElement | null>(null)

    useClickAway(box, () => { setIsOpen(false) })

    const actionDropdown = () => {

        if (!disable) {
            setIsOpen((prev) => !prev)
        }
    }

    return (
        <div
            ref={box}
            className={`  rounded-[18px] bg-secondary flex flex-col justify-center cursor-pointer ${extraClassBox}`}>
            <button className={`p-3 flex flex-row justify-between items-center ${extraClass}`} onClick={() => actionDropdown()}>
                <div
                    className="flex flex-row items-center gap-1 relative"
                >
                    {isChanged && (
                        <span className="absolute h-[5px] w-[5px] rounded-[100%] bg-red mb-3" />
                    )}
                    {
                        title && <h6
                            className={`text-[14px] font-medium whitespace-nowrap ${extraClassTitle}  ${disable && 'text-[#787B86]'} ${isChanged && 'pl-[5px]'}`}

                        >
                            {title}
                        </h6>
                    }
                    {selectedText && (
                        <p className="text-[14px] font-medium whitespace-nowrap text-[#9B9FAD]">
                            {selectedText}
                        </p>
                    )}
                    {isChanged && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onErase && onErase();
                            }}
                            type={"button"}
                        >
                            <EraserImg className="transition hover:brightness-50" />
                        </button>
                    )}
                </div>
                {!disable ? <button type={"button"}>
                    <ArrowImg
                        className={`transform transition-transform duration-300 ${!isOpen ? "rotate-180" : ""}`}
                    />
                </button> :
                    <LockImg className="w-[14px] h-[14px]" />}
            </button>
            {isAbsoluteDrop ? (
                <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden absolute top-full left-0 p-3 z-10 w-full  rounded-[18px]
                ${isOpen ? "opacity-100 visible mt-2" : "opacity-0 invisible mt-0"}`}
                    style={{
                        background: "rgba(245, 245, 245, 0.82)",
                        boxShadow: "0px 4px 6.5px 2px rgba(0, 0, 0, 0.08)",
                        backdropFilter: "blur(4.849999904632568px)",
                    }}
                >
                    {children}
                </div>
            ) : (
                <div
                    className={`px-3 transition-max-height duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-screen my-2.5" : "max-h-0 my-0"}`}
                >
                    {children}
                </div>
            )}
        </div>
    )
};

export { Dropdown };