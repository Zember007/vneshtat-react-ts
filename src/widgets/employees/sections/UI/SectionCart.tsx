
import TrashImg from "@/assets/icons/trash.svg?react";


interface props {
    name: string;
    manager: string;
    staffers: number;
}

const SectionCart = ({ name, manager, staffers }: props) => {



    return (
        <div className="flex gap-[10px] items-center">

            <div className="cursor-pointer grow flex items-center justify-between bg-[#ECEEF1] px-[25px] py-[18px] rounded-[20px]">

                <div className="flex gap-[15px] items-center">
                    <span className='font-medium'>{name}</span>
                    <span className='font-medium text-[#9B9FAD]'>{manager}</span>
                </div>

                <span className='font-medium text-[#9B9FAD]'>{staffers} сотрудников</span>
                
            </div>

            <button className='w-[35px] h-[35px] rounded-[11px] flex items-center justify-center bg-[#ECEEF1]'>
                <TrashImg className='w-[19px] h-auto' />
            </button>

        </div>
    );
};

export default SectionCart;