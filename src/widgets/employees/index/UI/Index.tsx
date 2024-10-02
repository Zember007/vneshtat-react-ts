import SearchInput from '@/widgets/jobs/UI/SearchInput'
import CheckerFilter from '@/widgets/jobs/UI/CheckerFilter'
import Switcher from '@/widgets/jobs/UI/Switcher';
import { StafferCart } from '../../UI'; 
import { useState, useEffect } from 'react';
import { Staffers } from '../../utils';

interface staffers {
    id: number;
    name: string;
    speciality: string;
    archive: boolean;
    lastVisite: Date;
    online: boolean;
}


const Index = ({ select, active }: { select: Function, active: number | null }) => {



    const [search, setSearch] = useState<string>('')
    const [switcher, setSwitcher] = useState<boolean>(false)
    const [alphabet_filter, setAlphabet] = useState<boolean>(true)
    const [new_filter, setNew] = useState<boolean>(false)
    const [status_filter, setStatus] = useState<boolean>(false)
    const [online_filter, setOnline] = useState<boolean>(false)
    const [access_filter, setAccess] = useState<boolean>(false)
    const [StaffersView, setStaffersView] = useState<Array<staffers>>([])

    const filterStaffers = (data: Array<staffers>) => {
        setStaffersView(data.filter(item => {
            if (switcher) {
                return item.archive
            } else {
                return !item.archive
            }

        }))
    }

    useEffect(() => {
        filterStaffers(Staffers)
    }, [switcher])



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
                            <StafferCart select={select} id={item.id} active={active} viewOnline={true} viewMessage={true} lastVisite={item.lastVisite} online={item.online} key={item.id} name={item.name} speciality={item.speciality} archive={item.archive} />
                        ))
                    }
                </div>
            </div>

        </>
    );
};

export { Index };