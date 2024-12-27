import CloseImg from '@/assets/icons/close.svg?react'

const Desktop = ({ close }: { close: Function }) => {
    return (
        <div className="flex flex-col gap-[10px] h-full">
            <div className="mt-[5px] flex items-center justify-between pb-[10px] border-0 border-b border-solid border-[#D9D9D9]">
                <span className="font-medium">Уведомления на рабочем столе</span>
                <button
                    onClick={() => { close() }}>
                    <CloseImg className='*:fill-[#BDBFC7] w-[18px] h-[18px]' />
                </button>
            </div>
            <div className="grow h-full flex flex-col justify-between">
                <div className="flex flex-col gap-[15px]">
                    <p className="text-[#787B86] text-[14px]">
                        При включении уведомлений обязательно нажмите в своем браузере “Разрешить”. Иначе они будут заблокированы.
                    </p>
                </div>
                <div className="flex items-center flex-col gap-[10px]">
                    <button
                        onClick={() => { }}
                        className="w-[255px] rounded-[18px] bg-black py-[15px]">
                        <p className="text-primary">Включить уведомления</p>
                    </button>
                    <p className="text-[#787B86] text-[12px] text-center">
                    В верхней части браузера появится окно подтверждения.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Desktop;