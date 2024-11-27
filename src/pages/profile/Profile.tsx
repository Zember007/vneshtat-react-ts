import Layout from "@/app/layouts/layout";
import RouteImg from '@/assets/icons/route.svg?react'
import { useState } from "react";

import { SecurityCart, SecurityFilter } from "@/widgets/profile/security";
import { StatisticsCart, StatisticsFilter } from "@/widgets/profile/statistics";
import { AccessCart, AccessFilter } from "@/widgets/profile/access";
import { PersonalCart, PersonalFilter } from "@/widgets/profile/personal";
import { CompanyChoose } from "@/widgets/company";

const Profile = () => {

    const [changeCompany, setChangeCompany] = useState(false)
    const [accessView, setAccessView] = useState(false)
    const [staticsticsView, setStaticsticsView] = useState(false)
    const [personalView, setPersonalView] = useState(false)
    const [securityView, setSecurityView] = useState(false)
    const [informationView, setInformationView] = useState(false)

    const ResetFilter = () => {
        setInformationView(true)
        setAccessView(false)
        setStaticsticsView(false)
        setPersonalView(false)
        setSecurityView(false)
    }

    return (
        <>
            {changeCompany && <CompanyChoose select={() => { ResetFilter(); setChangeCompany(false) }} />}
            <Layout
                component={
                    <>
                        <div className="rounded-[23px] bg-primary px-[25px] py-[19px]">
                            <p className="text-[18px] font-medium">Вознесенский Иван Сергеевич</p>
                        </div>
                        <div className="grid gap-[15px] grid-cols-[1fr_1fr_1fr] grid-rows-[1fr_1fr] grow">
                            <div className="rounded-[26px] bg-primary p-[15px] w-full h-full flex flex-col justify-center gap-[10px]">
                                <div className="rounded-[23px] bg-[#121212] h-full max-h-[75px] flex items-center justify-center text-center">
                                    <span className="text-primary text-[18px] font-medium">Альфа Банк</span>
                                </div>
                                <div className="rounded-[13px] bg-[#ECEEF1] py-[9px] text-center">
                                    <span className="text-[14px] font-medium text-[#007BFB]">@ivanvoznes</span>
                                </div>
                                <div className="rounded-[13px] bg-[#ECEEF1] py-[9px] flex justify-center items-center gap-[5px]">
                                    <RouteImg className="w-[18px] h-[18px] *:fill-[#8C909C]" />
                                    <span className="text-[14px]">Нет активных поездок</span>
                                </div>
                                <button
                                    onClick={() => setChangeCompany(true)}
                                    className="rounded-[13px] bg-black py-[9px]">
                                    <span className="text-[14px] text-primary">Переключиться</span>
                                </button>
                            </div>
                            <div className={`rounded-[26px] transition-all duration-300 ${securityView ? 'bg-[#ECEEF1]' : 'bg-primary'} p-[15px] w-full h-full flex flex-col cursor-pointer`}
                            onClick={() => {ResetFilter(); setSecurityView(true)}}
                            >

                                <SecurityCart active={securityView}/>

                            </div>
                            <div className={`rounded-[26px] transition-all duration-300 ${staticsticsView ? 'bg-[#ECEEF1]' : 'bg-primary'} p-[15px] w-full h-full row-span-2 flex flex-col gap-[10px]`}>

                                <StatisticsCart active={staticsticsView} select={() => { ResetFilter(); setStaticsticsView(true) }} />

                            </div>
                            <div
                            onClick={() => {ResetFilter(); setAccessView(true)}}
                            className={`cursor-pointer rounded-[26px] transition-all duration-300 ${accessView ? 'bg-[#ECEEF1]' : 'bg-primary'} p-[15px] w-full h-full flex flex-col`}>

                                <AccessCart  active={accessView}/>

                            </div>
                            <div className={`rounded-[26px] transition-all duration-300 ${personalView ? 'bg-[#ECEEF1]' : 'bg-primary'} p-[15px] w-full h-full flex flex-col`}>

                                <PersonalCart select={() => { ResetFilter(); setPersonalView(true) }} />

                            </div>
                        </div>
                    </>
                }
                information={
                    <>
                        {informationView &&
                            <div className="p-[20px] flex flex-col gap-[15px] h-full">
                                {staticsticsView && <StatisticsFilter close={() => { ResetFilter(); setInformationView(false) }} />}
                                {securityView && <SecurityFilter close={() => { ResetFilter(); setInformationView(false) }} />}
                                {personalView && <PersonalFilter close={() => { ResetFilter(); setInformationView(false) }} />}
                                {accessView && <AccessFilter close={() => { ResetFilter(); setInformationView(false) }} />}
                            </div>
                        }
                    </>
                }
                navigation={<>
                    {!informationView && <button
                        onClick={() => {
                            localStorage.clear()
                            window.location.replace('/')
                        }}
                        className="py-[15px] rounded-[18px] bg-[#DCE0E5]">
                        <span>Выйти из аккаунта</span>
                    </button>}
                </>}
            />
        </>
    )
};

export default Profile;