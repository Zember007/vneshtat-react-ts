
import FeedImg from "@/assets/icons/feed.svg?react"
import BaggageImg from "@/assets/icons/baggage.svg?react"
import EditImg from "@/assets/icons/edit.svg?react"
import { useRef, useState } from "react";
import { Dropdown } from "@/shared/UI";
import { useClickAway } from "@/shared/hooks/use-click-away";
const TiketOptions = () => {

    const [activeFeed, setActiveFeed] = useState<boolean>(false)
    const [activeFeedDop, setActiveFeedDop] = useState<boolean>(false)
    const [activeBaggage, setActiveBaggage] = useState<boolean>(false)

    const feed = useRef<HTMLDivElement | null>(null)
    const feedDop = useRef<HTMLDivElement | null>(null)
    const baggage = useRef<HTMLDivElement | null>(null)

    useClickAway(feed, () => setActiveFeed(false))
    useClickAway(feedDop, () => setActiveFeedDop(false))
    useClickAway(baggage, () => setActiveBaggage(false))


    return (
        <div className="flex flex-col gap-[10px]">
            <div ref={feed} className={`rounded-[13px] p-[10px] bg-primary flex flex-col  ${activeFeed && 'gap-[10px]'}`}>
                <div className="flex flex-col gap-[5px]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-[5px]">
                            <FeedImg />
                            <span className="text-[12px] font-medium">Питание</span>
                            <span className="text-[#9B9FAD] text-[12px] font-medium">Бесплатно</span>
                        </div>
                        <button
                            onClick={() => setActiveFeed(prev => !prev)}>
                            <EditImg className="w-[14px] h-[14px] *:fill-[#BDBFC7]" />
                        </button>
                    </div>
                    <span className={`${activeFeed && 'max-h-[0px]'} transition-all duration-300 overflow-hidden text-[11px] font-medium pl-[20px] text-[#9B9FAD]`}>Выбран: стандарт</span>
                </div>

                {
                    activeFeed &&
                    <div className={`flex flex-col gap-[10px]`}>
                        <div className="flex flex-col gap-[5px] relative">
                            <span className="text-[11px] font-medium text-[#9B9FAD]">Пассажир</span>
                            <Dropdown
                                title="Вознесенский Иван"
                                extraClassTitle="!text-[11px]"
                                extraClass="!p-[10px]"
                                isAbsoluteDrop={true} extraClassBox="!rounded-[13px]"
                            ><></></Dropdown>
                        </div>

                        <div className="flex flex-col gap-[5px] relative">
                            <span className="text-[11px] font-medium text-[#9B9FAD]">Рацион питания</span>
                            <Dropdown
                                title="Вегетарианский"
                                extraClassTitle="!text-[11px]"
                                extraClass="!p-[10px]"
                                isAbsoluteDrop={true}
                                extraClassBox="!rounded-[13px]"
                            ><></></Dropdown>
                        </div>
                    </div>
                }
            </div>

            <div ref={feedDop} className={`rounded-[13px] p-[10px] bg-primary flex flex-col  ${activeFeed && 'gap-[10px]'}`}>
                <div className="flex flex-col gap-[5px]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-[5px]">
                            <FeedImg className="*:fill-[#BDBFC7]" />
                            <span className="text-[12px] font-medium">Доп. питание</span>
                        </div>
                        <button
                            onClick={() => setActiveFeedDop(prev => !prev)}>
                            <EditImg className="w-[14px] h-[14px] *:fill-[#BDBFC7]" />
                        </button>
                    </div>
                    <span className={`${activeFeedDop && 'max-h-[0px]'} transition-all duration-300 overflow-hidden text-[11px] font-medium pl-[20px] text-[#9B9FAD]`}>Ничего не выбрано</span>
                </div>

                {
                    activeFeedDop &&
                    <div className={`flex flex-col gap-[10px]`}>
                        <div className="flex flex-col gap-[5px] relative">
                            <span className="text-[11px] font-medium text-[#9B9FAD]">Пассажир</span>
                            <Dropdown
                                title="Вознесенский Иван"
                                extraClassTitle="!text-[11px]"
                                extraClass="!p-[10px]"
                                isAbsoluteDrop={true}
                                extraClassBox="!rounded-[13px]"
                            ><></></Dropdown>
                        </div>

                        <div className="flex flex-col gap-[5px] relative">
                            <span className="text-[11px] font-medium text-[#9B9FAD]">Рацион питания</span>
                            <Dropdown
                                title="Вегетарианский"
                                extraClassTitle="!text-[11px]"
                                extraClass="!p-[10px]"
                                isAbsoluteDrop={true}
                                extraClassBox="!rounded-[13px]"
                            ><></></Dropdown>
                        </div>
                    </div>
                }
            </div>

            <div ref={baggage} className={`rounded-[13px] p-[10px] bg-primary flex flex-col  ${activeFeed && 'gap-[10px]'}`}>
                <div className="flex flex-col gap-[5px]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-[5px]">
                            <BaggageImg />
                            <span className="text-[12px] font-medium">Доп. багаж</span>
                        </div>
                        <button
                            onClick={() => setActiveBaggage(prev => !prev)}>
                            <EditImg className="w-[14px] h-[14px] *:fill-[#BDBFC7]" />
                        </button>
                    </div>
                    <span className={`${activeBaggage && 'max-h-[0px]'} transition-all duration-300 overflow-hidden text-[11px] font-medium pl-[20px] text-[#9B9FAD]`}>Добавлено 1 место</span>
                </div>

                {
                    activeBaggage &&
                    <div className={`flex flex-col gap-[10px]`}>
                        <div className="flex flex-col gap-[5px] relative">
                            <span className="text-[11px] font-medium text-[#9B9FAD]">Пассажир</span>
                            <Dropdown
                                title="Вознесенский Иван"
                                extraClassTitle="!text-[11px]"
                                extraClass="!p-[10px]"
                                isAbsoluteDrop={true}
                                extraClassBox="!rounded-[13px]"
                            ><></></Dropdown>
                        </div>

                        <div className="flex flex-col gap-[5px] relative">
                            <span className="text-[11px] font-medium text-[#9B9FAD]">Излишняя ручная кладь</span>
                            <Dropdown
                                title="Электронная техника"
                                extraClassTitle="!text-[11px]"
                                extraClass="!p-[10px]"
                                extraClassBox="!rounded-[13px]"
                                isAbsoluteDrop={true}
                            ><></></Dropdown>
                        </div>

                        <div className="flex flex-col gap-[5px] relative">
                            <span className="text-[11px] font-medium text-[#9B9FAD]">Место в багажном купе</span>
                            <div className="flex gap-[5px]">
                                <input placeholder="Название багажа" className="bg-[#ECEEF1] rounded-[13px] p-[10px] text-[11px] font-medium" />
                                <Dropdown
                                    title="0"
                                    extraClassBox="!rounded-[13px]"
                                    isAbsoluteDrop={true}
                                    extraClass="!p-[8px] !pl-[12px]"
                                    extraClassTitle="!text-[12px] !font-medium !text-[#9B9FAD]"
                                >
                                    <></>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="flex items-center gap-[5px] justify-between">
                            <span className="text-[#9B9FAD] text-[12px] font-medium">
                                Итого
                                за багаж
                            </span>
                            <div className="bg-[#ECEEF1] rounded-[13px] py-[8px] px-[20px] text-[12px] font-medium">
                                1050,20 ₽
                            </div>
                        </div>
                    </div>
                }
            </div>

            <div className="flex items-center gap-[20px] justify-between items-center">
                <span className="text-[#9B9FAD] text-[12px] font-medium">
                    Стоимость <br />
                    доп. услуг
                </span>
                <div className="bg-primary rounded-[13px] py-[10px] px-[20px] text-[12px] font-medium whitespace-nowrap">
                    1650,20 ₽
                </div>
            </div>
        </div>
    );
};

export default TiketOptions;