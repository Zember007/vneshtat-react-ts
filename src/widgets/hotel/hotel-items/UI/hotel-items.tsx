import {useState} from "react";
import {Input, Switch} from "@/shared/UI";
import BurgerImg from "@/assets/icons/burger.svg?react";
import HeartImg from "@/assets/icons/heart.svg?react";
import SearchImg from "@/assets/icons/search.svg?react";

const HotelItems = () => {
    const [byQueue, setByQueue] = useState(true);

    return (
        <div className={"p-5 bg-primary rounded-[26px] min-w-[230px] flex flex-col gap-5"}>
            <div className={"flex items-center gap-2.5"}>
                <Switch
                    firstChild={<BurgerImg className={"h-5 w-5"}/>}
                    secondChild={
                        <div className={"relative flex items-start justify-end"}>
                            <HeartImg className={"h-5 w-5"}/>
                            <span className="absolute h-[5px] w-[5px] rounded-[100%] bg-red left-4 bottom-4"/>
                        </div>
                    }
                    isSelected={byQueue}
                    setter={setByQueue}
                    extraChildClass={"px-[3px] py-[3px]"}
                    extraClass={"max-h-9 w-26"}
                />
                <div className={"flex items-center gap-[5px]"}>
                    <p className={"text-[11px] font-medium leading-none"}>По цене</p>
                    <p className={"text-[11px] leading-none"}>По рейтингу</p>
                </div>
            </div>
            <label className={"flex items-center justify-start w-full relative"}>
                <Input placeholder={"Поиск отеля по названию"} extraClass={"pl-7 text-[12px]"} withEraser={false}/>
                <SearchImg className={"absolute min-h-4 min-w-4 left-2"}/>
            </label>
            <div>

            </div>
        </div>
    )
};

export {HotelItems};