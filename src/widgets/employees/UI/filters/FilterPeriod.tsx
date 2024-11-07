import InputDate from "@/widgets/jobs/UI/InputDate";
import InputSelect from "@/widgets/jobs/UI/InputSelect";
import { useEffect } from "react";
import PlusImg from '@/assets/icons/plus.svg?react'
import { setPeriods, changePeriod, addPeriod } from "../../model/index.store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/config/store";
import { getAccessToken } from "@/shared/utils";

const FilterPeriod = () => {

    const dispatch = useDispatch();

    const deputy = useSelector((state: RootState) => state.employees.Staffers);
    const Periods = useSelector((state: RootState) => state.employees.Periods);

    const EmployeeId = localStorage.getItem('EmployeeId')
    const AccessToken = getAccessToken()

    const getInformation = async () => {
        const url = new URL(import.meta.env.VITE_API_URL + '/company/employees_profile/get_employees_profile_periods_of_absence');
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

                const information: any[] = data.data

                const array:any[] = []
                information.forEach((el) => {
                    array.push({
                        id: el.id,
                        DateFrom: new Date(el.DateFrom),
                        DateTo: new Date(el.DateTo),
                        DeputyId: el.Deputy.id
                    })
                })

                dispatch(setPeriods(array))
                // const dateSrc = today.toLocaleString('ru-RU', { year: 'numeric', month: 'numeric', day: 'numeric' });

                // if(data_information.IsUnlimited) {
                //     dispatch(setAccessTerm('Бессрочно'))    
                // } else {
                //     dispatch(setAccessTerm(new Date(data_information.ValidityDeadline)))
                // }

                // const accessSelect = access.find(item => item.code === data_information.PermissionsClassName)

                // let id = accessSelect?.id

                // dispatch(setAccess({ id, oneChoise: true}))

            }
        } catch (error) {

            console.log(error);

        }

    }

    useEffect(() => {
        getInformation()
    }, [])

    return (
        <div className="grow flex flex-col justify-between gap-[10px]">
            <div className="flex flex-col gap-[10px]">
                {Periods.map(item => (
                    <div className="flex flex-col gap-[6px] rounded-[23px] p-[13px] bg-[#ECEEF1]">

                        <div className="flex gap-[6px]">
                            <InputDate placeholder="Дата от" ClassCalendar="" ClassView="bg-[#FAFAFA] rounded-[13px] w-[115px] p-[8px] *:text-left" value={item.DateFrom} change={(date: Date) => { dispatch(changePeriod({ id: item.id, value: date, field: 'DateFrom' })) }} />
                            <InputDate placeholder="Дата до" ClassCalendar=" " ClassView="bg-[#FAFAFA] rounded-[13px] w-[115px] p-[8px] *:text-left" value={item.DateTo} change={(date: Date) => { dispatch(changePeriod({ id: item.id, value: date, field: 'DateTo' })) }} />
                        </div>
                        <InputSelect title="Заместитель" data={deputy} activeId={item.DeputyId} change={(id: number) => dispatch(changePeriod({ id: item.id, value: id, field: 'DeputyId' }))} />
                    </div>
                ))}
            </div>
            <div className="pt-[15px] border-0 border-t border-solid border-[#E5E7EA]">
                <button
                    onClick={() => {dispatch(addPeriod())}}
                    className="w-full flex justify-between items-center p-[13px] border border-solid border-[#E5E7EA] rounded-[23px]">
                    <span className="text-[12px] text-[#787B86]">Добавить период</span>
                    <PlusImg />
                </button>
            </div>
        </div>
    );
};

export default FilterPeriod;