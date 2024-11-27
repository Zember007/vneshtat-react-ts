import CloseImg from '@/assets/icons/close.svg?react'
import LockImg from '@/assets/icons/lock.svg?react'
import LockDoubleImg from '@/assets/icons/LockDouble.svg?react'
import HistoryImg from '@/assets/icons/history.svg?react'
import IdImg from '@/assets/icons/ID.svg?react'
import NightImg from '@/assets/icons/night.svg?react'
import SuccessBlueImg from '@/assets/icons/success-blue.svg?react'
import { useState } from 'react'


const SecurityFilter = ({ close }: { close: Function }) => {

    const filters = [
        { icon: LockImg, code: 'lock' },
        { icon: LockDoubleImg, code: 'lock_double' },
        { icon: HistoryImg, code: 'history' },
        { icon: IdImg, code: 'ID' },
        { icon: NightImg, code: 'night' },
    ]

    const [selectFilter, setSelectFilter] = useState<string>('lock')

    return (
        <>
            <div className="flex gap-[10px]">
                {filters.map(item => (
                    <button
                        onClick={() => { setSelectFilter(item.code) }}
                        className={`flex items-center justify-center w-[35px] h-[35px] rounded-[11px] ${item.code === selectFilter ? 'bg-[#121212]' : 'bg-[#ECEEF1]'}`}>
                        <item.icon className={`w-[19px] h-[19px] ${item.code === selectFilter ? '*:fill-[#FAFAFA]' : '*:fill-[#121212]'}`} />
                    </button>
                ))}
            </div>


            <div className="flex flex-col gap-[10px]">
                <div className="mt-[5px] flex items-center justify-between pb-[10px] border-0 border-b border-solid border-[#D9D9D9]">
                    <span className="font-medium">Пароль</span>
                    <button
                        onClick={() => { close() }}>
                        <CloseImg className='*:fill-[#BDBFC7] w-[18px] h-[18px]' />
                    </button>
                </div>
                <p className='text-[#787B86] text-[12px] pr-[35px]'>
                    Пароль от вашего аккаунта доступен только вам. Чтобы его изменить, необходимо подтверждение через телефон или почту.
                </p>
            </div>


            <div className="flex flex-col gap-[15px] justify-between grow ">

                <div className="flex flex-col gap-[10px] mt-[15px] h-full overflow-y-auto scroll max-h-[calc(100vh-330px)]">

                    <div className={`bg-[#ECEEF1] transition-all duration-300 rounded-[13px] flex items-center gap-[5px] justify-center py-[9px]`}>
                        <SuccessBlueImg />
                        <span className="text-[14px]">Надёжный пароль</span>
                    </div>
                    <div className={`bg-[#ECEEF1] transition-all duration-300 rounded-[13px] flex items-center gap-[5px] justify-center py-[9px]`}>
                        <SuccessBlueImg />
                        <span className="text-[14px]">Обновлён 10.01.2024</span>
                    </div>
                    <p className='text-center text-[11px] text-[#787B86]'>
                        Старайтесь обновлять пароль как минимум раз в 4 месяца. Так вас будет сложнее взломать.
                    </p>
                </div>

                <div className="flex flex-col gap-[10px] pt-[15px] border-0 border-t border-solid border-[#D9D9D9]">
                    <button
                        className='text-[14px] text-primary bg-black rounded-[13px] py-[11px]'
                    >Изменить пароль</button>
                    <p
                        className='text-[11px] text-[#787B86] text-center'
                    >
                        Чтобы изменить пароль, нужно подтверждение через телефон или почту.
                    </p>
                </div>
            </div>
        </>
    );
};

export { SecurityFilter };