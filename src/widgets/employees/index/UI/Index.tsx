import { SearchInput } from '@/shared/UI'
import CheckerFilter from '@/widgets/jobs/UI/CheckerFilter'
import Switcher from '@/widgets/jobs/UI/Switcher';
import { StafferCart } from '../../UI';
import { useState, useEffect } from 'react';
import { staffers } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/config/store';
import { getAccessToken } from '@/shared/utils';
import { setAccessEmployees, setStaffersDocuments, setStaffersInformations } from '../../model/index.store';


const Index = ({ select, active }: { select: Function, active: number | null }) => {

    const dispatch = useDispatch();

    const Staffers = useSelector((state: RootState) => state.employees.Staffers);

    const [search, setSearch] = useState<string>('')
    const [switcher, setSwitcher] = useState<boolean>(false)
    const [alphabet_filter, setAlphabet] = useState<boolean>(true)
    const [new_filter, setNew] = useState<boolean>(false)
    const [status_filter, setStatus] = useState<boolean>(false)
    const [online_filter, setOnline] = useState<boolean>(false)
    const [access_filter, setAccess] = useState<boolean>(false)
    const [StaffersView, setStaffersView] = useState<staffers[]>([])

    const filterStaffers = (data: staffers[]) => {
        setStaffersView(data.filter(item => {
            if (switcher) {
                return !item.IsActive
            } else {
                return item.IsActive
            }

        }))
    }

    

    useEffect(() => {
        filterStaffers(Staffers)
    }, [switcher, Staffers])

    const AccessToken = getAccessToken()
    const EmployeeId = localStorage.getItem('EmployeeId')
    const getInformation = async () => {
        const url = new URL(import.meta.env.VITE_API_URL + '/company/employees_profile/get_employees_profile_personal_information');
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
                const information:any[] = data.data
                information.forEach(item => {
                    item.PersonalInfoBirthDate = item.PersonalInfoBirthDate ? item.PersonalInfoBirthDate.split('-').reverse().join('-') : null

                    item.Type = item.PersonalInfoSurname && item.PersonalInfoName ? 'Update' : 'Create'
                })        
                console.log('information', information);
                
                dispatch(setStaffersInformations(information))        
            }
        } catch (error) {

            console.log(error);

        }

    }

    const getAccess = async () => {
        const url = new URL(import.meta.env.VITE_API_URL + '/company/employees_profile/get_employees_profile_access');
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
                
                dispatch(setAccessEmployees(data.data))
                
            }
        } catch (error) {

            console.log(error);

        }

    }

    const getDocuments = async () => {
        const url = new URL(import.meta.env.VITE_API_URL + '/company/employees_profile/get_employees_profile_documents');
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
                console.log(data.data)
                const information:any[] = data.data
                // information.forEach(item => {
                                    
                // })  
                dispatch(setStaffersDocuments(information))
            }
        } catch (error) {

            console.log(error);

        }

    }

    useEffect(() => {
        getInformation()
        getAccess()
        getDocuments()
    }, [])
    

    

    return (
        <>

            <div className="p-[20px] rounded-[26px] bg-[#FAFAFA] flex flex-col gap-[10px]">
                <SearchInput value={search} change={setSearch} placeholder='Поиск сотрудника' />
                <div className="flex gap-[10px] items-center">
                    <Switcher items={['Действительные', 'Архив']} change={setSwitcher} checked={switcher} />
                    <CheckerFilter change={setAlphabet} title='По алфавиту' active={alphabet_filter} />
                    {!switcher && <CheckerFilter change={setStatus} title='По статусу' active={status_filter} />}
                    <CheckerFilter change={setNew} title='Сначала новые' active={new_filter} />
                    {!switcher && <CheckerFilter change={setOnline} title='Онлайн' active={online_filter} />}
                    {!switcher && <CheckerFilter change={setAccess} title='Только с доступом' active={access_filter} />}
                </div>
            </div>

            <div className="p-[20px] rounded-[26px] bg-[#FAFAFA] flex flex-col gap-[20px] grow">
                <div>
                    <span className='text-[25px] font-medium'>Сотрудники</span>
                </div>
                <div className="flex flex-col gap-[10px]">
                    {
                        StaffersView.map((item) => (
                            <StafferCart online={item.id === Number(EmployeeId) ? true : item.online} select={select} id={item.id} active={active} viewMessage={true} lastVisite={item.LastOnline} key={item.id} MiddleName={item.MiddleName} Surname={item.Surname} Name={item.Name} speciality={item.PermissionsClassName} archive={!item.IsActive} />
                        ))
                    }
                </div>
            </div>

        </>
    );
};

export { Index };
