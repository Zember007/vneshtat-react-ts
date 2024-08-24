import { useRef, useState } from "react";
import { useClickAway } from "@/shared/hooks/use-click-away";
import { formatTime } from "@/shared/utils";

interface InputTimeProps {
    time?: number;
    extraClass?: string;
}

const InputTime = ({ time, extraClass }: InputTimeProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedHour, setSelectedHour] = useState<number | null>(null);
    const [selectedMinute, setSelectedMinute] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    useClickAway(containerRef, () => setIsOpen(false));

    const handleHourSelect = (hour: number) => {
        setSelectedHour(hour);
        setIsOpen(false);
    };

    const handleMinuteSelect = (minute: number) => {
        setSelectedMinute(minute);
        setIsOpen(false);
    };

    return (
        <div className={`flex flex-col select-none ${extraClass}`} ref={containerRef}>
            <div
                className="py-2 px-4 rounded-[16px] bg-secondary h-11 flex items-center justify-center cursor-pointer"
                onClick={() => setIsOpen(prev => !prev)}
            >
                {time ? (
                    <p className="text-md leading-none">{formatTime(time)}</p>
                ) : (
                    <p className="text-md leading-none text-[#787B86]">Время</p>
                )}
            </div>
            <div
                className={`flex gap-2 transition-all overflow-hidden duration-400 ${isOpen ? "h-32" : "h-0"} rounded-primary bg-secondary absolute translate-x-0.5 mt-12`}
            >
                <div className="overflow-y-auto hidden-scroll flex flex-col gap-2 py-3 pl-3">
                    {Array.from({ length: 24 }).map((_, i) => (
                        <button
                            key={`hour-${i}`}
                            onClick={() => handleHourSelect(i + 1)}
                            className={`text-md leading-none ${selectedHour === i + 1 ? 'bg-primary text-white' : ''}`}
                        >
                            <p>{i + 1}</p>
                        </button>
                    ))}
                </div>
                <div className="overflow-y-auto hidden-scroll flex flex-col gap-2 py-3 pr-3">
                    {Array.from({ length: 60 }).map((_, i) => (
                        (i + 1) % 5 === 0 && (
                            <button
                                key={`minute-${i}`}
                                onClick={() => handleMinuteSelect(i + 1)}
                                className={`text-md leading-none ${selectedMinute === i + 1 ? 'bg-primary text-white' : ''}`}
                            >
                                <p>{i + 1}</p>
                            </button>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
};

export { InputTime };
