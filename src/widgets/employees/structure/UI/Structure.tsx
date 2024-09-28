import SearchInput from '@/widgets/jobs/UI/SearchInput'
import GroupCart from '@/widgets/jobs/UI/GroupCart'
import { useState } from 'react';
import TrashImg from "@/assets/icons/trash.svg?react";


const Structure = () => {

    const structure = [
        {
            name: 'Должность'
        },
        {
            name: 'Администрация'
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
                    <span className='text-[25px] font-medium'>Своя структура</span>
                </div>
                <div className="flex flex-col gap-[10px]">
                    {
                        structure.map((item,index) => (
                            <GroupCart key={index} name={item.name} staffers={'Свое значение'} icon={<TrashImg />}/>
                        ))
                    }
                </div>
            </div>

        </>
    );
};

export { Structure };