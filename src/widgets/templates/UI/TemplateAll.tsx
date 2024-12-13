import { SearchInput, Switch } from '@/shared/UI'
import { useState } from 'react';
import TemplateCart from './TemplateCart';
import TemplateCartService from './TemplateCartService';
import {  useLocation } from 'react-router-dom';
import SimpleBar from 'simplebar-react';



const TemplateAll = () => {

    const [archive, setArchive] = useState<boolean>(false)

    const location = useLocation().pathname

    const service = {
        id: 0,
        type: 'flight',
        route: {
            class: 'Эконом',
            items: [
                {
                    id: 1,
                    cityFrom: 'Москва',
                    cityBefore: 'Казань'
                }
            ]
        },
        city: null,
        team: 4,
        filters: 4,
        option: [],
    }


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
            <div className="p-[20px] rounded-[26px] bg-primary grow flex flex-col ">
                <SimpleBar className="max-h-[calc(100vh-340px)]">
                    <div className="flex flex-col gap-[9px] grow ">
                        {
                            location.includes('/templates/all') ?                                
                                <TemplateCart />
                                :
                                <TemplateCartService data={service} />
                        }

                    </div>
                </SimpleBar>

                {/* <div className="flex flex-col gap-[12px] items-center mt-[74px] mb-[54px] text-center">
                    <Link to={'/templates/create'} className='bg-[#ECEEF1] py-[15px] rounded-[18px] w-[250px]'>
                        <p>Создать шаблон</p>
                    </Link>
                    <Link to={'#'} className='bg-[#ECEEF1] py-[15px] rounded-[18px] w-[250px]'>
                        <p>Создать из поездки</p>
                    </Link>
                </div> */}
            </div>

        </>
    );
};

export { TemplateAll };