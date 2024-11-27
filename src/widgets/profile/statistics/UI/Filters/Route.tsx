import EditImg from '@/assets/icons/edit.svg?react'

const Route = () => {
    return (
        <div className="bg-[#ECEEF1] rounded-[23px] p-[13px] flex flex-col gap-[10px]">
            <span className='text-[14px] font-medium'>Февраль 2024</span>
            <div className="flex flex-col gap-[6px]">
                <div className="py-[8px] px-[10px] rounded-[13px] bg-primary flex items-center justify-between">

                    <div className="flex items-center gap-[5px]">
                        <span className='text-[12px] font-medium'>Норильск</span>
                        <button>
                            <EditImg className='w-[14px] h-[14px] *:fill-[#BDBFC7]' />
                        </button>
                    </div>

                    <span className='text-[#9B9FAD] text-[12px] font-medium'>01.02-06.02</span>
                </div>
            </div>
        </div>
    );
};

export default Route;