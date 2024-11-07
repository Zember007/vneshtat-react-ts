import clsx from "clsx";
import { section_employee } from "../../utils";


interface props {
    name: string | null;
    supervisor?: section_employee | null;
    staffers: string;
    icon: JSX.Element;
    id: number;
    active?: number | null;
    select: Function;
    Delete: Function;
}

const GroupCart = ({ name, supervisor, staffers, icon, active, id, select, Delete }: props) => {



    return (
        <div className="flex gap-[10px] items-center">

            <div onClick={() => { active === id ? select(null) : select(id) }} className={clsx(" transition-all cursor-pointer grow flex items-center justify-between bg-[#ECEEF1] px-[25px] py-[18px] rounded-[20px]", active === id && '!bg-[#121212]')}>

                <div className="flex gap-[15px] items-center">
                    <span className={clsx('transition-all font-medium', active === id && 'text-[#FAFAFA]')}>{name}</span>
                    {
                        supervisor && <span className='font-medium text-[#9B9FAD]'>Руководитель: {supervisor.Surname} {supervisor.Name}</span>
                    }
                </div>

                <span className='font-medium text-[#9B9FAD]'>{staffers}</span>

            </div>

            <button
            onClick={() => {Delete()}}
            className='w-[35px] h-[35px] rounded-[11px] flex items-center justify-center bg-[#ECEEF1]'>
                {icon}
            </button>

        </div>
    );
};

export { GroupCart };