import { RootState } from "@/app/config/store";
import { useDispatch, useSelector } from "react-redux";
import { changeStaffersInformations, setGender } from "../../model/index.store";
import InputSelect from "@/widgets/jobs/UI/InputSelect";
import Lock from "@/assets/icons/lock.svg?react";
import { ChangeEvent, useEffect } from "react";

const FilterUser = ({ passenger, selectId }: { passenger?: boolean, selectId: number | null }) => {

    const dispatch = useDispatch();
    const StaffersInformation = useSelector((state: RootState) => state.employees.StaffersInformations).find(item => item.id === selectId);
    // const Passenger = useSelector((state: RootState) => state.employees.Passengers).find(item => item.id === selectId);
    const Gender = useSelector((state: RootState) => state.employees.gender);
    const GenderSelect = Gender.find(item => item.isSelected)


    useEffect(() => {
        dispatch(changeStaffersInformations({ field: 'PersonalInfoGender', value: GenderSelect?.code, id: selectId }))
    }, [GenderSelect])

    const formatDisplayDate = (value: string): string => {
        const cleaned = value.replace(/\D/g, '');

        if (cleaned.length <= 2) {
            return cleaned;
        } else if (cleaned.length <= 4) {
            return `${cleaned.slice(0, 2)}-${cleaned.slice(2)}`;
        } else if (cleaned.length <= 8) {
            return `${cleaned.slice(0, 2)}-${cleaned.slice(2, 4)}-${cleaned.slice(4)}`;
        } else {
            return value
        }
    };

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatch(changeStaffersInformations({ field: 'PersonalInfoBirthDate', value: formatDisplayDate(value), id: selectId }))
    };
    return (
        <>
            <div className="flex flex-col gap-[6px] rounded-[23px] p-[13px] bg-[#ECEEF1]">
                <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                    <span className=" text-[12px] font-medium text-[#9B9FAD]">Фамилия</span>
                    <input value={StaffersInformation.Surname} onInput={(e) => { dispatch(changeStaffersInformations({ id: selectId, field: 'Surname', value: e.currentTarget.value })) }} type="text" className="w-full bg-[transparent] text-[12px] font-medium text-right" />
                </div>
                <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                    <span className=" text-[12px] font-medium text-[#9B9FAD]">Имя</span>
                    <input value={StaffersInformation.Name} onInput={(e) => { dispatch(changeStaffersInformations({ id: selectId, field: 'Name', value: e.currentTarget.value })) }} type="text" className="w-full bg-[transparent] text-[12px] font-medium text-right" />
                </div>
                <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                    <span className=" text-[12px] font-medium text-[#9B9FAD]">Отчество</span>
                    <input value={StaffersInformation.MiddleName} onInput={(e) => { dispatch(changeStaffersInformations({ id: selectId, field: 'MiddleName', value: e.currentTarget.value })) }} type="text" className="w-full bg-[transparent] text-[12px] font-medium text-right" />
                </div>
            </div>

            {!passenger && <div className="flex flex-col gap-[6px] rounded-[23px] p-[13px] bg-[#ECEEF1]">
                <div className="flex items-center gap-[20px] justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                    <span className="text-[#9B9FAD] text-[12px] font-medium">ID</span>

                    <p className="text-[#9B9FAD] text-[12px] font-medium">
                        @<span className="text-[#007BFB]">{StaffersInformation.Username}</span>
                    </p>

                </div>
            </div>}


            <div className="flex flex-col gap-[6px] rounded-[23px] p-[13px] bg-[#ECEEF1]">
                <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                    <span className=" text-[12px] font-medium text-[#9B9FAD]">Surname</span>
                    <input value={StaffersInformation.PersonalInfoSurname ?? ''} placeholder="Не указано" onInput={(e) => { dispatch(changeStaffersInformations({ id: selectId, field: 'PersonalInfoSurname', value: e.currentTarget.value })) }} type="text" className="w-full bg-[transparent] text-[12px] font-medium text-right" />
                </div>
                <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                    <span className=" text-[12px] font-medium text-[#9B9FAD]">Name</span>
                    <input value={StaffersInformation.PersonalInfoName ?? ''} placeholder="Не указано" onInput={(e) => { dispatch(changeStaffersInformations({ id: selectId, field: 'PersonalInfoName', value: e.currentTarget.value })) }} type="text" className="w-full bg-[transparent] text-[12px] font-medium text-right" />
                </div>
                <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                    <span className="whitespace-nowrap text-[12px] font-medium text-[#9B9FAD]">Дата рождения</span>                    
                    <input value={StaffersInformation.PersonalInfoBirthDate ?? ''} placeholder="Не указано" onInput={(e: ChangeEvent<HTMLInputElement>) => { handleDateChange(e) }} type="text" className="w-full bg-[transparent] text-[12px] font-medium text-right" />
                </div>
                <InputSelect title="Пол" data={Gender} change={(id: number) => dispatch(setGender({ id, oneChoise: true }))} />
                <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                    <span className=" text-[12px] font-medium text-[#9B9FAD]">Гражданство</span>
                    <input value={StaffersInformation.PersonalInfoNationality ?? ''} placeholder="Не указано" onInput={(e) => { dispatch(changeStaffersInformations({ id: selectId, field: 'PersonalInfoNationality', value: e.currentTarget.value })) }} type="text" className="w-full bg-[transparent] text-[12px] font-medium text-right" />
                </div>
            </div>

            {!passenger && <div className="flex flex-col gap-[6px] rounded-[23px] p-[13px] bg-[#ECEEF1]">
                <div className="flex items-center gap-[20px] justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                    <span className="text-[#9B9FAD] text-[12px] font-medium">Компания</span>
                    <div className="flex items-center gap-[6px]">
                        <span className=" text-[12px] font-medium">{localStorage.getItem("CompanyName")}</span>
                        <Lock />
                    </div>
                </div>
                <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                    <span className=" text-[12px] font-medium text-[#9B9FAD]">Отдел</span>
                    <span className=" text-[12px] font-medium">{StaffersInformation.Department ?? 'Не указан'}</span>
                </div>
                <div className="flex items-center gap-[20px] justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                    <span className=" text-[12px] font-medium text-[#9B9FAD]">Email</span>
                    <span className=" text-[12px] font-medium truncate">{StaffersInformation.Email ?? 'Не указан'}</span>
                </div>
                <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                    <span className=" text-[12px] font-medium text-[#9B9FAD]">Телефон</span>
                    <input value={StaffersInformation.PhoneNumber ?? ''} onInput={() => { }} type="text" className="w-full bg-[transparent] text-[12px] font-medium text-right" />
                </div>
            </div>}

        </>
    );
};

export default FilterUser;