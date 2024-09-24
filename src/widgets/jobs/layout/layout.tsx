

const Layout = ({ component, information, navigation }: { component: JSX.Element, information?: JSX.Element , navigation?: JSX.Element  }) => {
    return (
        <main className='flex gap-[15px] h-full grow'>
            <div className="flex flex-col gap-[15px] h-full grow">
                {component}
            </div>
            <div className="flex flex-col gap-[15px] justify-between w-[300px] min-w-[300px]">
                <div className='grow rounded-[26px] bg-[#FAFAFA]'>
                    {information}
                </div>
                <div className={!navigation? 'h-[50px] rounded-[18px] bg-[#FAFAFA]' : ''}>
                    {navigation}
                </div>
            </div>


        </main>
    );
};

export default Layout;