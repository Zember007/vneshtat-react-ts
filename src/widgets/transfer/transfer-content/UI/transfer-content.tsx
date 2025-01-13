import { InputCity, InputDate, InputTime } from "@/shared/UI";
import { setCityFrom, setCityTo } from "@/widgets/flight/flight-operations/model/flight.store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/config/store";
import { setCityFromName, setCityToName, setDate } from "@/widgets/transfer/transfer-content/model/transfer.store";
import { City } from "@/shared/types";
import PassengerImg from "@/assets/icons/users.svg?react";
import WarnImg from "@/assets/icons/warn.svg?react";
import YandexImg from "@/assets/icons/yandex.svg?react";
import TrafficLigthImg from "@/assets/icons/traffic_light-color.svg?react";
import RouteImg from "@/assets/icons/route.svg?react";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Link } from "react-router-dom";

const TransferContent = () => {
    const { date, time, cityFromName, cityToName, cityFrom, cityTo } = useSelector((state: RootState) => state.transfer);
    const dispatch = useDispatch();
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);

    useEffect(() => {
        if (mapContainerRef.current && !mapRef.current) {
            mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current as HTMLElement,
                center: [37.6206, 55.758],
                zoom: 12,
            });
        }
    }, [mapContainerRef.current, mapRef.current]);

    const swapCities = () => {
        const temp = cityFromName;

        dispatch(setCityFromName(cityToName));
        dispatch(setCityToName(temp));

        dispatch(setCityFrom(cityTo));
        dispatch(setCityTo(cityFrom));
    };

    return (
        <div className={"w-full flex flex-col gap-4"}>
            <div className={"bg-primary p-5 rounded-[26px]"}>
                <div className={"flex flex-row items-center gap-2.5"}>
                    <div
                        className={"flex flex-row items-center py-3 px-2.5 gap-2 h-11 rounded-[16px] bg-secondary"}>
                        <PassengerImg />
                        <p className={"text-xs"}>+0</p>
                    </div>
                    <InputCity
                        placeholder={"Выезд"}
                        value={cityFromName}
                        setValue={(str) => dispatch(setCityFromName(str))}
                        callback={(city: City) => dispatch(setCityFrom(city))}
                    />
                    <button onClick={swapCities}>
                        <RouteImg className={"grey-fill black-fill-hover transition min-w-5 min-h-5"} />
                    </button>
                    <InputCity
                        placeholder={"Прибытие"}
                        value={cityToName}
                        setValue={(str) => dispatch(setCityToName(str))}
                        callback={(city: City) => dispatch(setCityTo(city))}
                    />
                    <InputDate
                        placeholder={"Туда"}
                        extraClass={"py-3 px-2.5 h-11 min-w-[100px] max-w-[100px] !rounded-[16px]"}
                        inputValue={date}
                        viewValue={date}
                        isShortDate={true}
                        withIcon={false}
                        setter={(date: Date) => {
                            dispatch(setDate(date));
                        }}
                    />
                    <InputTime time={time} />
                    <div className="relative group">
                        <div className={"cursor-pointer  flex items-center py-3 px-2.5 gap-[6px] w-[160px] h-11 rounded-[16px] bg-secondary"}>
                            <TrafficLigthImg className="[&>path:first-child]:fill-[#FF3333]" />
                            <span className="text-[12px] truncate grow">54 минут в пути</span>
                            <WarnImg className="*:fill-[#787B86]" />
                        </div>
                        <div className="group-hover:opacity-100 group-hover:visible invisible opacity-0 absolute w-[280px] z-[100] pt-[10px] transition-all duration-300 bottom-0 right-0 translate-y-[100%] flex flex-col gap-[5px]">
                            <div className="rounded-[26px] bg-[#ECEEF1BA] py-[15px] px-[20px] flex flex-col gap-[5px]"
                                style={{
                                    boxShadow: '0px 4px 6.5px 0px rgba(0, 0, 0, 0.04)',
                                    backdropFilter: 'blur(4.849999904632568px)'
                                }}
                            >
                                <div className="flex items-center justify-between">
                                    <p className="text-[12px] font-medium text-[#787B86]"
                                    >По прогнозу Яндекс Карт</p>
                                    <YandexImg />
                                </div>
                                <div className="flex flex-col gap-[10px] ">
                                    <div className="flex gap-[15px] whitespace-nowrap items-center">
                                        <span className="text-[35px] font-medium">54 мин</span>
                                        <div className="*:text-[#787B86] *:text-[12px] *:font-medium  flex flex-col">
                                            <span>15,8 км</span>
                                            <span>Прибытие в 18:44</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-[15px]">
                                        <div className="flex gap-[7px]">
                                            <div className="flex flex-col items-center">
                                                <div className="flex items-center justify-center h-[23px] w-[23px] border-[2px] border-solid border-[#FF3333] rounded-[50%]">
                                                    <span className="text-[10px] font-medium">7</span>
                                                </div>
                                                <span className="text-[12px] font-medium text-[#787B86]">17</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <div className="flex items-center justify-center h-[23px] w-[23px] border-[2px] border-solid border-[#FF3333] rounded-[50%]">
                                                    <span className="text-[10px] font-medium">7</span>
                                                </div>
                                                <span className="text-[12px] font-medium text-[#787B86]">18</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <div className="flex items-center justify-center h-[23px] w-[23px] border-[2px] border-solid border-[#FFCA27] rounded-[50%]">
                                                    <span className="text-[10px] font-medium">5</span>
                                                </div>
                                                <span className="text-[12px] font-medium text-[#787B86]">19</span>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <div className="flex items-center justify-center h-[23px] w-[23px] border-[2px] border-solid border-[#71B732] rounded-[50%]">
                                                    <span className="text-[10px] font-medium">4</span>
                                                </div>
                                                <span className="text-[12px] font-medium text-[#787B86]">20</span>
                                            </div>
                                        </div>
                                        <p className="text-[12px] font-medium">
                                            В это время будут сильные пробки
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-[26px] bg-[#ECEEF1BA] py-[15px] px-[20px] flex flex-col gap-[8px]"
                                style={{
                                    boxShadow: '0px 4px 6.5px 0px rgba(0, 0, 0, 0.04)',
                                    backdropFilter: 'blur(4.849999904632568px)'
                                }}
                            >
                                <span className="text-[#787B86] font-medium">Внимание</span>
                                <p className="text-[12px]">
                                    Ваш рейс <Link to={'/'} className="text-[#007BFB]">S7 5505</Link> вылетает в 18:44.  Если вы выедете в аэропорт в 17:50, то скорее всего опоздаете.
                                </p>
                                <p className="text-[#787B86] text-[12px] font-medium">
                                    Рекомендуем приехать как минимум за 2 часа до вылета.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="p-5 bg-primary rounded-[26px] h-full">
                <div
                    style={{ height: '100%' }}
                    ref={mapContainerRef}
                    className={`map-container rounded-primary z-[0]`}
                />
            </div>
        </div>
    )
};

export { TransferContent };