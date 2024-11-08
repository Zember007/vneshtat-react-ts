import {SearchInput} from '@/shared/UI'
import CheckerFilter from '@/widgets/jobs/UI/CheckerFilter'
import Switcher from '@/widgets/jobs/UI/Switcher';
import { GroupCart } from '../../UI'
import { useState, useEffect } from 'react';
import ArchiveImg from "@/assets/icons/archive.svg?react";
import ArchiveReverseImg from "@/assets/icons/archive_reverse.svg?react";
import { getAccessToken } from '@/shared/utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/config/store';
import { groups } from '../../utils';
import { changeGroup, setGroups, setGroupsInformation } from '../../model/index.store';





const Groups = ({ select, active }: { select: Function, active: number | null }) => {

    const dispatch = useDispatch()

    const groups = useSelector((state: RootState) => state.employees.Groups);



    const [search, setSearch] = useState<string>('')
    const [switcher, setSwitcher] = useState<boolean>(false)
    const [alphabet_filter, setAlphabet] = useState<boolean>(true)
    const [new_filter, setNew] = useState<boolean>(false)
    const [GroupsView, setGroupsView] = useState<Array<groups>>([])

    const filterGroups = (data: Array<groups>) => {
        setGroupsView(data.filter(item => {
            if (!switcher) {
                return item.IsActive
            } else {
                return !item.IsActive
            }

        }))
    }

    useEffect(() => {
        filterGroups(groups)
    }, [switcher, groups])

    const EmployeeId = localStorage.getItem('EmployeeId')
    const AccessToken = getAccessToken()

    const getGroups = async () => {
        const url = new URL(import.meta.env.VITE_API_URL + '/company/employees_profile/get_company_passengers_group');
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

                console.log(data.data);
                dispatch(setGroups(data.data))


            }
        } catch (error) {

            console.log(error);

        }

    }

    // const deleteSection = async (id: number) => {
        

    //     const formdata = new FormData();

    //     formdata.append('EmployeeId', EmployeeId ?? '')
    //     formdata.append('DepartmentId', id.toString())

    //     try {
    //         const res = await fetch(import.meta.env.VITE_API_URL + '/company/employees_profile/delete_employees_profile_department', {
    //             method: "DELETE",
    //             headers: {
    //                 Authorization: `Bearer ${AccessToken}`
    //             },
    //             body: formdata
    //         });
    //         const data = await res.json();
    //         if (data.status === "error") {
    //             console.log("error", data);
    //         }

    //         if (data.status === "success") {
    //             console.log(data);
    //             dispatch(delSection(id))
    //         }

    //     } catch (error) {

    //         console.log(error);

    //     }
    // }

    const getInformation = async () => {

        const url = new URL(import.meta.env.VITE_API_URL + '/company/employees_profile/get_company_passengers_group_info');
        url.searchParams.append('EmployeeId', EmployeeId?.toString() ?? '');

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

                console.log(data.data);

                const information: any[] = data.data

                information.forEach(el => {

                    el.Supervisor.content = `${el.Supervisor.Surname} ${el.Supervisor.Name}`

                    const Passengers: any[] = el.Passengers
                    Passengers.forEach(el => {
                        el.content = `${el.Surname} ${el.Name}`
                    })
                })

                dispatch(setGroupsInformation(data.data))
            }
        } catch (error) {

            console.log(error);

        }

    }

    useEffect(() => {
        getGroups()
        getInformation()
    }, [])

    const ArchiveMove = async (id: number, active?: boolean) => {

        const formdata = new FormData();

        formdata.append('EmployeeId', EmployeeId ?? '')
        

        formdata.append('GroupId', id.toString())


        try {
            const res = await fetch(import.meta.env.VITE_API_URL + '/company/employees_profile/change_status_company_passengers_group' , {
                method: "PATCH",
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
                
                dispatch(changeGroup({id: id, field:'IsActive', value: !active}))
            }

        } catch (error) {

            console.log(error);

        }

    }



    return (
        <>



            <div className="p-[20px] rounded-[26px] bg-[#FAFAFA] flex flex-col gap-[10px]">
                <SearchInput value={search} change={setSearch} placeholder='Поиск сотрудника' />
                <div className="flex gap-[10px] items-center">
                    <Switcher items={['Действительные', 'Архив']} change={setSwitcher} checked={switcher} />
                    <CheckerFilter change={setAlphabet} title='По алфавиту' active={alphabet_filter} />
                    <CheckerFilter change={setNew} title='Сначала новые' active={new_filter} />
                </div>
            </div>

            <div className="p-[20px] rounded-[26px] bg-[#FAFAFA] flex flex-col gap-[20px] grow">
                <div>
                    <span className='text-[25px] font-medium'>Группы пассажиров</span>
                </div>
                <div className="flex flex-col gap-[10px]">
                    
                    {
                        GroupsView.map(item => (
                            <GroupCart Delete={() => {ArchiveMove(item.id, item.IsActive)}} id={item.id} select={select} active={active} key={item.id} name={item.Name} staffers={item.PassengersCount + ' пассажиров'} icon={item.IsActive ? <ArchiveImg /> : <ArchiveReverseImg />} />
                        ))
                    }
                </div>
            </div>

        </>
    );
};

export { Groups };