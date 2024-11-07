import ImportImg from '@/assets/icons/import-team.svg?react'
import TrashImg from '@/assets/icons/trash.svg?react'
import SuccessImg from "@/assets/icons/success.svg?react";
import SuccessFilledImg from "@/assets/icons/success-filled.svg?react";
import { ModalRight } from '@/shared/UI';
import { getAccessToken } from '@/shared/utils';
import { staffers } from '@/widgets/employees/utils';
import { ChangeEvent, FormEvent, useCallback, useRef, useState } from 'react';
import * as XLSX from 'xlsx';

const ImportTeam = ({ active, close }: { active: boolean; close: Function }) => {

    const AccessToken = getAccessToken()
    const EmployeeId = localStorage.getItem('EmployeeId')

    const downloadTable = async () => {

        const rows = [
            {
                'Электронная почта':'',
                'Фамилия':'',
                'Отчество':'',
                'Дата рождения':'',
            }
        ]

        const worksheet = XLSX.utils.json_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "ImportData.xlsx", { compression: true });
    }

    const [dataTable, setDataTable] = useState<staffers[] | null>(null);

    const handleFileUpload = (e: ChangeEvent) => {
        const element = e.currentTarget as HTMLInputElement;
        let file: File | null = element.files ? element.files[0] : null
        const reader = new FileReader();

        reader.onload = (event) => {
            const workbook = XLSX.read(event.target?.result, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const sheetData: staffers[] = XLSX.utils.sheet_to_json(sheet, { raw: false, header: ["Email", "Surname", "Name", "MiddleName", "BirthDate"] });

            const array: staffers[] = []

            sheetData.map((item, index) => {
                if (index !== 0) {
                    array.push({
                        id: index,
                        Email: item.Email,
                        Surname: item.Surname,
                        Name: item.Name,
                        MiddleName: item.MiddleName,
                        BirthDate: item.BirthDate,
                        IsActive: true
                    })
                }
            })
            setDataTable(array);
            console.log(dataTable);


        };

        if (file) {
            reader.readAsBinaryString(file);
        }

    };

    const ImportTeam = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        const ArrayData: any[] = []

        dataTable?.filter(item => item.IsActive).map(item => {
            ArrayData.push({
                "Email": item.Email,
                "Name": item.Name,
                "Surname": item.Surname,
                "Middlename": item.MiddleName,
                "BirthDate": item.BirthDate
            })
        })

        const formdata: { EmployeeId: number; Data: any[]; } = {
            EmployeeId: Number(EmployeeId),
            Data: ArrayData
        }

        try {
            const res = await fetch(import.meta.env.VITE_API_URL + '/company/company_profile/import_confirmed_company_employees', {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${AccessToken}`
                },
                body: JSON.stringify(formdata)
            });
            const data = await res.json();
            if (data.status === "error") {
                console.log("error", data);
            }

            if (data.status === "success") {
                close()
                setDataTable(null)
            }
        } catch (error) {

            console.log(error);

        }

    }

    const FileInput = useRef<HTMLInputElement | null>(null)
    const handleClick = useCallback(() => FileInput.current?.click(), []);

    return (
        <ModalRight
            action={(e: FormEvent<HTMLFormElement>) => { ImportTeam(e) }}
            active={active}
            button="Завершить импорт"
            close={() => { close() }}
            description="Скачайте и заполните таблицу со списком сотрудников. Не меняйте количество и порядок строк и столбцов, чтобы алгоритм смог правильно импортировать данные."
            title="Импорт сотрудников">
            <div className="flex flex-col grow">
                <div className="flex gap-[8px] rounded-[23px] bg-[#ECEEF1] p-[13px]">
                    <button onClick={() => downloadTable()} className="bg-primary rounded-[13px] text-[12px] font-medium w-full py-[8px]">Скачать таблицу</button>
                    <button onClick={handleClick} className="bg-[#121212] rounded-[13px] text-[12px] font-medium text-primary w-full py-[8px]">Загрузить таблицу</button>
                    <input ref={FileInput} onChange={(e) => { handleFileUpload(e) }} className='hidden' type="file" />
                </div>
                {
                    !dataTable?.length ?
                        <div className="grow flex justify-center items-center">
                            <ImportImg />
                        </div>
                        :
                        <div className="flex flex-col gap-[20px]">
                            <div className="bg-[#ECEEF1] py-[15px] px-[20px] flex flex-col rounded-[23px] mt-[20px]">
                                <div className="flex items-center justify-between *:text-[12px] *:font-medium">
                                    <span>Сотрудники: {dataTable.length} человек</span>
                                    <button
                                        onClick={() => {
                                            const array: staffers[] = []
                                            dataTable.map(item => {
                                                item.IsActive = true
                                                array.push(item)
                                            })
                                            setDataTable(array)
                                        }}
                                        className='text-[#9B9FAD]'>Выбрать всех</button>
                                </div>
                                <div className="flex flex-col">
                                    {
                                        dataTable.map((item, index) => (
                                            <>
                                                <div className={`flex items-center gap-[4px] ${index !== 0 ? 'mt-[5px]' : 'mt-[20px]'}`}>
                                                    <div onClick={() => {
                                                        const array: staffers[] = []
                                                        dataTable.map(item_edit => {
                                                            if (item.id === item_edit.id) {
                                                                item_edit.IsActive = !item_edit.IsActive

                                                            }

                                                            array.push(item_edit)

                                                        })
                                                        setDataTable(array)
                                                    }} className="cursor-pointer py-[6px] px-[9px] bg-[#DCE0E5] rounded-[15px] flex items-center gap-[5px] grow">
                                                        {item.IsActive ? <SuccessFilledImg className={"min-w-7 min-h-7"} /> :
                                                            <SuccessImg className={"min-w-7 min-h-7"} />}
                                                        <span className='text-[12px]'>{item.Surname} {item.Name} {item.MiddleName}</span>
                                                    </div>
                                                    <button
                                                        onClick={() => {
                                                            const array: staffers[] = []
                                                            dataTable.map(item_edit => {
                                                                if (item.id !== item_edit.id) {

                                                                    array.push(item_edit)

                                                                }



                                                            })
                                                            setDataTable(array)
                                                        }}>
                                                        <TrashImg />
                                                    </button>
                                                </div>
                                            </>
                                        ))
                                    }
                                </div>
                            </div>
                            <p className='text-[14px] text-[#787B86]'>
                                Технических ошибок в таблице не обнаружено. После завершения импорта каждому сотруднику придёт письмо со ссылкой на подключение к сервису.
                            </p>
                        </div>
                }
            </div>
        </ModalRight>
    );
};

export default ImportTeam;