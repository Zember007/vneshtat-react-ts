


interface props {
    name: string;
    manager?: string;
    staffers: string;
    icon: JSX.Element;
}

const SectionCart = ({ name, manager, staffers, icon }: props) => {



    return (
        <div className="flex gap-[10px] items-center">

            <div className="cursor-pointer grow flex items-center justify-between bg-[#ECEEF1] px-[25px] py-[18px] rounded-[20px]">

                <div className="flex gap-[15px] items-center">
                    <span className='font-medium'>{name}</span>
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

export default SectionCart;