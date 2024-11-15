import ImgWrite from '@/assets/img/company/write.webp'
import { getAccessToken } from '@/shared/utils';
import { useEffect, useState } from "react";

const InnCheck = ({ information, next }: { next: Function; information: any }) => {

    const [active, setActive] = useState<boolean>(false)
    const [inn, setInn] = useState<string>('')



    const EmployeeId = localStorage.getItem('EmployeeId')
    const AccessToken = getAccessToken()

    const [companyInformation, setCompanyInformation] = useState({
        EmployeeId: EmployeeId,
        LegalName: '',
        ShortName: '',
        Inn: '',
        OGRN: '',
        OKPO: '',
        Kpp: '',
        LegalAddress: '',
        PhysicalAddress: '',
        ShortFIO: '',
        FIO: '',
        PassportData: '',
    })

    const getInformation = async () => {
        const url = "http://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    Authorization: `Token 02a17618b3aa50fb0a41ab66ad1b5b1c12f7cd18`
                },
                body: JSON.stringify({ query: inn })
            });
            const data = await res.json();
            if (data.status === "error") {
                console.log("error", data);
            }

            if (data.suggestions.length) {

                const company = data.suggestions[0]

                setCompanyInformation({
                    ...companyInformation,
                    LegalName: company.value,
                    Inn: company.data.inn.toString(),
                    OGRN: company.data.ogrn.toString(),
                    OKPO: company.data.okpo.toString()
                })
                console.log(company);
                console.log(companyInformation);
            }
        } catch (error) {

            console.log(error);

        }

    }

    const nextStep = async () => {
        if(!active) {
            setActive(true)
        } else {
            try {
                const res = await fetch(import.meta.env.VITE_API_URL + '/company/company_profile/edit_company_information', {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        Authorization: `Bearer ${AccessToken}`
                    },
                    body: JSON.stringify(companyInformation)
                });
                const data = await res.json();
                if (data.status === "error") {
                    console.log("error", data);
                }

                if (data.status === "success") {

                    console.log(data);
                    next(companyInformation)

                }
            } catch (error) {

                console.log(error);

            }
        }
    }

    useEffect(() => {
        if(information) {
            setCompanyInformation({
                ...information,
                EmployeeId: EmployeeId
            })
            setActive(true)
        }
    },[information])

    return (
        <>
            <div className="flex flex-col gap-[15px] items-center grow justify-center">
                {!companyInformation.LegalName && (
                    <>
                        <img src={ImgWrite} alt="write" className="mb-[10px] max-h-[100%]" />
                        <input type="text" placeholder="Введите ИНН" value={inn} onInput={(e) => { setInn(e.currentTarget.value) }} className="border-[#ECEEF1] border border-solid bg-[transparent] px-[30px] py-[14px] text-[18px] text-center font-medium rounded-[15px] placeholder:text-[#787B86]" />
                        <p className="text-center text-[18px]">
                            Напишите ИНН вашей компании <br />
                            и алгоритм подставит оставшиеся данные
                        </p>
                    </>
                )}

                {companyInformation.LegalName && (
                    <>

                        <div className='flex flex-col gap-[10px] w-[520px] scroll overflow-y-auto max-h-[calc(100vh-430px)]'>
                            <div className="grid grid-cols-[1fr_1fr] items-center">
                                <span className='text-[18px] font-medium text-[#9B9FAD]'>Название компании</span>
                                <div className="w-full border-[#ECEEF1] border border-solid bg-[transparent] px-[30px] py-[14px] text-[18px] text-center font-medium rounded-[15px] placeholder:text-[#787B86]">{companyInformation.LegalName || '-'}</div>
                            </div>
                            <div className="grid grid-cols-[1fr_1fr] items-center">
                                <span className='text-[18px] font-medium text-[#9B9FAD]'>ИНН</span>
                                {/* <input type="text" value={companyInformation.Inn} className="w-full border-[#ECEEF1] border border-solid bg-[transparent] px-[30px] py-[14px] text-[18px] text-center font-medium rounded-[15px] placeholder:text-[#787B86]" /> */}
                                <div className="w-full border-[#ECEEF1] border border-solid bg-[transparent] px-[30px] py-[14px] text-[18px] text-center font-medium rounded-[15px] placeholder:text-[#787B86]">{companyInformation.Inn || '-'}</div>
                            </div>
                            <div className="grid grid-cols-[1fr_1fr] items-center">
                                <span className='text-[18px] font-medium text-[#9B9FAD]'>ОГРН</span>
                                {/* <input type="text" value={companyInformation.OGRN} className="w-full border-[#ECEEF1] border border-solid bg-[transparent] px-[30px] py-[14px] text-[18px] text-center font-medium rounded-[15px] placeholder:text-[#787B86]" /> */}
                                <div className="w-full border-[#ECEEF1] border border-solid bg-[transparent] px-[30px] py-[14px] text-[18px] text-center font-medium rounded-[15px] placeholder:text-[#787B86]">{companyInformation.OGRN || '-'}</div>
                            </div>
                            <div className="grid grid-cols-[1fr_1fr] items-center">
                                <span className='text-[18px] font-medium text-[#9B9FAD]'>ОКПО</span>
                                {/* <input type="text" value={companyInformation.OKPO} className="w-full border-[#ECEEF1] border border-solid bg-[transparent] px-[30px] py-[14px] text-[18px] text-center font-medium rounded-[15px] placeholder:text-[#787B86]" /> */}
                                <div className="w-full border-[#ECEEF1] border border-solid bg-[transparent] px-[30px] py-[14px] text-[18px] text-center font-medium rounded-[15px] placeholder:text-[#787B86]">{companyInformation.OKPO || '-'}</div>
                            </div>
                            {
                                active && <>
                                    <div className="grid grid-cols-[1fr_1fr] items-center">
                                        <span className='text-[18px] font-medium text-[#9B9FAD]'>КПП</span>
                                        <input type="text" value={companyInformation.Kpp} placeholder='Введите КПП'
                                        onInput={(e) => {
                                            setCompanyInformation({
                                                ...companyInformation,
                                                Kpp: e.currentTarget.value
                                            })
                                        }}
                                        className="w-full border-[#ECEEF1] border border-solid bg-[transparent] px-[30px] py-[14px] text-[18px] text-center font-medium rounded-[15px] placeholder:text-[#787B86]" />
                                    </div>  
                                    <div className="grid grid-cols-[1fr_1fr] items-center">
                                        <span className='text-[18px] font-medium text-[#9B9FAD]'>Полное название</span>
                                        <input type="text" value={companyInformation.LegalName} placeholder='ООО “Альфа Групп”'
                                        onInput={(e) => {
                                            setCompanyInformation({
                                                ...companyInformation,
                                                LegalName: e.currentTarget.value
                                            })
                                        }}
                                        className="w-full border-[#ECEEF1] border border-solid bg-[transparent] px-[30px] py-[14px] text-[18px] text-center font-medium rounded-[15px] placeholder:text-[#787B86]" />
                                    </div> 
                                    <div className="grid grid-cols-[1fr_1fr] items-center">
                                        <span className='text-[18px] font-medium text-[#9B9FAD]'>Краткое название</span>
                                        <input type="text" value={companyInformation.ShortName} placeholder='Альфа Групп'
                                        onInput={(e) => {
                                            setCompanyInformation({
                                                ...companyInformation,
                                                ShortName: e.currentTarget.value
                                            })
                                        }}
                                        className="w-full border-[#ECEEF1] border border-solid bg-[transparent] px-[30px] py-[14px] text-[18px] text-center font-medium rounded-[15px] placeholder:text-[#787B86]" />
                                    </div> 
                                    <div className="grid grid-cols-[1fr_1fr] items-center">
                                        <span className='text-[18px] font-medium text-[#9B9FAD]'>Юридический адрес</span>
                                        <input type="text" value={companyInformation.LegalAddress} placeholder='Ваш юридический адрес'
                                        onInput={(e) => {
                                            setCompanyInformation({
                                                ...companyInformation,
                                                LegalAddress: e.currentTarget.value
                                            })
                                        }}
                                        className="w-full border-[#ECEEF1] border border-solid bg-[transparent] px-[30px] py-[14px] text-[18px] text-center font-medium rounded-[15px] placeholder:text-[#787B86]" />
                                    </div>     
                                    <div className="grid grid-cols-[1fr_1fr] items-center">
                                        <span className='text-[18px] font-medium text-[#9B9FAD]'>Фактический адрес</span>
                                        <input type="text" value={companyInformation.PhysicalAddress} placeholder='Ваш фактический адрес'
                                        onInput={(e) => {
                                            setCompanyInformation({
                                                ...companyInformation,
                                                PhysicalAddress: e.currentTarget.value
                                            })
                                        }}
                                        className="w-full border-[#ECEEF1] border border-solid bg-[transparent] px-[30px] py-[14px] text-[18px] text-center font-medium rounded-[15px] placeholder:text-[#787B86]" />
                                    </div>  
                                    <div className="grid grid-cols-[1fr_1fr] items-center">
                                        <span className='text-[18px] font-medium text-[#9B9FAD]'>ФИО для подписи</span>
                                        <input type="text" value={companyInformation.ShortFIO} placeholder='Иванов И.И.'
                                        onInput={(e) => {
                                            setCompanyInformation({
                                                ...companyInformation,
                                                ShortFIO: e.currentTarget.value
                                            })
                                        }}
                                        className="w-full border-[#ECEEF1] border border-solid bg-[transparent] px-[30px] py-[14px] text-[18px] text-center font-medium rounded-[15px] placeholder:text-[#787B86]" />
                                    </div> 
                                    <div className="grid grid-cols-[1fr_1fr] items-center">
                                        <span className='text-[18px] font-medium text-[#9B9FAD]'>В лице</span>
                                        <input type="text" value={companyInformation.FIO} placeholder='Иванова Ивана Ивановича'
                                        onInput={(e) => {
                                            setCompanyInformation({
                                                ...companyInformation,
                                                FIO: e.currentTarget.value
                                            })
                                        }}
                                        className="w-full border-[#ECEEF1] border border-solid bg-[transparent] px-[30px] py-[14px] text-[18px] text-center font-medium rounded-[15px] placeholder:text-[#787B86]" />
                                    </div> 
                                    <div className="grid grid-cols-[1fr_1fr] items-center">
                                        <span className='text-[18px] font-medium text-[#9B9FAD]'>Паспортные данные</span>
                                        <input type="text" value={companyInformation.PassportData} placeholder=''
                                        onInput={(e) => {
                                            setCompanyInformation({
                                                ...companyInformation,
                                                PassportData: e.currentTarget.value
                                            })
                                        }}
                                        className="w-full border-[#ECEEF1] border border-solid bg-[transparent] px-[30px] py-[14px] text-[18px] text-center font-medium rounded-[15px] placeholder:text-[#787B86]" />
                                    </div>                                                                   
                                </>
                            }
                        </div>

                        <p className="text-center text-[14px] text-[#787B86] mt-[5px]">
                            Данные подставлены автоматически
                        </p>
                    </>
                )}
            </div>
            <div className="pt-[20px]  border-[#ECEEF1] border-0 border-t border-solid">
                {!companyInformation.LegalName && (<button onClick={() => getInformation()} className='w-full bg-[#292933] px-[60px] py-[15px] rounded-[16px] text-primary text-[18px] font-medium'>Найти реквизиты</button>)}
                {companyInformation.LegalName && (
                    <div className='flex gap-[10px]'>
                        <button onClick={() => {setInn(''); setActive(false); setCompanyInformation(
                            {
                                EmployeeId: EmployeeId,
                                LegalName: '',
                                ShortName: '',
                                Inn: '',
                                OGRN: '',
                                OKPO: '',
                                Kpp: '',
                                LegalAddress: '',
                                PhysicalAddress: '',
                                ShortFIO: '',
                                FIO: '',
                                PassportData: '',
                            }
                        )}} className='w-full bg-[#ECEEF1] px-[60px] py-[15px] rounded-[16px] text-[18px] font-medium text-[#787B86]'>Назад</button>
                        <button onClick={() => { nextStep() }} className='w-full bg-[#292933] px-[60px] py-[15px] rounded-[16px] text-primary text-[18px] font-medium'>Далее</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default InnCheck;