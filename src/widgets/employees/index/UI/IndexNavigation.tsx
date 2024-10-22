import { ModalRight, Input } from "@/shared/UI";
import { ChangeEvent, useState } from "react";
import ImportImg from '@/assets/icons/import-team.svg?react'

const IndexNavigation = () => {

    const formatDisplayDate = (value: string): string => {
        const cleaned = value.replace(/\D/g, '');

        if (cleaned.length <= 2) {
            return cleaned;
        } else if (cleaned.length <= 4) {
            return `${cleaned.slice(0, 2)}-${cleaned.slice(2)}`;
        } else if (cleaned.length <= 8) {
            return `${cleaned.slice(0, 2)}-${cleaned.slice(2, 4)}-${cleaned.slice(4)}`;
        } else {
            return value;
        }
    };

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDateUser(formatDisplayDate(value));
    };

    const [DateUser, setDateUser] = useState<string>('')


    const [importTeam, setImportTeam] = useState<boolean>(false)
    // const [exportTeam, setExportTeam] = useState<boolean>(false)
    const [addTeam, setAddTeam] = useState<boolean>(false)
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
                <button
                    onClick={() => setAddTeam(true)}
                    className="py-[13px] text-center rounded-[18px] bg-[#292933] w-full">
                    <p className="text-[16px] text-primary">
                        Добавить сотрудника
                    </p>
                </button>

            </div>

            <ModalRight
                active={importTeam}
                button="Завершить импорт"
                close={() => { setImportTeam(false) }}
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

            <ModalRight
                active={addTeam}
                button="Добавить"
                close={() => { setAddTeam(false) }}
                description="Сотрудник получит письмо с персональной ссылкой на подключение. На этом этапе личные данные нужны для того, чтобы он мог убедиться, что ему пришла корректная ссылка."
                title="Добавить сотрудника">
                <div className="flex flex-col grow gap-[15px] ">
                    <span className="text-[18px] font-medium">Личные данные</span>
                    <div className="flex flex-col gap-[8px]">

                        <Input
                            extraClass={"!text-lg !font-medium text-center h-[50px] rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary"}
                            placeholder={"Фамилия"}
                            value={''}
                            onChange={() => { }}
                        />

                        <Input
                            extraClass={"!text-lg !font-medium text-center h-[50px] rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary"}
                            placeholder={"Имя"}
                            value={''}
                            onChange={() => { }}
                        />

                        <Input
                            extraClass={"!text-lg !font-medium text-center h-[50px] rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary"}
                            placeholder={"Отчество"}
                            value={''}
                            onChange={() => { }}
                        />

                        <Input
                            extraClass={"!text-lg !font-medium text-center h-[50px] rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary"}
                            placeholder={"Дата рождения"}
                            value={DateUser}
                            onChange={handleDateChange}
                            maxLength={10}
                        />

                        <Input
                            extraClass={"!text-lg !font-medium text-center h-[50px] rounded-[16px] border border-solid border-[#E5E7EA] !bg-primary"}
                            placeholder={"Email"}
                            value={''}
                            onChange={() => { }}
                        />
                    </div>
                </div>
            </ModalRight>
        </>
    );
};

export { IndexNavigation };