import ImgWrite from '@/assets/img/company/write.webp'
import { getAccessToken } from '@/shared/utils';
import { useState } from "react";

const InnCheck = ({ next }: { next: Function }) => {

    const [active, setActive] = useState<boolean>(false)
    const [inn, setInn] = useState<string>('')

    const EmployeeId = localStorage.getItem('EmployeeId')
    const AccessToken = getAccessToken()

    const getInformation = async () => {
        const url = new URL(import.meta.env.VITE_API_URL + '/company/company_profile/get_company_adding_information');
        url.searchParams.append('EmployeeId', EmployeeId || '');
        url.searchParams.append('INN', inn || '');
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${AccessToken}`
                }
            });
            const data = await res.json();
            if (data.status === "error") {
                console.log("error", data);
            }

            if (data.status === "success" && data.data) {

                console.log(data.data);


            }
        } catch (error) {

            console.log(error);

        }

    }

    return (
        <>
            <div className="flex flex-col gap-[15px] items-center grow justify-center">
                {!active && (
                    <>
                        <img src={ImgWrite} alt="write" className="mb-[10px] max-h-[100%]" />
                        <input type="text" placeholder="Введите ИНН" value={inn} onInput={(e) => {setInn(e.currentTarget.value)}} className="border-[#ECEEF1] border border-solid bg-[transparent] px-[30px] py-[14px] text-[18px] text-center font-medium rounded-[15px] placeholder:text-[#787B86]" />
                        <p className="text-center text-[18px]">
                            Напишите ИНН вашей компании <br />
                            и алгоритм подставит оставшиеся данные
                        </p>
                    </>
                )}

                {active && (
                    <>

                        <div className='flex flex-col gap-[10px] max-w-[520px]'>
                            <div className="grid grid-cols-2">
                                <span className='text-[18px] font-medium text-[#9B9FAD]'>Название компании</span>
                                <input type="text" value={'ООО “Альфа Самара”'} className="w-full border-[#ECEEF1] border border-solid bg-[transparent] px-[30px] py-[14px] text-[18px] text-center font-medium rounded-[15px] placeholder:text-[#787B86]" />
                            </div>
                            <div className="grid grid-cols-2">
                                <span className='text-[18px] font-medium text-[#9B9FAD]'>ИНН</span>
                                <input type="text" value={'044525225'} className="w-full border-[#ECEEF1] border border-solid bg-[transparent] px-[30px] py-[14px] text-[18px] text-center font-medium rounded-[15px] placeholder:text-[#787B86]" />
                            </div>
                            <div className="grid grid-cols-2">
                                <span className='text-[18px] font-medium text-[#9B9FAD]'>ОГРН</span>
                                <input type="text" value={'483904284908'} className="w-full border-[#ECEEF1] border border-solid bg-[transparent] px-[30px] py-[14px] text-[18px] text-center font-medium rounded-[15px] placeholder:text-[#787B86]" />
                            </div>
                            <div className="grid grid-cols-2">
                                <span className='text-[18px] font-medium text-[#9B9FAD]'>ОКПО</span>
                                <input type="text" value={'23409328493'} className="w-full border-[#ECEEF1] border border-solid bg-[transparent] px-[30px] py-[14px] text-[18px] text-center font-medium rounded-[15px] placeholder:text-[#787B86]" />
                            </div>
                        </div>

                        <p className="text-center text-[14px] text-[#787B86] mt-[5px]">
                            Данные подставлены автоматически
                        </p>
                    </>
                )}
            </div>
            <div className="pt-[20px]  border-[#ECEEF1] border-0 border-t border-solid">
                {!active && (<button onClick={() => getInformation()} className='w-full bg-[#292933] px-[60px] py-[15px] rounded-[16px] text-primary text-[18px] font-medium'>Найти реквизиты</button>)}
                {active && (
                    <div className='flex gap-[10px]'>
                        <button onClick={() => setActive(false)} className='w-full bg-[#ECEEF1] px-[60px] py-[15px] rounded-[16px] text-[18px] font-medium text-[#787B86]'>Назад</button>
                        <button onClick={() => next()} className='w-full bg-[#292933] px-[60px] py-[15px] rounded-[16px] text-primary text-[18px] font-medium'>Далее</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default InnCheck;