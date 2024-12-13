import SberbankImg from '@/assets/icons/sberbank.svg?react'
import GosuslugiImg from '@/assets/icons/gosuslugi.svg?react'
import AlphaImg from '@/assets/icons/alpha.svg?react'
import SimpleBar from 'simplebar-react'

const IdFilter = () => {
    return (
        <div className="flex flex-col gap-[15px] justify-between grow ">

            <SimpleBar className=' max-h-[calc(100vh-380px)]'>
                <div className="flex flex-col gap-[5px] mt-[15px] h-full">
                    <div className="bg-[#ECEEF1] rounded-[13px] p-[15px] flex items-center justify-between">
                        <div className="flex items-center gap-[10px]">
                            <div className="bg-[#FFDD2D] h-[22px] w-[22px] rounded-[50%]"></div>
                            <span className="text-[14px] font-medium">Tinkoff ID</span>
                        </div>

                        <span className={`text-[#787B86] text-[11px]`}>Не подключено</span>
                    </div>
                    <div className="bg-[#ECEEF1] rounded-[13px] p-[15px] flex items-center justify-between">
                        <div className="flex items-center gap-[10px]">
                            <SberbankImg className='w-[22px] h-[22px]' />
                            <span className="text-[14px] font-medium">Сбер ID</span>
                        </div>

                        <span className={`text-[#787B86] text-[11px]`}>Не подключено</span>
                    </div>
                    <div className="bg-[#ECEEF1] rounded-[13px] p-[15px] flex items-center justify-between">
                        <div className="flex items-center gap-[10px]">
                            <GosuslugiImg className='w-[22px] h-[22px]' />
                            <span className="text-[14px] font-medium">Госуслуги</span>
                        </div>

                        <span className={`text-[#787B86] text-[11px]`}>Не подключено</span>
                    </div>
                    <div className="bg-[#ECEEF1] rounded-[13px] p-[15px] flex items-center justify-between">
                        <div className="flex items-center gap-[10px]">
                            <AlphaImg className='w-[22px] h-[22px]' />
                            <span className="text-[14px] font-medium">Alfa ID</span>
                        </div>

                        <span className={`text-[#787B86] text-[11px]`}>Не подключено</span>
                    </div>
                </div>
            </SimpleBar>

            <div className="flex flex-col gap-[10px] pt-[15px] border-0 border-t border-solid border-[#D9D9D9]">
            </div>
        </div>
    );
};

export default IdFilter;