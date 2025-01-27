import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/config/store";
import PassengerImg from "@/assets/icons/users.svg?react";
import RouteImg from "@/assets/icons/route.svg?react";
import ChairAwayImg from "@/assets/icons/chair-away.svg?react";
import PlaneImg from "@/assets/icons/plane.svg?react";
import BusImg from "@/assets/icons/bus.svg?react";
import KeyImg from "@/assets/icons/key.svg?react";
import CopyImg from "@/assets/icons/copy.svg?react";
import {  useEffect, useRef, useState } from "react";
import { Tag } from "@/shared/UI/tag-filter/tag-filter.props";
import { Checkbox, InputCity, InputDate, TagFilter } from "@/shared/UI";
import {
    setCity,
    setCityName, setDateBack,
    setDateTo,
    setIsFreeCancelFilter
} from "../../hotel-operations/model/hotel.store";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
/* import { hotels } from "../utils";
import { create } from "domain"; */

const HotelMap = ({ isSearched }: {
    isSearched: boolean,
}) => {
    const { dateTo, dateBack, cityName } = useSelector((state: RootState) => state.hotel);
    const [tags, setTags] = useState<Tag>({
        tags: [
            { value: "RO", code: 'RO', id: 0 },
            { value: "BB", code: 'BB', id: 1 },
            { value: "HB", code: 'HB', id: 2 },
            { value: "FB", code: 'FB', id: 3 },
            { value: "AI", code: 'AI', id: 4 },
        ],
        selectedTags: []
    });
    const [stars, setStars] = useState<Tag>({
        tags: [
            { value: "Без звёзд", code: '0', id: 0 },
            { value: "2 звезды", code: '2', id: 1 },
            { value: "3 звезды", code: '3', id: 2 },
            { value: "4 звезды", code: '4', id: 3 },
            { value: "5 звёзд", code: '5', id: 4 },
        ],
        selectedTags: []
    })
    const isFreeCancel = useSelector((state: RootState) => state.hotel.isFreeCancel);
    const isFreeCancelOption = [{
        id: 1,
        content: "Бесплатная отмена",
        isSelected: isFreeCancel
    }]
    const [dates, setDates] = useState<Date[]>([]);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch();

    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);

    /*     const templateMarker = (value: string) => {
            return `<svg width="82" height="39" viewBox="0 0 82 39" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.0107 32L23 32L57.9969 32C52.5542 32 47.4232 34.1327 43.6809 37.7923C42.0343 39.4026 38.9626 39.4026 37.316 37.7923C33.5762 34.1351 28.4495 32.0028 23.0107 32Z" fill="#121212"/>
    <rect width="82" height="32" rx="13" fill="#121212"/>
    <rect x="2" y="2" width="78" height="28" rx="11.4511" fill="#FAFAFA"/>
    </svg>
    <span class="text-[12px] font-medium absolute top-[7px] left-[50%] translate-x-[-50%] whitespace-nowrap">
        ${value}
    </span>
    `
        }
    
        const renderMarkers = () => {
            const zoom = mapRef.current?.getZoom() ?? 0
            hotels.forEach((item, index) => {
                const item_next = hotels[index + 1]
                if (item_next) {
                    const distance = Math.sqrt((item.coordinate[0] - item_next.coordinate[0]) ** 2 + (item.coordinate[1] - item_next.coordinate[1]) ** 2)
                    const res = distance * 2 ** zoom
                    console.log(res);
                }
            })
        } */

    useEffect(() => {
        if (mapContainerRef.current && !mapRef.current && isSearched) {
            mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current as HTMLElement,
                center: [37.6206, 55.7578],
                zoom: 12,
            });



            if (mapRef.current) {
                mapRef.current.on('load', () => {
                    mapRef.current?.addSource('earthquakes', {
                        type: 'geojson',
                        data: {
                            "type": "FeatureCollection",
                            
                            "features": [
                                {
                                    "type": "Feature",
                                    "properties": {
                                        "id": "ak16994521",
                                        "mag": 2.3,
                                        "time": 1507425650893,
                                        "felt": null,
                                        "tsunami": 0
                                    },
                                    "geometry": {
                                        "type": "Point",
                                        "coordinates": [37.6206, 55.7578]
                                    }
                                },
                                {
                                    "type": "Feature",
                                    "properties": {
                                        "id": "ak16994519",
                                        "mag": 1.7,
                                        "time": 1507425289659,
                                        "felt": null,
                                        "tsunami": 0
                                    },
                                    "geometry": {
                                        "type": "Point",
                                        "coordinates": [37.6106, 55.7578]
                                    }
                                },
                                {
                                    "type": "Feature",
                                    "properties": {
                                        "id": "ak16994517",
                                        "mag": 1.6,
                                        "time": 1507424832518,
                                        "felt": null,
                                        "tsunami": 0
                                    },
                                    "geometry": {
                                        "type": "Point",
                                        "coordinates": [37.6206, 55.7678]
                                    }
                                }]
                        },
                        cluster: true,
                        clusterMaxZoom: 14,
                        clusterRadius: 50
                    });

                    mapRef.current?.addLayer({
                        id: 'clusters',
                        type: 'circle',
                        source: 'earthquakes',
                        filter: ['has', 'point_count'],
                        paint: {
                            'circle-color': [
                                'step',
                                ['get', 'point_count'],
                                '#51bbd6',
                                100,
                                '#f1f075',
                                750,
                                '#f28cb1'
                            ],
                            'circle-radius': [
                                'step',
                                ['get', 'point_count'],
                                20,
                                100,
                                30,
                                750,
                                40
                            ]
                        }
                    });

                    mapRef.current?.addLayer({
                        id: 'cluster-count',
                        type: 'symbol',
                        source: 'earthquakes',
                        filter: ['has', 'point_count'],
                        layout: {
                            'text-field': ['get', 'point_count_abbreviated'],
                            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                            'text-size': 12
                        }
                    });

                    mapRef.current?.addLayer({
                        id: 'unclustered-point',
                        type: 'circle',
                        source: 'earthquakes',
                        filter: ['!', ['has', 'point_count']],
                        paint: {
                            'circle-color': '#51bbd6',
                            'circle-radius': 4,
                            'circle-stroke-width': 1,
                            'circle-stroke-color': '#fff'
                        }
                    });


                    mapRef.current?.on('click', 'clusters', (e) => {
                        const features: any = mapRef.current?.queryRenderedFeatures(e.point, {
                            layers: ['clusters']
                        });
                        const source: any = mapRef.current?.getSource('earthquakes')
                        if (features && source) {
                            const clusterId = features[0].properties?.cluster_id;
                            source.getClusterExpansionZoom(clusterId, (err: any, zoom: any) => {
                                if (err) return;

                                mapRef.current?.easeTo({
                                    center: features[0].geometry.coordinates,
                                    zoom: zoom
                                });
                            });
                        }
                    });


                    mapRef.current?.on('click', 'unclustered-point', (e) => {
                        console.log(e);

                        /* const coordinates = e.features[0].geometry.coordinates.slice();
                        const mag = e.features[0].properties.mag;
                        const tsunami = e.features[0].properties.tsunami === 1 ? 'yes' : 'no';

                        // Ensure that if the map is zoomed out such that
                        // multiple copies of the feature are visible, the
                        // popup appears over the copy being pointed to.
                        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                        }

                        new mapboxgl.Popup()
                            .setLngLat(coordinates)
                            .setHTML(`magnitude: ${mag}<br>Was there a tsunami?: ${tsunami}`)
                            .addTo(mapRef.current); */
                    });

                    mapRef.current?.on('mouseenter', 'clusters', () => {
                        if (mapRef.current) {
                            mapRef.current.getCanvas().style.cursor = 'pointer';
                        }
                    });
                    mapRef.current?.on('mouseleave', 'clusters', () => {
                        if (mapRef.current) {
                            mapRef.current.getCanvas().style.cursor = '';
                        }
                    });
                });
            }
        }
    }, [mapContainerRef.current, mapRef.current, isSearched]);

    useEffect(() => {
        dispatch(setDateTo(dates[0]))
        dispatch(setDateBack(dates[1]))
    }, [dates]);

    const handleDateClick = (date: Date) => {
        let updatedDates = dates.filter(d => d !== undefined);

        if (updatedDates.length === 2) {
            updatedDates = [];
            setDates([]);
            dispatch(setDateTo(null))
            dispatch(setDateBack(null))
        }
        if (!dateTo || updatedDates.length === 0) {
            dispatch(setDateTo(date));
            updatedDates = [date];
        } else {
            updatedDates = [...updatedDates, date].sort((a, b) => a.getTime() - b.getTime());
            dispatch(setDateTo(updatedDates[0]))
            dispatch(setDateBack(updatedDates[1]))
        }

        setDates(updatedDates);
    };

    return (
        <div className={"w-full flex flex-col h-full"} ref={scrollRef}>
            <div className={`bg-primary h-full px-5 ${!isSearched && dateBack && dateTo ? "pt-5 rounded-t-[26px]" : "py-5 rounded-[26px]"}`}>
                <div className={"flex flex-col gap-4"}>
                    <div className={"flex flex-row items-center gap-2.5"}>
                        <div
                            className={"flex flex-row items-center py-3 px-2.5 gap-2 h-11 rounded-[16px] bg-secondary"}>
                            <PassengerImg />
                            <p className={"text-xs"}>+2</p>
                        </div>
                        <div
                            className={"flex flex-row items-center py-3 px-2.5 gap-2 h-11 rounded-[16px] bg-secondary"}>
                            <KeyImg />
                            <p className={"text-xs"}>+0</p>
                        </div>
                        <InputCity
                            placeholder={"Город"}
                            value={cityName}
                            setValue={(str) => dispatch(setCityName(str))}
                            callback={(city) => dispatch(setCity(city))}
                        />
                        <span className={"h-8 bg-[#E5E7EA] w-[1px] rounded-[1px]"} />
                        <InputDate
                            placeholder={"Заезд"}
                            extraClass={"py-3 px-2.5 h-11 min-w-[100px] max-w-[100px] !rounded-[16px]"}
                            extraCalendarClass="translate-x-[110px]"
                            noNeedButton={dates.length !== 2}
                            inputValue={dates}
                            viewValue={dateTo}
                            isShortDate={true}
                            withIcon={false}
                            calendarOpt={{
                                onClickDay: handleDateClick,
                                allowPartialOptions: true,
                                selectRange: true
                            }}
                            setter={(dates: Date[]) => {
                                setDates(dates);
                            }}
                        />
                        <InputDate
                            placeholder={"Выезд"}
                            extraClass={"py-3 px-2.5 h-11 min-w-[100px] max-w-[100px] !rounded-[16px]"}

                            noNeedButton={dates.length !== 2}
                            inputValue={dates}
                            viewValue={dateBack}
                            isShortDate={true}
                            withIcon={false}
                            calendarOpt={{
                                onClickDay: handleDateClick,
                                allowPartialOptions: true,
                                selectRange: true
                            }}
                            setter={(dates: Date[]) => {
                                setDates(dates);
                            }}
                        />
                    </div>
                    {isSearched ? (
                        <div className="h-[calc(100vh-230px)] rounded-[13px] overflow-hidden">
                            <div
                                style={{ height: '100%' }}
                                ref={mapContainerRef}
                                className={`map-container`}
                            />
                        </div>
                    ) : (
                        <>
                            <div className={"flex flex-row items-center flex-wrap gap-2.5"}>
                                <TagFilter tags={tags} setter={setTags} extraClass={"max-h-8"} />
                                <span className={"h-7 bg-[#E5E7EA] w-[1px] rounded-[1px]"} />
                                <TagFilter tags={stars} setter={setStars} extraClass={"max-h-8"} />
                                <span className={"h-7 bg-[#E5E7EA] w-[1px] rounded-[1px]"} />
                                <Checkbox
                                    items={isFreeCancelOption}
                                    onChange={() => dispatch(setIsFreeCancelFilter(!isFreeCancel))}
                                    childClass={"bg-secondary py-[6px] px-3 max-h-8"}
                                />
                            </div>
                            <div className={"flex gap-2.5"}>
                                <div
                                    className={"flex flex-col gap-1 px-4 py-2 rounded-primary bg-secondary cursor-pointer"}>
                                    <h6 className={"text-xs font-medium"}>Москва</h6>
                                    <p className={"text-[10px] text-[#9B9FAD]"}>17.01.2023 - 20.01.2023</p>
                                </div>
                                <div
                                    className={"flex flex-col gap-1 px-4 py-2.5 rounded-primary bg-secondary cursor-pointer"}>
                                    <h6 className={"text-xs font-medium"}>Norke Prime Зарядье</h6>
                                    <p className={"text-[10px] text-[#9B9FAD]"}>18.02.2023 - 21.02.2023</p>
                                </div>
                                <div
                                    className={"flex items-center gap-2.5 px-4 py-2.5 rounded-primary bg-secondary cursor-pointer"}>
                                    <CopyImg />
                                    <h6 className={"text-xs font-medium"}>Выбрать из шаблонов</h6>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className={"bg-primary overflow-hidden rounded-b-[26px]"}>
                {!isSearched && dateBack && dateTo ? (
                    <div className="flex flex-col px-5 py-5 h-[calc(100vh-310px)]">
                        <div className="flex flex-col p-7 h-full rounded-[23px] bg-secondary">
                            <h1 className={"text-2xl"}>Билетов на эти даты уже нет в продаже</h1>
                            <h3 className={"text-lg mt-4 font-normal"}>Что можно сделать?</h3>
                            <div className={"flex flex-col gap-2.5 mt-6"}>
                                <div className={"flex items-center gap-2.5"}>
                                    <div className={"p-2 bg-primary rounded-secondary h-9"}>
                                        <ChairAwayImg className={"black-fill"} />
                                    </div>
                                    <p className={"text-base max-w-[280px]"}>Посмотреть распроданные билеты и создать
                                        Автобронирование</p>
                                </div>
                                <div className={"flex items-center gap-2.5"}>
                                    <div
                                        className={"p-2 bg-primary rounded-secondary w-9 h-9 flex justify-center items-center"}>
                                        <RouteImg />
                                    </div>
                                    <p className={"text-base max-w-[280px]"}>Изменить даты</p>
                                </div>
                                <div className={"flex items-center gap-2.5"}>
                                    <div
                                        className={"p-2 bg-primary rounded-secondary w-9 h-9 flex justify-center items-center"}>
                                        <PlaneImg />
                                    </div>
                                    <div
                                        className={"p-2 bg-primary rounded-secondary w-9 h-9 flex justify-center items-center"}>
                                        <BusImg />
                                    </div>
                                    <p className={"text-base max-w-[280px]"}>Попробовать другой вид транспорта</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export { HotelMap };