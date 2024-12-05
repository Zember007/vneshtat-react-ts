import SuccessBlueImg from '@/assets/icons/success-blue.svg?react'

const AuthenticationFilter = () => {
    return (
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
    );
};

export default AuthenticationFilter;