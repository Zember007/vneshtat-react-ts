import { CountdownCircle } from "@/shared/UI";
import CrossImg from "@/assets/icons/cross.svg?react";;


import UserImg from '@/assets/icons/user.svg?react'
import TravelPolicyImg from '@/assets/icons/travel-policy.svg?react'
import InputSelect from '@/widgets/jobs/UI/InputSelect';
import clsx from "clsx";
import { useEffect, useState } from "react";
import FilterTravel from "./FilterTravel";
import { addSectionEmployee, changeSection, delSectionEmployee } from "../../model/index.store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/config/store";
import TrashImg from '@/assets/icons/trash.svg?react'
import PlusImg from '@/assets/icons/plus.svg?react'
import { getAccessToken } from "@/shared/utils";

const FilterSections = ({ selectedSectionId }: { selectedSectionId: number | null }) => {

    const dispatch = useDispatch();

    const Section = useSelector((state: RootState) => state.employees.SectionsInformation).find(item => item.id === selectedSectionId);

    const filterNav = [
        {
            Img: UserImg,
            code: 'user'
        },
        {
            Img: TravelPolicyImg,
            code: 'travel-policy'
        }
    ]

    const [activeFilter, setActiveFilter] = useState<string>('user')
    const [employeeAdd, setEmployeeAdd] = useState<boolean>(false)


    const employees = Section?.Employees ?? []

    return (
        <>
            <div className="flex gap-[10px]">
                {
                    filterNav.map(item => (
                        <button onClick={() => { setActiveFilter(item.code) }} className={clsx('w-[35px] h-[35px] transition-all duration-300 flex items-center justify-center rounded-[11px] bg-[#ECEEF1]', activeFilter == item.code && '!bg-[#121212]')}>
                            <item.Img className={clsx('w-[19px] h-[19px] *:duration-300 *:transition-all', activeFilter === item.code && '*:fill-[#FAFAFA]', activeFilter !== item.code && '*:fill-[#121212]')} />
                        </button>
                    ))
                }
            </div>
            <div className="flex items-center justify-between border-b-[#E5E7EA] border-solid border-0 border-b pb-[10px]"></div>
            <div className="flex flex-col gap-[10px] justify-between grow h-full overflow-y-auto scroll max-h-[calc(100vh-330px)]">
                {activeFilter === 'user' ?
                    (
                        <>
                            <div className="flex flex-col gap-[10px]">
                                <span className='mt-[5px] font-medium'>Название</span>
                                <div className="flex flex-col gap-[6px] rounded-[23px] p-[13px] bg-[#ECEEF1]">
                                    <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                                        <input value={Section?.Name ?? ''} placeholder='Название отдела'
                                            onInput={(e) => { dispatch(changeSection({ id: Section?.id, field: 'Name', value: e.currentTarget.value })) }}
                                            type="text" className="w-full bg-[transparent] text-[12px] font-medium" />
                                    </div>
                                </div>
                                <span className='mt-[5px] font-medium'>Руководитель отдела</span>
                                <div className="flex flex-col gap-[6px] rounded-[23px] p-[13px] bg-[#ECEEF1]">
                                    <InputSelect data={employees} activeId={Section?.Supervisor?.id} change={(id: number) => { if (Section?.Supervisor?.id !== id) dispatch(changeSection({ id: Section?.id, field: 'Supervisor', value: Section?.Employees?.find(item => item.id === id) })) }} />
                                </div>
                                <span className='mt-[5px] font-medium'>Сотрудники отдела</span>
                                <div className="flex flex-col gap-[6px]">
                                    {
                                        Section?.Employees && Section?.Employees.map(item => (
                                            <CartEmployee name={item.Name} surname={item.Surname} middlename={item.MiddleName} id={item.id} departamentId={Section.id} />
                                        ))
                                    }
                                    {employeeAdd &&
                                        <CartEmployee add={() => { setEmployeeAdd(false) }} departamentId={Section?.id} />
                                    }
                                </div>
                            </div>

                            <button
                                onClick={() => { setEmployeeAdd(true) }}
                                className='rounded-[23px] border border-solid border-[#E5E7EA] p-[13px] flex justify-between items-center'>
                                <span className='text-[#787B86] text-[12px] font-normal'>Добавить сотрудника</span>
                                <PlusImg className='w-[14px] h-auto' />
                            </button>
                        </>
                    ) :
                    (
                        <FilterTravel />
                    )
                }

            </div >
        </>
    );
};





interface props {
    id?: number;
    name?: string;
    surname?: string;
    middlename?: string;
    add?: Function;
    departamentId?: number;
}

const CartEmployee = (props: props) => {

    const dispatch = useDispatch();

    const [deleteCountdown, setDeleteCountdown] = useState<number | null>(null)
    const [searchEmployee, setSearchEmployee] = useState<string>('')

    useEffect(() => {

        if (deleteCountdown === 0 && props.id) {
            DelEmployee(props.id)
        }

        if (!deleteCountdown) {
            return;
        }

        const countdownInterval = setInterval(() => {


            if (deleteCountdown !== 0) {
                setDeleteCountdown(deleteCountdown - 1)
            }
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, [deleteCountdown]);

    const cancelDelete = () => {
        setDeleteCountdown(null);
    }

    const Staffers = useSelector((state: RootState) => state.employees.Staffers);

    const Staffers_find = Staffers.filter(item => {
        if (searchEmployee.length > 0) {
            let data = searchEmployee.split(' ')
            let flag = 0
            data.map(itemSearch => {
                if (item.Name.toLocaleLowerCase().includes(itemSearch.toLocaleLowerCase()) || item.Surname.toLocaleLowerCase().includes(itemSearch.toLocaleLowerCase()) || item.MiddleName.toLocaleLowerCase().includes(itemSearch.toLocaleLowerCase())) {
                    flag = 1
                }
            })

            if (flag) {
                return true
            }
        }
        return false
    })

    const AccessToken = getAccessToken()
    const EmployeeId = localStorage.getItem('EmployeeId')




    const DelEmployee = async (id: number) => {
        const formdata = new FormData();

        formdata.append('EmployeeId', EmployeeId ?? '')
        formdata.append('DepartmentsEmployeeId', id.toString())

        try {
            const res = await fetch(import.meta.env.VITE_API_URL + '/company/employees_profile/delete_employees_profile_from_department', {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${AccessToken}`
                },
                body: formdata
            });
            const data = await res.json();
            if (data.status === "error") {
                console.log("error", data);
            }

            if (data.status === "success") {
                console.log(data);
                dispatch(delSectionEmployee({ id: props.departamentId, id_employee: id }))
            }

        } catch (error) {

            console.log(error);

        }
    }

    return (
        <div className="relative w-full">
            <div className={`w-full flex gap-2.5`}>
                <div className="min-w-9 h-9  flex justify-center items-center rounded-full bg-secondary">
                    <h3 className="text-xs font-medium uppercase">
                        {props.surname && props.name &&
                            <>
                                {props.surname[0] + props.name[0]}
                            </>
                        }
                    </h3>
                </div>
                <div
                    className="grow bg-secondary rounded-primary flex items-center justify-between gap-1 py-2 px-2.5"
                >
                    {deleteCountdown ? (
                        <div className="flex items-center justify-between grow" onClick={(e) => {
                            e.stopPropagation();
                            cancelDelete();
                        }}>
                            <h3 className="text-xs font-medium text-[#FF64A3]">
                                Отменить удаление
                            </h3>
                            <button>
                                <CrossImg className="red-fill min-w-4 min-h-4" />
                            </button>
                        </div>
                    ) : (
                        <>
                            {!props.add ?
                                <h3 className="text-xs font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">{props.surname} {props.name} {props.middlename}</h3>
                                :
                                <input className="text-xs font-medium bg-[transparent]" value={searchEmployee} onInput={(e) => { setSearchEmployee(e.currentTarget.value) }} />
                            }
                        </>
                    )}
                </div>
                {deleteCountdown && (
                    <CountdownCircle
                        countdown={deleteCountdown}
                        onCancel={() => cancelDelete()}
                    />

                )}
                {
                    !deleteCountdown && !props.add && (
                        <button
                            onClick={() => setDeleteCountdown(5)}
                            className="min-w-5 min-h-5"
                        >
                            <TrashImg className="black-fill-hover black-stroke-hover transition" />
                        </button>
                    )
                }
            </div>
            <div className={`p-[15px] rounded-[26px] bg-[#ECEEF1] flex flex-col gap-[5px] absolute bottom-[-6px] right-0 left-0 translate-y-[100%] z-[10] transition-all duration-300 ${!Staffers_find.length && 'opacity-[0] invisible'}`}>
                {
                    Staffers_find.map(item => (
                        <button
                            onClick={() => {
                                dispatch(addSectionEmployee({
                                    id: props.departamentId, employee: {
                                        id: item.id,
                                        Surname: item.Surname,
                                        Name: item.Name,
                                        MiddleName: item.MiddleName,
                                        New: true,
                                        content: `${item.Surname} ${item.Name}`
                                    }
                                }))


                                if (props.add) props.add(true)
                            }}
                            className="px-[9px] h-[30px] flex items-center rounded-[12px] bg-primary">
                            <span className="text-[11px] font-medium leading-[1]">{item.Surname} {item.Name}</span>
                        </button>
                    ))
                }
            </div>
        </div>
    );
};


export { FilterSections };