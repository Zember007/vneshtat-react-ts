import SearchInput from '@/widgets/jobs/UI/SearchInput'
import CheckerFilter from '@/widgets/jobs/UI/CheckerFilter'
import Switcher from '@/widgets/jobs/UI/Switcher';
import StafferCart from '../../UI/StafferCart';
import { useState, useEffect } from 'react';

interface staffers {
    name: string;
    speciality: string;
    archive: boolean;
    lastVisite: Date;
    online: boolean;
}


const Index = () => {

    const Staffers = [
        {
            name: 'Вознесенский Иван Сергеевич',
            speciality: 'Тревел-менеджер',
            archive: false,
            online:  false,
            lastVisite: new Date()
        },
        {
            name: 'Соколова Татьяна Ивановна',
            speciality: 'Тревел-менеджер',
            archive: true,
            online: true,
            lastVisite: new Date()
        },
    ]



    const [search, setSearch] = useState<string>('')
    const [switcher, setSwitcher] = useState<boolean>(false)
    const [alphabet_filter, setAlphabet] = useState<boolean>(true)
    const [new_filter, setNew] = useState<boolean>(false)
    const [StaffersView, setStaffersView] = useState<Array<staffers>>(Staffers)

    const filterStaffers = (data:Array<staffers>) => {
        setStaffersView(data.filter(item => {
            if(switcher) {
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
                    {!switcher &&<CheckerFilter change={setNew} title='По статусу' active={new_filter} />}
                    <CheckerFilter change={setNew} title='Сначала новые' active={new_filter} />
                    {!switcher &&<CheckerFilter change={setNew} title='Онлайн' active={new_filter} />}
                    {!switcher && <CheckerFilter change={setNew} title='Только с доступом' active={new_filter} />}
                </div>
            </div>

            <div className="p-[20px] rounded-[26px] bg-[#FAFAFA] flex flex-col gap-[20px] grow">
                <div>
                    <span className='text-[25px] font-medium'>Сотрудники</span>
                </div>
                <div className="flex flex-col gap-[10px]">
                    {
                        StaffersView.map((item,index) => (
                            <StafferCart viewOnline={true} viewMessage={true} lastVisite={item.lastVisite} online={item.online} key={index} name={item.name} speciality={item.speciality} archive={item.archive}/>
                        ))
                    }
                </div>
            </div>

        </>
    );
};

export { Index };