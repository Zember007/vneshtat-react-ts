import InputDate from "@/widgets/jobs/UI/InputDate";
import InputSelect from "@/widgets/jobs/UI/InputSelect";
import { useState } from "react";

import { setDeputy } from "../../model/index.store";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/config/store";

const FilterPeriod = () => {

    const [dateFrom, setDateFrom] = useState<Date | null>(null)
    const [dateBefore, setDateBefore] = useState<Date | null>(null)

    const dispatch = useDispatch();

    const deputy = useSelector((state: RootState) => state.employees.deputy);


    return (
        <div className="flex flex-col gap-[6px] rounded-[23px] p-[13px] bg-[#ECEEF1]">

            <div className="flex gap-[6px]">
                <InputDate placeholder="Дата от" ClassCalendar="!right-[0] !left-[auto] " ClassView="bg-[#FAFAFA] rounded-[13px] relative w-[115px] p-[8px] *:text-left" value={dateFrom} change={(date: Date) => { setDateFrom(date) }} />
                <InputDate placeholder="Дата до" ClassCalendar="!right-[0] !left-[auto] " ClassView="bg-[#FAFAFA] rounded-[13px] relative w-[115px] p-[8px] *:text-left" value={dateBefore} change={(date: Date) => { setDateBefore(date) }} />
            </div>
            <InputSelect title="Заместитель" data={deputy} change={(id: number) => dispatch(setDeputy({ id, oneChoise: true }))} />
        </div>
    );
};

export default FilterPeriod;