import LockImg from '@/assets/icons/lock.svg?react'
import InputSelect from "@/widgets/jobs/UI/InputSelect";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/config/store";
import InputDate from "@/widgets/jobs/UI/InputDate";
import { changeAccessEmployees } from '../../model/index.store';

const FilterAccess = ({ selectId }: { selectId: number | null }) => {

    const dispatch = useDispatch();

    const AccessStaffer = useSelector((state: RootState) => state.employees.StaffersAccess).find(item => item.id === selectId);
    const access = useSelector((state: RootState) => state.employees.access);
    const accessSelect = access.find(item => item.code === AccessStaffer?.PermissionsClassName);

    return (
        <>
            { AccessStaffer &&
                <div className="flex flex-col gap-[6px] rounded-[23px] p-[13px] bg-[#ECEEF1]">
                    <InputSelect icon={<LockImg className="min-w-[20px]" />} title="Уровень" data={access} activeId={accessSelect?.id} change={(id: number) => dispatch(changeAccessEmployees({id: AccessStaffer.id, field: 'PermissionsClassName', value: access.find(item => item.id === id)?.code}))} />
                    <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                        <span className=" text-[12px] font-medium text-[#9B9FAD] whitespace-nowrap">Срок действия</span>
                        <InputDate button='Бессрочно' ClassCalendar="!w-[260px] translate-x-[23px]" value={AccessStaffer?.ValidityDeadline ? new Date(AccessStaffer?.ValidityDeadline) : 'Бессрочно'} change={(data: Date | string) => { 
                            if(typeof data === 'string') {
                                dispatch(changeAccessEmployees({id: AccessStaffer.id, field: 'IsUnlimited', value: true}))
                                dispatch(changeAccessEmployees({id: AccessStaffer.id, field: 'ValidityDeadline' , value: null}))
                            } else {
                                const date = `${data.getFullYear()}-${data.getMonth()+1}-${data.getDate()}`
                                dispatch(changeAccessEmployees({id: AccessStaffer.id, field: 'IsUnlimited', value: false}))
                                dispatch(changeAccessEmployees({id: AccessStaffer.id, field: 'ValidityDeadline' , value: date}))
                            }
                         }} />
                    </div>
                </div>
            }
        </>
    );
};

export default FilterAccess;