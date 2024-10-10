import {SearchInput} from '@/shared/UI'
import CheckerFilter from '@/widgets/jobs/UI/CheckerFilter'
import Switcher from '@/widgets/jobs/UI/Switcher';
import { StafferCart } from '../../UI';
import { useState, useEffect } from 'react';
import { passengers } from '../../utils';

interface staffers {
    id: number;
    name: string;
    speciality: string;
    archive: boolean;
    lastVisite: Date;
    online: boolean;
}


const Passengers = ({ select, active }: { select: Function, active: number | null }) => {

    



    const [search, setSearch] = useState<string>('')
    const [switcher, setSwitcher] = useState<boolean>(false)
    const [alphabet_filter, setAlphabet] = useState<boolean>(true)
    const [new_filter, setNew] = useState<boolean>(false)
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
        filterStaffers(passengers)
    }, [switcher])



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
                            <StafferCart id={item.id} select={select} active={active} archive={item.archive} viewOnline={false} viewMessage={false} key={index} name={item.name} />
                        ))
                    }
                </div>
            </div>

        </>
    );
};

export { Passengers };