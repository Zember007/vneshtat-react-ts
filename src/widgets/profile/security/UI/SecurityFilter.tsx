import CloseImg from '@/assets/icons/close.svg?react'
import LockImg from '@/assets/icons/lock.svg?react'
import LockDoubleImg from '@/assets/icons/LockDouble.svg?react'
import HistoryImg from '@/assets/icons/history.svg?react'
import IdImg from '@/assets/icons/ID.svg?react'
import NightImg from '@/assets/icons/night.svg?react'
import SuccessBlueImg from '@/assets/icons/success-blue.svg?react'
import DesktopImg from '@/assets/icons/desktop.svg?react'
import MobileImg from '@/assets/icons/mobile.svg?react'
import SberbankImg from '@/assets/icons/sberbank.svg?react'
import GosuslugiImg from '@/assets/icons/gosuslugi.svg?react'
import AlphaImg from '@/assets/icons/alpha.svg?react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app/config/store'
import InputSelect from '@/widgets/jobs/UI/InputSelect'
import { setIdleTime, setSwitchExit } from '../../model/profile.store'


const SecurityFilter = ({ close }: { close: Function }) => {

    const dispatch = useDispatch()

    const switchExit = useSelector((state: RootState) => state.profile.autoExitSwith);
    const idleTime = useSelector((state: RootState) => state.profile.idleTime);

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
                    <span className="font-medium">
                        {
                            selectFilter === 'lock' ?
                                'Пароль'
                                : selectFilter === 'lock_double' ?
                                    'Двухфакторная аутентификация'
                                    : selectFilter === 'history' ?
                                        'История активности'
                                        : selectFilter === 'ID' ?
                                            'Другие способы входа'
                                            :
                                            'Автовыход'
                        }
                    </span>
                    <button
                        onClick={() => { close() }}>
                        <CloseImg className='*:fill-[#BDBFC7] w-[18px] h-[18px]' />
                    </button>
                </div>
                <p className='text-[#787B86] text-[12px] pr-[35px]'>
                    {selectFilter === 'lock' ?
                        'Пароль от вашего аккаунта доступен только вам. Чтобы его изменить, необходимо подтверждение через телефон или почту.'
                        : selectFilter === 'lock_double' ?
                            'Двухфакторная аутентификация (2FA) обеспечивает более надёжную защиту аккаунта. Для входа с нового устройства понадобится подтверждение через телефон.'
                            : selectFilter === 'history' ?
                                'Вам доступен список всех устройств, на которых был выполнен вход в ваш аккаунт. Нажмите на сеанс, чтобы узнать подробную информацию.'
                                : selectFilter === 'ID' ?
                                    'Войти через ID бывает проще и быстрее, чем вспоминать пароль и ждать СМС-код с подтверждением.'
                                    :
                                    'Вы можете настроить, что будет происходить с аккаунтом при длительном бездействии.'
                    }
                </p>
            </div>

            {selectFilter === 'lock' &&
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
            }

            {selectFilter === 'lock_double' &&
                <div className="flex flex-col gap-[15px] justify-between grow ">

                    <div className="flex flex-col gap-[10px] mt-[15px] h-full overflow-y-auto scroll max-h-[calc(100vh-330px)]">

                        <div className={`bg-[#ECEEF1] transition-all duration-300 rounded-[13px] flex items-center gap-[5px] justify-center py-[9px]`}>
                            <SuccessBlueImg />
                            <span className="text-[14px]">Подключено</span>
                        </div>
                        <p className='text-center text-[11px] text-[#787B86]'>
                            Для входа в ваш аккаунт одного пароля теперь недостаточно.
                        </p>
                    </div>

                    <div className="flex flex-col gap-[10px] pt-[15px] border-0 border-t border-solid border-[#D9D9D9]">
                        <button
                            className='text-[14px] text-primary bg-black rounded-[13px] py-[11px]'
                        >Отключить</button>
                        <p
                            className='text-[11px] text-[#787B86] text-center'
                        >
                            Браузеры несовершенны и ваш пароль может оказаться в открытом доступе. Дополнительная защита лишней не будет.
                        </p>
                    </div>
                </div>
            }

            {selectFilter === 'history' &&
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
            }

            {selectFilter === 'ID' &&
                <div className="flex flex-col gap-[15px] justify-between grow ">

                    <div className="flex flex-col gap-[5px] mt-[15px] h-full overflow-y-auto scroll max-h-[calc(100vh-380px)]">
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

                    <div className="flex flex-col gap-[10px] pt-[15px] border-0 border-t border-solid border-[#D9D9D9]">
                    </div>
                </div>
            }

            {selectFilter === 'night' &&
                <div className="flex flex-col gap-[15px] justify-between grow ">

                    <div className="flex flex-col gap-[10px] p-[13px] rounded-[23px] bg-[#ECEEF1]">
                        <InputSelect data={switchExit} change={(id: number) => {
                            dispatch(setSwitchExit(id))
                        }} title='Автовыход' />

                        <InputSelect data={idleTime} change={(id: number) => {
                            dispatch(setIdleTime(id))
                        }} title='Время бездействия' />
                    </div>

                    <div className="flex flex-col gap-[10px] pt-[15px] border-0 border-t border-solid border-[#D9D9D9]">
                    </div>
                </div>
            }
        </>
    );
};

export { SecurityFilter };