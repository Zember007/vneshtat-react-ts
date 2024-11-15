import { SearchInput } from '@/shared/UI'
import CheckerFilter from '@/widgets/jobs/UI/CheckerFilter'
import Switcher from '@/widgets/jobs/UI/Switcher';
import { StafferCart } from '../../UI';
import { useState, useEffect } from 'react';
import { staffers } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/config/store';
import { getAccessToken } from '@/shared/utils';
import {  setPassengersInformations } from '../../model/index.store';


const Passengers = ({ select, active }: { select: Function, active: number | null }) => {



    const dispatch = useDispatch();

    const Passengers = useSelector((state: RootState) => state.employees.Passengers);

    const [search, setSearch] = useState<string>('')
    const [switcher, setSwitcher] = useState<boolean>(false)
    const [alphabet_filter, setAlphabet] = useState<boolean>(true)
    const [new_filter, setNew] = useState<boolean>(false)
    const [StaffersView, setStaffersView] = useState<Array<staffers>>([])

    const filterStaffers = (data: Array<staffers>) => {
        setStaffersView(data.filter(item => {
            if (switcher) {
                return !item.IsActive
            } else {
                return item.IsActive
            }

        }))
    }

    useEffect(() => {
        filterStaffers(Passengers)
    }, [switcher,Passengers])

    const EmployeeId = localStorage.getItem('EmployeeId')
    const AccessToken = getAccessToken()

    const getInformation = async () => {
        const url = new URL(import.meta.env.VITE_API_URL + '/company/employees_profile/get_company_passengers_personal_info');
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
                console.log(data.data)     
                const information:any[] = data.data
                information.forEach(item => {
                    item.PersonalInfoBirthDate = item.PersonalInfoBirthDate ? item.PersonalInfoBirthDate.split('-').reverse().join('-') : null

                    item.Type = item.PersonalInfoSurname && item.PersonalInfoName ? 'Update' : 'Create'
                })        
                dispatch(setPassengersInformations(information)) 
                       
            }
        } catch (error) {

            console.log(error);

        }

    }

    useEffect(() => {
        getInformation()
    }, [])

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
                    <span className='text-[25px] font-medium'>Пассажиры</span>
                </div>
                <div className="flex flex-col gap-[10px]">
                    {
                        StaffersView.map((item, index) => (
                            <StafferCart passenger={true} id={item.id} select={select} active={active} archive={!item.IsActive} viewMessage={false} key={index} MiddleName={item.MiddleName} Surname={item.Surname} Name={item.Name} />
                        ))
                    }
                </div>
            </div>

        </>
    );
};

export { Passengers };