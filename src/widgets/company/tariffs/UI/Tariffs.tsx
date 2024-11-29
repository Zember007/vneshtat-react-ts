import clsx from "clsx";
import Fix from "./Fix";
import Procent from "./Procent";
import Elite from "./Elite";
import { useEffect, useState } from "react";
import CloseIcon from '@/assets/icons/close.svg?react'
import { Link } from "react-router-dom";
import { getAccessToken } from "@/shared/utils";

interface tariff {
    TariffName: string;
    id: number;
}

const Tariffs = ({ tariffActive }: { tariffActive: tariff | boolean }) => {

    const [active, setActive] = useState<string>('fix')
    const [tariffs, setTariffs] = useState<any[]>([])
    const [status, setStatus] = useState<any>()

    const tariffSelect = tariffs.find(item => item.TariffName === active)

    const EmployeeId = localStorage.getItem('EmployeeId')
    const AccessToken = getAccessToken()


    const getInformation = async () => {
        const url = new URL(import.meta.env.VITE_API_URL + '/company/company_profile/get_tariffs');
        url.searchParams.append('EmployeeId', EmployeeId || '');

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
                setTariffs(data.data);
            }
        } catch (error) {

            console.log(error);

        }

    }

    const getStatus = async () => {

        const url = new URL(import.meta.env.VITE_API_URL + '/company/company_profile/get_company_tariff_treaty_status');
        url.searchParams.append('EmployeeId', EmployeeId || '');

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
                setStatus(data.data)
            }
        } catch (error) {

            console.log(error);

        }

    }

    useEffect(() => {
        getInformation()
    }, [])

    useEffect(() => {
        if (tariffActive === false) {
            getStatus()
        } else if (typeof tariffActive !== 'boolean') {
            setStatus({
                TariffId: tariffActive.id,
                Status: 'accepted'
            })
        }
    }, [tariffActive])

    return (
        <div className="grow p-[60px] pl-[35px] bg-primary rounded-[40px] flex gap-[25px] items-center relative leading-[1]">
            <Link to={'/jobs/company'} className="absolute top-[25px] right-[25px]">
                <CloseIcon className="w-[25px] h-[25px] *:fill-[#8C909C]" />
            </Link>
            <div className="flex flex-col gap-[47px]">
                <div className="flex flex-col gap-[15px]">
                    <span className="text-[44px] font-medium leading-[100%]">Подключайтесь и путешествуйте!</span>
                    <p className="text-[#787B86] text-[18px]">
                        Подберите оптимальный тариф для вашей компании, чтобы не платить больше необходимого.
                    </p>
                </div>
                <div className="flex flex-col gap-[15px]">
                    <button onClick={() => setActive('fix')} className={clsx('flex items-center gap-[10px]  bg-[#ECEEF1] rounded-[26px] mr-[25px] px-[30px] py-[17px]  text-left transition-all  border border-[#E5E7EA] border-solid duration-300', active === 'fix' && '!bg-primary !mr-[0]')}>
                        <span className="font-medium text-[25px]  leading-[1.3]">Фикс</span>
                        <p className="text-[18px] text-[#9B9FAD] font-medium">15 000 ₽/месяц</p>
                    </button>
                    <button onClick={() => setActive('procent')} className={clsx('flex items-center gap-[10px] bg-[#ECEEF1]  rounded-[26px] mr-[25px] px-[30px] py-[17px]  text-left transition-all  border border-[#E5E7EA] border-solid duration-300', active === 'procent' && '!bg-primary !mr-[0]')}>
                        <span className="font-medium text-[25px]  leading-[1.3]">Процент</span>
                        <p className="text-[18px] text-[#9B9FAD] font-medium">150 ₽/услуга</p>
                    </button>
                    <button onClick={() => setActive('elite')} className={clsx('flex items-center gap-[10px] bg-[#ECEEF1] rounded-[26px] mr-[25px] px-[30px] py-[17px]  text-left transition-all  border border-[#E5E7EA] border-solid duration-300', active === 'elite' && '!bg-primary !mr-[0]')}>
                        <span className="font-medium text-[25px]  leading-[1.3]">Elite</span>
                        <p className="text-[18px] text-[#9B9FAD] font-medium">Индивидуальная цена</p>
                    </button>
                </div>
            </div>
            {tariffSelect && status && <div className="grow p-[30px] rounded-[50px] border border-solid border-[#E5E7EA] h-full w-full">
                {active === 'fix' && <Fix id={tariffSelect.id.toString()} setStatus={(status: string) => {
                    setStatus({
                        TariffId: tariffSelect.id,
                        Status: status
                    })
                }} status={status.TariffId == tariffSelect.id ? status.Status : ''} />}
                {active === 'procent' && <Procent id={tariffSelect.id.toString()} setStatus={(status: string) => {
                    setStatus({
                        TariffId: tariffSelect.id,
                        Status: status
                    })
                }} status={status.TariffId == tariffSelect.id ? status.Status : ''} />}
                {active === 'elite' && <Elite />}
            </div>}

        </div>
    );
};

export { Tariffs };