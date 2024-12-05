import CloseImg from '@/assets/icons/close.svg?react'
import LockImg from '@/assets/icons/lock.svg?react'
import LockDoubleImg from '@/assets/icons/LockDouble.svg?react'
import HistoryImg from '@/assets/icons/history.svg?react'
import IdImg from '@/assets/icons/ID.svg?react'
import NightImg from '@/assets/icons/night.svg?react'


import { useState } from 'react'

import PasswordChange from './PasswordChange'
import PasswordFilter from './filters/PasswordFilter'
import AuthenticationFilter from './filters/AuthenticationFilter'
import AutoexitFilter from './filters/AutoexitFilter'
import IdFilter from './filters/IdFilter'
import HistoryFilter from './filters/HistoryFilter'


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
        <PasswordChange active={false} />
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
                <PasswordFilter />
            }

            {selectFilter === 'lock_double' &&
                <AuthenticationFilter />
            }

            {selectFilter === 'history' &&
                <HistoryFilter />
            }

            {selectFilter === 'ID' &&
               <IdFilter />
            }

            {selectFilter === 'night' &&
                <AutoexitFilter />
            }
        </>
    );
};

export { SecurityFilter };