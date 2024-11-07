import { SearchInput } from '@/shared/UI'
import { GroupCart } from '../../UI'
import { useEffect, useState } from 'react';
import TrashImg from "@/assets/icons/trash.svg?react";
import { getAccessToken } from '@/shared/utils';
import { RootState } from '@/app/config/store';
import { useDispatch, useSelector } from 'react-redux';
import { delSection, setSections, setSectionsInformation } from '../../model/index.store';

const Sections = ({ select, active }: { select: Function, active: number | null }) => {

    const dispatch = useDispatch()

    const Sections = useSelector((state: RootState) => state.employees.Sections);

    const [search, setSearch] = useState<string>('')

    const EmployeeId = localStorage.getItem('EmployeeId')
    const AccessToken = getAccessToken()

    const getSections = async () => {
        const url = new URL(import.meta.env.VITE_API_URL + '/company/employees_profile/get_employees_profile_departments');
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
                dispatch(setSections(data.data))


            }
        } catch (error) {

            console.log(error);

        }

    }

    const deleteSection = async (id: number) => {
        

        const formdata = new FormData();

        formdata.append('EmployeeId', EmployeeId ?? '')
        formdata.append('DepartmentId', id.toString())

        try {
            const res = await fetch(import.meta.env.VITE_API_URL + '/company/employees_profile/delete_employees_profile_department', {
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
                dispatch(delSection(id))
            }

        } catch (error) {

            console.log(error);

        }
    }

    const getInformation = async () => {

        const url = new URL(import.meta.env.VITE_API_URL + '/company/employees_profile/get_employees_profile_departments_info');
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

                    const Employees: any[] = el.Employees
                    Employees.forEach(el => {
                        el.content = `${el.Surname} ${el.Name}`
                    })
                })

                dispatch(setSectionsInformation(data.data))
            }
        } catch (error) {

            console.log(error);

        }

    }

    useEffect(() => {
        getSections()
        getInformation()
    }, [])


    return (
        <>



            <div className="p-[20px] rounded-[26px] bg-[#FAFAFA]">
                <SearchInput value={search} change={setSearch} placeholder='Название отдела или ФИО сотрудника' />
            </div>

            <div className="p-[20px] rounded-[26px] bg-[#FAFAFA] flex flex-col gap-[20px] grow">
                <div>
                    <span className='text-[25px] font-medium'>Отделы</span>
                </div>
                <div className="flex flex-col gap-[10px]">
                    {
                        Sections.map((item) => (
                            <GroupCart
                                Delete={() => { deleteSection(item.id) }}
                                select={select} active={active} id={item.id} key={item.id} name={item.Name} staffers={`${item.EmployeesCount ?? 0} сотрудников`} supervisor={item.Supervisor} icon={<TrashImg />} />
                        ))
                    }
                </div>
            </div>

        </>
    );
};

export { Sections };