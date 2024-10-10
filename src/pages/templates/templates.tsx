import Layout from '@/app/layouts/layout';
import {SearchInput} from '@/shared/UI'

const templates = () => {
    return (
        <>
            <Layout
                component={
                    <>
                    <div className="">
                        <SearchInput change={() => {}} value={''} placeholder='Название шаблона, город, рейс, отель' />
                    </div>

                    </>}
                information={
                    <>

                    </>}
                navigation={
                    <>

                    </>
                }
            />
        </>
    );
};

export default templates;