import { ModalRight } from "@/shared/UI";
import { useState } from "react";
import ImportImg from '@/assets/icons/import-team.svg?react'

const PassengersNavigation = () => {

    const [importTeam, setImportTeam]  = useState<boolean>(false)
    // const [exportTeam, setExportTeam]  = useState<boolean>(false)
    // const [addTeam, setAddTeam]  = useState<boolean>(false)

    return (
        <>
            <div className="flex flex-col gap-[10px]">
                <div className="flex gap-[10px] pb-[10px] after:content-[''] after:absolute after:bottom-0 after:left-[50%] after:translate-x-[-50%] after:h-[1px] relative after:w-[50px] after:bg-[#C0C7D1]">
                    <button
                    onClick={() => setImportTeam(true)}
                        className="font-medium w-full py-[10px] text-center rounded-[13px] bg-[#DCE0E5]"
                    >Импорт</button>
                    <button
                        className="font-medium w-full py-[10px] text-center rounded-[13px] bg-[#DCE0E5]"
                    >Экспорт</button>
                </div>
                <button className="py-[13px] text-center rounded-[18px] bg-[#292933] w-full">
                    <p className="text-[16px] text-primary">
                        Добавить пассажира
                    </p>
                </button>
            </div>

            <ModalRight
            active={importTeam}
            button="Завершить импорт"
            close={() => {setImportTeam(false)}}
            description="Скачайте и заполните таблицу со списком сотрудников. Не меняйте количество и порядок строк и столбцов, чтобы алгоритм смог правильно импортировать данные."
            title="Импорт сотрудников">
                <div className="flex flex-col grow">
                    <div className="flex gap-[8px] rounded-[23px] bg-[#ECEEF1] p-[13px]">
                        <button className="bg-primary rounded-[13px] text-[12px] font-medium w-full py-[8px]">Скачать таблицу</button>
                        <button className="bg-[#121212] rounded-[13px] text-[12px] font-medium text-primary w-full py-[8px]">Загрузить таблицу</button>
                    </div>
                    <div className="grow flex justify-center items-center">
                        <ImportImg />
                    </div>
                </div>
            </ModalRight>
        </>
    );
};

export { PassengersNavigation };