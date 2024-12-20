import {InputCity, InputDate, InputTime} from "@/shared/UI";
import {setCityFrom, setCityTo} from "@/widgets/flight/flight-operations/model/flight.store";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/config/store";
import {setCityFromName, setCityToName, setDate} from "@/widgets/transfer/transfer-content/model/transfer.store";
import {City} from "@/shared/types";
import PassengerImg from "@/assets/icons/users.svg?react";
import RouteImg from "@/assets/icons/route.svg?react";
import {useEffect, useRef} from "react";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

const TransferContent = () => {
    const {date, time, cityFromName, cityToName, cityFrom, cityTo} = useSelector((state: RootState) => state.transfer);
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
                        <PassengerImg/>
                        <p className={"text-xs"}>+0</p>
                    </div>
                    <InputCity
                        placeholder={"Выезд"}
                        value={cityFromName}
                        setValue={(str) => dispatch(setCityFromName(str))}
                        callback={(city: City) => dispatch(setCityFrom(city))}
                    />
                    <button onClick={swapCities}>
                        <RouteImg className={"grey-fill black-fill-hover transition min-w-5 min-h-5"}/>
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
                    <InputTime time={time}/>
                </div>
            </div>

            <div className="p-5 bg-primary rounded-[26px] h-full">
                <div
                    style={{height: '100%'}}
                    ref={mapContainerRef}
                    className={`map-container rounded-primary`}
                />
            </div>
        </div>
    )
};

export {TransferContent};