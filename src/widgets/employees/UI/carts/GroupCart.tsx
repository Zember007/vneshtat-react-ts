import clsx from "clsx";


interface props {
    name: string;
    manager?: string;
    staffers: string;
    icon: JSX.Element;
    id: number;
    active?: number | null;
    select: Function;
}

const GroupCart = ({ name, manager, staffers, icon, active, id, select }: props) => {



    return (
        <div className="flex gap-[10px] items-center">

            <div onClick={() => { active === id ? select(null) : select(id) }} className={clsx(" transition-all cursor-pointer grow flex items-center justify-between bg-[#ECEEF1] px-[25px] py-[18px] rounded-[20px]", active === id && '!bg-[#121212]')}>

                <div className="flex gap-[15px] items-center">
                    <span className={clsx('transition-all font-medium', active === id && 'text-[#FAFAFA]')}>{name}</span>
                    {
                        manager && <span className='font-medium text-[#9B9FAD]'>{manager}</span>
                    }
                </div>

                <span className='font-medium text-[#9B9FAD]'>{staffers}</span>

            </div>

            <button className='w-[35px] h-[35px] rounded-[11px] flex items-center justify-center bg-[#ECEEF1]'>
                {icon}
            </button>

        </div>
    );
};

export { GroupCart };