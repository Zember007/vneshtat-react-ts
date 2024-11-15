import Layout from '@/app/layouts/layout';
import { useEffect } from 'react';
import { TemplateAll, TemplateCreate, TemplateAdd } from '@/widgets/templates';
import { useLocation, useNavigate } from 'react-router-dom';

const templates = () => {

    const location = useLocation().pathname
    const navigate = useNavigate()

    useEffect(() => {


        if (location === '/templates' || location === '/templates/') {
            navigate('/templates/all')
        }

    }, [location])

    return (
        <>
            {
                !location.includes('/templates/create') ?
                    <Layout
                        component={
                            <>

                                <TemplateAll />


                            </>}
                        information={
                            <div className='h-full flex items-center justify-center px-[35px]'>
                                <p className='text-[#787B86]'>В шаблоне вы можете создавать элементы поездки и заполнять их с разной степенью подробности.</p>
                            </div>}

                        navigation={
                            <button className="rounded-[18px] bg-[#121212] py-[15px] w-full">
                                <p className="text-primary text-[16px]">Выбрать услугу</p>
                            </button>
                        }
                    />
                    : !location.includes('/templates/create/add') ?
                        <TemplateCreate />
                        :
                        <TemplateAdd />
            }
        </>
    );
};

export default templates;