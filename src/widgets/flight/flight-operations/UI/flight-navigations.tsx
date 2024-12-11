import RadarImg from "@/assets/icons/radar.svg?react";
import ReloadImg from "@/assets/icons/reload.svg?react";
import {ActiveOperation} from "@/shared/types";

const FlightNavigations = ({activeOperation}:{activeOperation:ActiveOperation}) => {
    return (
        <>
            {activeOperation === "route" && (
                <button className={"h-[50px] w-full flex justify-center items-center py-4 rounded-[21px] bg-black mt-4"}>
                    <p className={"text-lg text-[#fff] leading-none"}>Выбрать пассажиров</p>
                </button>
            )}
            {activeOperation === "passengers" && (
                <button className={"h-[50px] w-full flex justify-center items-center py-4 rounded-[21px] bg-black mt-4"}>
                    <p className={"text-lg text-[#fff]"}>Поиск!</p>
                </button>
            )}
            {activeOperation === "filter" && (
                <div className={"h-[50px] flex flex-row gap-4 mt-4"}>
                    <button className={"h-full w-[50px] px-3 bg-[#dce0e5] rounded-[21px]"}>
                        <RadarImg />
                    </button>
                    <button
                        className={"h-full w-full flex flex-row items-center justify-center bg-[#dce0e5] rounded-[21px] gap-1"}>
                        <ReloadImg />
                        <p className={"text-base"}>Обновить</p>
                    </button>
                </div>
            )}
        </>
    );
};

export { FlightNavigations };