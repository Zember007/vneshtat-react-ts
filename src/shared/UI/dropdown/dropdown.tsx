import { ReactNode, useRef, useState } from "react";
import EraserImg from "@/assets/icons/eraser.svg?react";
import ArrowImg from "@/assets/icons/arrow-top.svg?react";
import { useClickAway } from "@/shared/hooks/use-click-away";

interface DropdownProps {
    isChanged?: boolean,
    title?: string,
    onErase?: () => void,
    selectedText?: string
    children: ReactNode
    isAbsoluteDrop?: boolean
    extraClass?: string
}

const Dropdown = ({
    isChanged = false, onErase = () => {
    }, title, selectedText, children, isAbsoluteDrop = false, extraClass
}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const box = useRef<HTMLDivElement | null>(null)

    useClickAway(box, () => { setIsOpen(false) })

    return (
        <div
            ref={box}
            className={`  rounded-[18px] bg-secondary flex flex-col justify-center cursor-pointer `}>
            <div className={`p-3 flex flex-row justify-between items-center ${extraClass}`} onClick={() => setIsOpen((prev) => !prev)}>
                <div
                    className="flex flex-row items-center gap-1 relative"
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    {isChanged && (
                        <span className="absolute h-[5px] w-[5px] rounded-[100%] bg-red mb-3" />
                    )}
                    {
                        title && <h6
                            className="text-[14px] font-medium whitespace-nowrap ml-2"
                            onClick={() => setIsOpen((prev) => !prev)}
                        >
                            {title}
                        </h6>
                    }
                    {selectedText && (
                        <p className="text-[14px] font-medium whitespace-nowrap text-[#9B9FAD]"
                            onClick={() => setIsOpen((prev) => !prev)}>
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
                <button type={"button"}>
                    <ArrowImg
                        className={`transform transition-transform duration-300 ${!isOpen ? "rotate-180" : ""}`}
                    />
                </button>
            </div>
            {isAbsoluteDrop ? (
                <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden absolute top-full left-0 p-3 z-10 w-full  !bg-secondary rounded-[18px]
                ${isOpen ? "opacity-100 visible mt-2" : "opacity-0 invisible mt-0"}
                 bg-secondary`}
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