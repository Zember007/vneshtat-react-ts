import SectionsImg from "@/assets/icons/sections.svg?react";
import RouteImg from "@/assets/icons/route.svg?react";
import TeamImg from "@/assets/icons/team.svg?react";
import CloseImg from '@/assets/icons/cross.svg?react'

import { FilterUsers } from '../../UI';
import { getAccessToken } from "@/shared/utils";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/config/store";



const IndexInfornation = ({ selectedStafferId, close }: { selectedStafferId: number | null, close: Function }) => {

    const Staffers = useSelector((state: RootState) => state.employees.Staffers);
    const selectedStaffer = Staffers.find(item => item.id === selectedStafferId)

    const EmployeeId = localStorage.getItem('EmployeeId')
    const AccessToken = getAccessToken()

    const [information, setInformation] = useState<any>(null)

    const getInformation = async () => {
        const url = new URL(import.meta.env.VITE_API_URL + '/company/employees_profile/get_employees_and_department_summary');
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
                setInformation(data.data)
            }
        } catch (error) {

            console.log(error);

        }

    }

    useEffect(() => {
        getInformation()
    },[])




    return (
        <div className="p-[20px] flex flex-col gap-[10px] h-full">
            {
                !selectedStaffer ? (
                    <>
                        <div className="flex items-center justify-between border-b-[#E5E7EA] border-solid border-0 border-b pb-[10px]">
                            <span className="font-medium ">Информация</span>
                            <button onClick={() => { close() }}>
                                <CloseImg className="*:fill-[#BDBFC7] h-[18px] w-[18px]" />
                            </button>
                        </div>
                        {information && <div className="rounded-[23px] p-[13px] flex flex-col gap-[10px] bg-[#ECEEF1]">
                            <span className="text-[12px] font-medium">Сводка</span>
                            <div className="flex flex-col gap-[10px] p-[13px] rounded-[15px] bg-[#FAFAFA]">
                                <div className="flex items-center gap-[5px]">
                                    <TeamImg className="h-[18px] w-[18px]"/>
                                    <span className="text-[11px] font-normal">{information.Employees} сотрудников</span>
                                </div>
                                <div className="flex items-center gap-[5px]">
                                    <TeamImg className="*:fill-[#007BFB] h-[18px] w-[18px]" />
                                    <span className="text-[11px] font-normal">{information.EmployeesOnline} сотрудников онлайн</span>
                                </div>
                                <div className="flex items-center gap-[5px]">
                                    <RouteImg className="h-[18px] w-[18px]"/>
                                    <span className="text-[11px] font-normal">{information.EmployeesInTraveling} сотрудников в поездках</span>
                                </div>
                                <div className="flex items-center gap-[5px]">
                                    <SectionsImg className="h-[18px] w-[18px]"/>
                                    <span className="text-[11px] font-normal">{information.Departments} отдела</span>
                                </div>
                            </div>
                        </div>}
                    </>
                )
                    :
                    (
                        <FilterUsers selectId={selectedStafferId} close={close} passenger={false} />
                    )
            }
        </div>
    );
};

export { IndexInfornation };