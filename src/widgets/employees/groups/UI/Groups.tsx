import SearchInput from '@/widgets/jobs/UI/SearchInput'
import CheckerFilter from '@/widgets/jobs/UI/CheckerFilter'
import Switcher from '@/widgets/jobs/UI/Switcher';
import GroupCart from '@/widgets/jobs/UI/GroupCart'
import { useState, useEffect } from 'react';
import ArchiveImg from "@/assets/icons/archive.svg?react";

interface staffers {
    name: string;
    staffers: number;
    archive: boolean;
}


const Groups = () => {

    const groups = [
        {
            name: 'Сборная Самары по биатлону',
            staffers: 18,
            archive: false
        },
        {
            name: 'ДЮСШ №5 г. Самары',
            staffers: 34,
            archive: true
        },
    ]



    const [search, setSearch] = useState<string>('')
    const [switcher, setSwitcher] = useState<boolean>(false)
    const [alphabet_filter, setAlphabet] = useState<boolean>(true)
    const [new_filter, setNew] = useState<boolean>(false)
    const [GroupsView, setGroupsView] = useState<Array<staffers>>(groups)

    const filterGroups = (data:Array<staffers>) => {
        setGroupsView(data.filter(item => {
            if(switcher) {
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
                        GroupsView.map((item,index) => (
                            <GroupCart key={index} name={item.name} staffers={item.staffers + ' пассажиров'} icon={<ArchiveImg />}/>
                        ))
                    }
                </div>
            </div>

        </>
    );
};

export { Groups };