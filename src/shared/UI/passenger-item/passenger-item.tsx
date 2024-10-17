import { CountdownCircle } from "@/shared/UI";
import InfoImg from "@/assets/icons/info.svg?react";
import ArrowTop from "@/assets/icons/arrow-top.svg?react";
import TrashImg from "@/assets/icons/trash.svg?react";
import CrossImg from "@/assets/icons/cross.svg?react";
import { useEffect, useState } from "react";

interface props {
    id: number;
    name: string;
    surname: string;
    internationalPassport: string;
    passport: string;
    delete: Function;
}

const PassengerItem = (props: props) => {

    const [Active, setActive] = useState<boolean>(false)
    const [deleteCountdown, setDeleteCountdown] = useState<number | null>(null)

    useEffect(() => {

        if (deleteCountdown === 0){
            props.delete(props.id)
        }
        
        if (!deleteCountdown){
            return;
        }

        const countdownInterval = setInterval(() => {
            

            if (deleteCountdown !== 0) {
                setDeleteCountdown(deleteCountdown - 1)
            }
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, [deleteCountdown]);

    const cancelDelete = () => {
        setDeleteCountdown(null);
    }

    return (
        <div>
            <div className={`flex gap-2.5`}>
                <div className="min-w-9 h-9  flex justify-center items-center rounded-full bg-secondary">
                    <h3 className="text-xs font-medium uppercase">
                        {props.surname[0] + props.name[1]}
                    </h3>
                </div>
                <div
                    onClick={() =>
                        setActive(!Active)
                    }
                    className="w-full bg-secondary rounded-primary flex items-center justify-between gap-1 py-2 px-2.5 cursor-pointer"
                >
                    {deleteCountdown ? (
                        <div className="flex items-center justify-between w-full" onClick={(e) => {
                            e.stopPropagation();
                            cancelDelete();
                        }}>
                            <h3 className="text-xs font-medium text-[#FF64A3]">
                                Отменить удаление
                            </h3>
                            <CrossImg className="red-fill min-w-4 min-h-4" />
                        </div>
                    ) : (
                        <>
                            <h3 className="text-xs font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                                {props.surname} {props.name}
                            </h3>
                            <ArrowTop
                                className={`min-w-4 min-h-4 transition-transform duration-300 ${Active
                                    ? "rotate-180"
                                    : ""
                                    }`}
                            />
                        </>
                    )}
                </div>
                {deleteCountdown ? (
                    <CountdownCircle
                        countdown={deleteCountdown}
                        onCancel={() => cancelDelete()}
                    />
                ) : (
                    <button
                        onClick={() => setDeleteCountdown(5)}
                        className="min-w-5 min-h-5"
                    >
                        <TrashImg className="black-fill-hover black-stroke-hover transition" />
                    </button>
                )}
            </div>
            <div
                className={`w-full bg-secondary rounded-primary overflow-hidden px-5 transition-all duration-300 ease-in-out ${Active
                    ? "max-h-[500px] py-4  mt-2.5"
                    : "max-h-0"
                    }`}
            >

                <>
                    <div className="flex justify-between items-center">
                        <h3 className="text-base font-medium">
                            Документы
                        </h3>
                        <InfoImg className="transition min-w-6 min-h-6 black-fill-hover" />
                    </div>
                    <div className="flex flex-col gap-1.5 mt-2.5">
                        <div className="bg-primary py-2 px-2.5 gap-1 flex justify-between items-center rounded-primary">
                            <h6 className="text-xs font-medium whitespace-nowrap">
                                {props.passport}
                            </h6>
                            <p className="text-xs text-[#9b9fad] whitespace-nowrap overflow-hidden text-ellipsis">
                                Паспорт РФ
                            </p>
                        </div>
                        <div className="bg-primary py-2 px-2.5 gap-1 flex justify-between items-center rounded-primary">
                            <h6 className="text-xs font-medium whitespace-nowrap">
                                {props.internationalPassport}
                            </h6>
                            <p className="text-xs text-[#9b9fad] whitespace-nowrap overflow-hidden text-ellipsis">
                                Загранпаспорт
                            </p>
                        </div>
                    </div>
                </>

            </div>
        </div>
    );
};

export { PassengerItem };