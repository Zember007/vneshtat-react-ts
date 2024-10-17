import LikeImg from '@/assets/icons/heart.svg?react'
import CopyImg from '@/assets/icons/copy.svg?react'
import PinImg from '@/assets/icons/pin_.svg?react'

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

const JorneyCart = () => {

    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);

    useEffect(() => {
        if (mapContainerRef.current && !mapRef.current) {
            mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current as HTMLElement,
                center: [37.6206, 55.758],
                zoom: 5,
            });
        }
    }, [mapContainerRef.current, mapRef.current]);
    return (
        <div className="flex gap-[10px] items-center">
            <div className="flex flex-col gap-[10px]">
                <button className="flex items-center justify-center rounded-[11px] bg-[#ECEEF1] h-[35px] w-[35px]"><CopyImg className='h-[19px] w-[19px]' /></button>
                <button className="flex items-center justify-center rounded-[11px] bg-[#ECEEF1] h-[35px] w-[35px]"><LikeImg className='h-[19px] w-[19px]' /></button>
            </div>
            <div className="h-full p-[15px] rounded-[23px] bg-[#ECEEF1] flex flex-col gap-[10px] grow">
                <div className="flex justify-between items-center">
                    <div className="flex gap-[5px] items-center">
                        <span className='text-[18px] font-medium'>Инспекция в Саратов</span>
                        <div className="rounded-[10px] bg-[#007BFB] px-[10px] py-[3px]">
                            <p className='text-[10px] font-medium text-primary'>Сейчас</p>
                        </div>
                    </div>

                    <PinImg />
                </div>
                <div className="grow h-full flex gap-[5px]">
                    <div ref={mapContainerRef} className="w-full rounded-[10px]"></div>
                    <div className="w-full flex flex-col gap-[5px] rounded-[10px] p-[15px] bg-primary min-w-[130px]">
                        <span className='text-[14px] font-medium'>Маршрут</span>
                        <div className="flex flex-col gap-[3px] *:text-[#787B86] text-[14px] font-medium">
                            <p>Сыктывкар</p>
                            <p>Самара</p>
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-[5px] rounded-[10px] p-[15px] bg-primary min-w-[130px]">
                        <span className='text-[14px] font-medium'>Даты</span>
                        <div className="flex flex-col gap-[3px] *:text-[#787B86] text-[14px] font-medium">
                            <p>02.02.23 <span>чт</span></p>
                            <p>04.02.23 <span>сб</span></p>
                        </div>
                    </div>
                    <div className="w-full flex flex-col rounded-[10px] p-[15px] bg-primary min-w-[130px]">
                        <span className='text-[14px] font-medium'>Сотрудники</span>
                        <div className="flex gap-[5px] *:text-[#787B86] text-[12px] font-medium grow items-center">
                            <span className='w-[30px] h-[30px] flex items-center justify-center bg-[#ECEEF1] rounded-[50%] '>Ви</span>
                            <span className='w-[30px] h-[30px] flex items-center justify-center bg-[#ECEEF1] rounded-[50%] '>Ви</span>
                            <span className='w-[30px] h-[30px] flex items-center justify-center bg-[#ECEEF1] rounded-[50%] '>Ви</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-full p-[15px] rounded-[23px] bg-[#ECEEF1] flex flex-col gap-[5px] min-w-[185px]">
                <div className="rounded-[13px] bg-primary py-[10.5px]">
                    <p className='text-[#787B86] text-center'>28 570 ₽ </p>
                </div>
                <div className="rounded-[13px] bg-primary py-[10.5px]">
                    <p className='text-[#787B86] text-center'>#7441 от 29.11.2023</p>
                </div>
                <div className="rounded-[13px] bg-primary py-[10.5px]">
                    <p className='text-[#787B86] text-center'>Оформлено</p>
                </div>
            </div>
        </div>
    );
};

export default JorneyCart;