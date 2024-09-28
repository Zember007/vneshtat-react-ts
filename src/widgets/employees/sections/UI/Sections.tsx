import SearchInput from '@/widgets/jobs/UI/SearchInput'
import GroupCart from '@/widgets/jobs/UI/GroupCart'
import { useState } from 'react';
import TrashImg from "@/assets/icons/trash.svg?react";


const Sections = () => {

    const sections = [
        {
            name: 'Администрация',
            manager: 'Вознесенский Иван Сергеевич',
            staffers: 3
        },
        {
            name: 'Администрация',
            manager: 'Вознесенский Иван Сергеевич',
            staffers: 3
        },
    ]



    const [search, setSearch] = useState<string>('')


    

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
                        sections.map((item,index) => (
                            <GroupCart key={index} name={item.name} staffers={item.staffers + ' сотрудников'} manager={item.manager} icon={<TrashImg />}/>
                        ))
                    }
                </div>
            </div>

        </>
    );
};

export { Sections };