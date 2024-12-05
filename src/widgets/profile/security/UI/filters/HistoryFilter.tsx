import DesktopImg from '@/assets/icons/desktop.svg?react'
import MobileImg from '@/assets/icons/mobile.svg?react'

const HistoryFilter = () => {
    return (
        <div className="flex flex-col gap-[15px] justify-between grow ">

            <div className="flex flex-col gap-[20px] mt-[15px] h-full overflow-y-auto scroll max-h-[calc(100vh-420px)]">

                <div className="flex flex-col gap-[10px]">
                    <span className="text-[#000] font-medium">Текущий сеанс</span>
                    <div className="flex gap-[5px]">
                        <div className="grow bg-[#ECEEF1] rounded-[13px] flex gap-[10px] p-[15px] items-center">
                            <DesktopImg />
                            <span className='text-[14px] font-medium'>Windows</span>
                        </div>
                        <div className="bg-[#ECEEF1] rounded-[13px] flex flex-col gap-[2px] justify-center px-[15px]">
                            <span className='text-[11px] text-[#787B86] leading-[1]'>Yandex Browser</span>
                            <span className='text-[11px] text-[#9B9FAD] leading-[1]'>Новосибирск</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-[10px]">
                    <span className="text-[#000] font-medium">Другие сеансы</span>
                    <div className="flex flex-col gap-[5px]">
                        <div className="flex gap-[5px] bg-[#ECEEF1] rounded-[13px]">
                            <div className="grow  flex gap-[10px] p-[15px] items-center">
                                <MobileImg />
                                <span className='text-[14px] font-medium'>Xiaomi</span>
                            </div>
                            <div className=" flex flex-col gap-[2px] justify-center px-[15px]">
                                <span className='text-[11px] text-[#787B86] leading-[1]'>Google Chrome</span>
                                <span className='text-[11px] text-[#9B9FAD] leading-[1]'>Москва</span>
                            </div>
                        </div>

                        <div className="flex gap-[5px] bg-[#ECEEF1] rounded-[13px]">
                            <div className="grow  flex gap-[10px] p-[15px] items-center">
                                <MobileImg />
                                <span className='text-[14px] font-medium'>iPhone 15</span>
                            </div>
                            <div className=" flex flex-col gap-[2px] justify-center px-[15px]">
                                <span className='text-[11px] text-[#787B86] leading-[1]'>Safari</span>
                                <span className='text-[11px] text-[#9B9FAD] leading-[1]'>Москва</span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <div className="flex flex-col gap-[10px] pt-[15px] border-0 border-t border-solid border-[#D9D9D9]">
                <button
                    className='text-[14px] text-primary bg-black rounded-[13px] py-[11px]'
                >Завершить другие сеансы</button>
                <p
                    className='text-[11px] text-[#787B86] text-center'
                >
                    Выйти из аккаунта на всех устройствах, кроме этого.
                </p>
            </div>
        </div>
    );
};

export default HistoryFilter;