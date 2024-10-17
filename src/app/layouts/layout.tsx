import clsx from "clsx";

const Layout = ({ component, information, navigation, links, extraClassBar }: { links?: JSX.Element | boolean; component?: JSX.Element | boolean | string, information?: JSX.Element | boolean | string, navigation?: JSX.Element | boolean, extraClassBar?:string }) => {
    return (
        <main className='flex gap-[15px] h-full grow'>
            <div className={"flex flex-col gap-[15px] h-full grow"}>
                {links}
                {(typeof component == 'string' ||  !component )? (
                    <div className={'rounded-[26px] grow bg-[#FAFAFA] flex items-center justify-center'}>
                        <span className="font-normal text-[#787B86]">
                            {component}
                        </span>
                    </div>
                ) : component}
            </div>
            <div className={"flex flex-col gap-[15px] justify-between w-[300px] "+extraClassBar}>
                <div className={clsx('grow rounded-[26px] bg-[#FAFAFA]', typeof information == 'string' && 'flex items-center justify-center')}>
                    {information}
                </div>
                <div className={!navigation ? 'h-[50px] rounded-[18px] bg-[#FAFAFA]' : ''}>
                    {navigation}
                </div>
            </div>


        </main>
    );
};

export default Layout;