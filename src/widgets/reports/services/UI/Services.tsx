import Switcher from "@/widgets/jobs/UI/Switcher";
import { useState } from "react";

const Services = () => {

    const [switcher, setSwitcher] = useState<boolean>(false)

    return (
        <>

            {/* <span className='font-normal text-[#787B86] text-center max-w-[390px]'>Выберите календарный отрезок и параметры формирования отчёта.</span> */}

            <div className="flex flex-col gap-[15px] p-[20px] h-full">


                <Switcher items={['Всё', 'По услугам']} change={setSwitcher} checked={switcher}/>



                <div className="grow h-full">
                    <div className="p-[15px] bg-[#ECEEF1] rounded-[13px]">
                        <div className="h-full bg-[#FBFBFBD1] p-[15px] rounded-[13px]">

                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export { Services };