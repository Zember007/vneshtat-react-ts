import RadarImg from "@/assets/icons/radar.svg?react";
import ReloadImg from "@/assets/icons/reload.svg?react";

const TrainNavigations = ({ activeOperation }: { activeOperation: string }) => {
    return (
        <>
            {activeOperation === "passengers" && (
                <button className={"h-[50px] w-full flex justify-center items-center py-4 rounded-[21px] bg-black"}>
                    <p className={"text-lg text-[#fff] leading-none"}>Поиск!</p>
                </button>
            )}
            {activeOperation === "filter" && (
                <div className={"h-[50px] flex flex-row gap-4"}>
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
            {activeOperation === "decor" && (
                <div className={"flex flex-col gap-[10px]"}>
                    <div className="rounded-[13px] bg-[#DCE0E5] py-[8px] font-medium text-center">
                        9650,40 ₽
                    </div>
                    <hr className="mx-auto w-[50px] h-[1px] bg-[#C0C7D1] rounded-[1px]" />
                    <button className={"h-[50px] w-full flex justify-center items-center py-4 rounded-[21px] bg-black"}>
                        <p className={"text-lg text-[#fff] leading-none"}>Забронировать</p>
                    </button>
                </div>
            )}
        </>
    );
};

export { TrainNavigations };