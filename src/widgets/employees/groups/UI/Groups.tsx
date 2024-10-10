import {SearchInput} from '@/shared/UI'
import CheckerFilter from '@/widgets/jobs/UI/CheckerFilter'
import Switcher from '@/widgets/jobs/UI/Switcher';
import { GroupCart } from '../../UI'
import { useState, useEffect } from 'react';
import ArchiveImg from "@/assets/icons/archive.svg?react";
import { groups } from '../../utils';


interface groups {
    id: number;
    name: string;
    archive: boolean;
    staffers: number;
}


const Groups = ({ select, active }: { select: Function, active: number | null }) => {

    



    const [search, setSearch] = useState<string>('')
    const [switcher, setSwitcher] = useState<boolean>(false)
    const [alphabet_filter, setAlphabet] = useState<boolean>(true)
    const [new_filter, setNew] = useState<boolean>(false)
    const [GroupsView, setGroupsView] = useState<Array<groups>>([])

    const filterGroups = (data: Array<groups>) => {
        setGroupsView(data.filter(item => {
            if (switcher) {
                return item.archive
            } else {
                return !item.archive
            }

        }))
    }

    useEffect(() => {
        filterGroups(groups)
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
                    <span className='text-[25px] font-medium'>Группы пассажиров</span>
                </div>
                <div className="flex flex-col gap-[10px]">
                    {
                        GroupsView.map(item => (
                            <GroupCart id={item.id} select={select} active={active} key={item.id} name={item.name} staffers={item.staffers + ' пассажиров'} icon={<ArchiveImg />} />
                        ))
                    }
                </div>
            </div>

        </>
    );
};

export { Groups };