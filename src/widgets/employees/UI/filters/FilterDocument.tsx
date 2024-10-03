
import { useState } from "react";
import TrashImg from '@/assets/icons/trash.svg?react'
import InputDate from "@/widgets/jobs/UI/InputDate";

const FilterDocument = () => {
    const [documentTerm, setDocumentTerm] = useState<Date>(new Date())
    return (
        <div className="flex flex-col gap-[10px]">
            <div className="flex flex-col gap-[6px] rounded-[23px] p-[13px] bg-[#ECEEF1]">
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
            </div>
        </div>
    );
};

export default FilterDocument;