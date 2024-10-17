import { SearchInput, Switch } from '@/shared/UI'
import { useState } from 'react';
import TemplateCart from './TemplateCart';
import TemplateCartService from './TemplateCartService';
import { Link } from 'react-router-dom';



const TemplateAll = () => {
    
    const [archive, setArchive] = useState<boolean>(false)
    
    return (
        <>
        <div className="p-[20px] rounded-[26px] bg-primary flex flex-col gap-[20px]">
            <SearchInput change={() => { }} value={''} placeholder='Название шаблона, город, рейс, отель' />
            <Switch
                firstChild={
                    <span className='font-medium text-[12px]'>
                        Действительные
                    </span>
                }
                secondChild={
                    <span className='font-medium text-[12px]'>
                        Архив
                    </span>
                }
                isSelected={archive}
                setter={setArchive}

            />
        </div>
        <div className="p-[20px] rounded-[26px] bg-primary grow flex flex-col">
                <div className="flex flex-col gap-[9px] grow">
                    <TemplateCart />
                    {/* <TemplateCartService /> */}
                </div>

                <div className="flex flex-col gap-[12px] items-center mt-[74px] mb-[54px] text-center">
                    <Link to={'/templates/create'} className='bg-[#ECEEF1] py-[15px] rounded-[18px] w-[250px]'>
                        <p>Создать шаблон</p>
                    </Link>
                    <Link to={'#'} className='bg-[#ECEEF1] py-[15px] rounded-[18px] w-[250px]'>
                        <p>Создать из поездки</p>
                    </Link>
                </div>
        </div>

    </>
    );
};

export { TemplateAll };