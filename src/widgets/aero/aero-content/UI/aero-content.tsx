import {Dispatch, SetStateAction} from "react";
import {mockTariff} from "../utils";

const AeroContent = ({selectedTariffId, setSelectedTariffId}: {selectedTariffId: null | number, setSelectedTariffId: Dispatch<SetStateAction<null | number>>}) => {
    const handleSelectTariff = (id: number) => {
        setSelectedTariffId(prevSelectedTariffId => prevSelectedTariffId === id ? null : id);
    };

    return (
        <div className={"w-full flex flex-col gap-4"}>
            <div className={"px-5 bg-primary flex items-center rounded-[26px] h-[80px]"}>
                <p className={"text-[#787B86] text-base leading-none"}>{selectedTariffId ?
                    "1 поездка в вагоне Стандартного класса по любому маршруту Аэроэкспресс в течение 30 суток с даты, указанной в билете (выбранной при покупке)." :
                    "Аэроэкспресс — скоростной поезд, связывающий аэропорты Москвы с вокзалами в центральных районах города. Отправление каждые полчаса."}</p>
            </div>
            <div className={"py-6 px-5 bg-primary h-[calc(100vh-220px)] rounded-[26px] flex flex-col gap-4"}>
                {mockTariff.map(item => (
                    <div key={item.id}
                         className={`transition pt-4 pb-3 px-6 rounded-[26px] flex items-center justify-between ${selectedTariffId === item.id ? "bg-black" : "bg-secondary"}`}
                         onClick={() => handleSelectTariff(item.id)}>
                        <div className={"flex flex-col gap-0.5"}>
                            <h6 className={`transition text-base font-medium leading-none ${selectedTariffId === item.id ? "text-primary" : "text-black"}`}>{item.class}</h6>
                            <p className={"text-[#787B86] text-xs font-medium leading-none"}>{item.direction === 1 ? "В одну сторону" : "Туда-обратно"}</p>
                        </div>
                        <button className={"px-6 py-2 h-9 flex items-center justify-center bg-primary rounded-primary"}>
                            <p className={"text-md font-medium leading-none"}>Выбрать пассажиров</p>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
};

export {AeroContent};
