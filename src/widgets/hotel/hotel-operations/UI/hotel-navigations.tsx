import RadarImg from "@/assets/icons/radar.svg?react";
import ReloadImg from "@/assets/icons/reload.svg?react";
import {Dispatch, SetStateAction} from "react";
import {ActiveOperation} from "@/shared/types";
const HotelNavigations = ({isSearched, setIsSearched, activeOperation}: {
    isSearched: boolean,
    setIsSearched: Dispatch<SetStateAction<boolean>>,
    activeOperation: ActiveOperation
}) => {
    return (
        <>
            {activeOperation === "route" && (
                <button
                    className={"h-[50px] w-full flex justify-center items-center py-4 rounded-[21px] bg-black mt-4"}>
                    <p className={"text-lg text-[#fff] leading-none"}>Выбрать гостей</p>
                </button>
            )}
            {activeOperation === "passengers" && !isSearched || activeOperation === "filter" && !isSearched ? (
                <button className={"h-[50px] w-full flex justify-center items-center py-4 rounded-[21px] bg-black mt-4"}
                    onClick={() => setIsSearched(true)}>
                    <p className={"text-lg text-[#fff] leading-none"}>Поиск!</p>
                </button>
            ) : (
                <div className={"h-[50px] flex flex-row gap-4 mt-4"}>
                    <button className={"h-full px-3 bg-[#dce0e5] rounded-[21px]"}>
                        <RadarImg />
                    </button>
                    <button
                        className={"flex flex-row items-center justify-center bg-[#dce0e5] rounded-[21px] gap-1 w-full h-full"}>
                        <ReloadImg />
                        <p className={"text-base"}>Обновить</p>
                    </button>
                </div>
            )}
        </>
    );
};

export { HotelNavigations };