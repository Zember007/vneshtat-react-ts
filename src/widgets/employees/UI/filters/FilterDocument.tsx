
import { useEffect, useState } from "react";
import PlusImg from '@/assets/icons/plus.svg?react'
import { getAccessToken } from "@/shared/utils";
import {  useSelector } from "react-redux";
import { RootState } from "@/app/config/store";
import InputSelect from "@/widgets/jobs/UI/InputSelect";

const FilterDocument = () => {
    const [documentAdd, setDocumentAdd] = useState<boolean>(false)


    const gender = useSelector((state: RootState) => state.employees.gender);

    const EmployeeId = localStorage.getItem('EmployeeId')
    const AccessToken = getAccessToken()

    const getInformation = async () => {
        const url = new URL(import.meta.env.VITE_API_URL + '/company/employees_profile/get_employees_profile_documents');
        url.searchParams.append('EmployeeId', EmployeeId || '');
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${AccessToken}`
                }
            });
            const data = await res.json();
            if (data.status === "error") {
                console.log("error", data);
            }

            if (data.status === "success" && data.data) {
                console.log(data.data)
            }
        } catch (error) {

            console.log(error);

        }

    }

    useEffect(() => {
        getInformation()
    }, [])

    return (
        <div className="flex flex-col grow justify-between">
            <div className="flex flex-col gap-[10px]">
                {/* <div className="flex flex-col gap-[6px] rounded-[23px] p-[13px] bg-[#ECEEF1]">
                <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                    <span className=" text-[12px] font-medium text-[#9B9FAD] whitespace-nowrap">Паспорт РФ</span>
                    <input value={'5017 574839'} type="text" className="w-full bg-[transparent] text-[12px] font-medium text-right" />
                </div>
            </div>
            <div className="rounded-[23px] flex flex-col gap-[6px] p-[13px] bg-[#ECEEF1]">
                <div className="flex items-center justify-between pb-[4px]">
                    <span className="font-medium ">
                        Загранпаспорт РФ
                    </span>
                    <button>
                        <TrashImg />
                    </button>
                </div>
                <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                    <span className=" text-[12px] font-medium text-[#9B9FAD] whitespace-nowrap">Серия и номер</span>
                    <input value={'5017 574839'} type="text" className="w-full bg-[transparent] text-[12px] font-medium text-right" />
                </div>
                <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                    <span className=" text-[12px] font-medium text-[#9B9FAD] whitespace-nowrap">Срок действия</span>
                    <InputDate value={documentTerm} ClassCalendar="!w-[260px] translate-x-[23px]" change={(date: Date) => { setDocumentTerm(date) }} />
                </div>
                <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                    <span className=" text-[12px] font-medium text-[#9B9FAD] whitespace-nowrap">Фамилия (лат.)</span>
                    <input value={'Voznesenskiy'} type="text" className="w-full bg-[transparent] text-[12px] font-medium text-right" />
                </div>
                <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                    <span className=" text-[12px] font-medium text-[#9B9FAD] whitespace-nowrap">Ivan</span>
                    <input value={'Ivan'} type="text" className="w-full bg-[transparent] text-[12px] font-medium text-right" />
                </div>
            </div> */}

                {documentAdd &&
                    <div className="rounded-[23px] flex flex-col gap-[6px] p-[13px] bg-[#ECEEF1]">
                        <InputSelect data={gender} change={() => {}} center={true} default="Категория документа"/>
                        <InputSelect data={gender} change={() => {}} center={true} default="Документ"/>
                    </div>
                }
            </div>

            <div className="pt-[15px] border-0 border-t border-solid border-[#E5E7EA]">
                <button
                    onClick={() => { setDocumentAdd(true) }}
                    className="w-full flex justify-between items-center p-[13px] border border-solid border-[#E5E7EA] rounded-[23px]">
                    <span className="text-[12px] text-[#787B86]">Добавить документ</span>
                    <PlusImg />
                </button>
            </div>
        </div>
    );
};

export default FilterDocument;