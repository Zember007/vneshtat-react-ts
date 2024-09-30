import LockImg from '@/assets/icons/lock.svg?react'
import InputSelect from "@/widgets/jobs/UI/InputSelect";
import { setAccess } from "../../model/index.store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/config/store";
import InputDate from "@/widgets/jobs/UI/InputDate";
import { useState } from 'react';

const FilterAccess = () => {

    const [accessTerm, setAccessTerm] = useState<Date | string>(new Date())

    const dispatch = useDispatch();

    const access = useSelector((state: RootState) => state.employees.access);

    return (
        <div className="flex flex-col gap-[6px] rounded-[23px] p-[13px] bg-[#ECEEF1]">
            <InputSelect icon={<LockImg className="min-w-[20px]" />} title="Уровень" data={access} change={(id:number) => dispatch(setAccess({id, oneChoise: true}))} />
            <div className="relative flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                <span className=" text-[12px] font-medium text-[#9B9FAD] whitespace-nowrap">Срок действия</span>
                <InputDate button='Бессрочно' value={accessTerm} change={(data: Date | string) => { setAccessTerm(data) }}/>
            </div>            
        </div>
    );
};

export default FilterAccess;