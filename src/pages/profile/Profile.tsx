import Layout from "@/app/layouts/layout";
import RouteImg from '@/assets/icons/route.svg?react'
import { useEffect, useState } from "react";

import { SecurityCart, SecurityFilter } from "@/widgets/profile/security";
import { StatisticsCart, StatisticsFilter } from "@/widgets/profile/statistics";
import { AccessCart, AccessFilter } from "@/widgets/profile/access";
import { PersonalCart, PersonalFilter } from "@/widgets/profile/personal";
import { CompanyChoose } from "@/widgets/company";
import { getAccessToken } from "@/shared/utils";

interface profileInformation1Part {
    EmployeeId: string,
    Surname: string,
    Name: string,
    MiddleName: string,
    CompanyName: string,
    Username: string,
    ActiveTravels: string,
    OtherCompanies: any
}

interface profileInformation2Part {
    AccessLastChange: string,
    SecurityStatus: string,
}

const Profile = () => {

    const [changeCompany, setChangeCompany] = useState(false)
    const [accessView, setAccessView] = useState(false)
    const [staticsticsView, setStaticsticsView] = useState(false)
    const [personalView, setPersonalView] = useState(false)
    const [securityView, setSecurityView] = useState(false)
    const [informationView, setInformationView] = useState(false)

    const [profileInformation1Part, setProfileInformation1Part] = useState<profileInformation1Part>(
        {
            EmployeeId: '',
            Surname: '',
            Name: '',
            MiddleName: '',
            CompanyName: '',
            Username: '',
            ActiveTravels: '',
            OtherCompanies: {}
        }
    )

    const [profileInformation2Part, setProfileInformation2Part] = useState<profileInformation2Part>()



    const ResetFilter = () => {
        setInformationView(true)
        setAccessView(false)
        setStaticsticsView(false)
        setPersonalView(false)
        setSecurityView(false)
    }

    const AccessToken = getAccessToken()
    const EmployeeId = localStorage.getItem('EmployeeId')

    const getInformation1Part = async () => {
        const url = new URL(import.meta.env.VITE_API_URL + '/user/profile/get_profile_1_part');
        url.searchParams.append('EmployeeId', EmployeeId?.toString() ?? '');
        
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
        
                setProfileInformation1Part(data.data)

            }
        } catch (error) {

            console.log(error);

        }

    }

    const getInformation2Part = async () => {
        const url = new URL(import.meta.env.VITE_API_URL + '/user/profile/get_profile_2_part');
        url.searchParams.append('EmployeeId', EmployeeId?.toString() ?? '');
        
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
        
                setProfileInformation2Part(data.data)

            }
        } catch (error) {

            console.log(error);

        }

    }

    useEffect(() => {

        getInformation1Part()
        getInformation2Part()

    }, [])


    return (
        <>
            {changeCompany && <CompanyChoose select={() => { ResetFilter(); setChangeCompany(false) }} />}
            <Layout
                component={
                    <>
                        <div className="rounded-[23px] bg-primary px-[25px] py-[19px]">
                            <p className="text-[18px] font-medium">{profileInformation1Part.Surname} {profileInformation1Part.Name} {profileInformation1Part.MiddleName}</p>
                        </div>
                        <div className="grid gap-[15px] grid-cols-[1fr_1fr_1fr] grid-rows-[1fr_1fr] grow">
                            <div className="rounded-[26px] bg-primary p-[15px] w-full h-full flex flex-col justify-center gap-[10px]">
                                <div className="rounded-[23px] bg-[#121212] h-full max-h-[75px] flex items-center justify-center text-center">
                                    <span className="text-primary text-[18px] font-medium">{profileInformation1Part.CompanyName}</span>
                                </div>
                                <div className="rounded-[13px] bg-[#ECEEF1] py-[9px] text-center">
                                    <span className="text-[14px] font-medium text-[#007BFB]">@{profileInformation1Part.Username}</span>
                                </div>
                                <div className="rounded-[13px] bg-[#ECEEF1] py-[9px] flex justify-center items-center gap-[5px]">
                                    <RouteImg className="w-[18px] h-[18px] *:fill-[#8C909C]" />
                                    <span className="text-[14px]">{profileInformation1Part.ActiveTravels === '0' ? 'Нет' : profileInformation1Part.ActiveTravels} активных поездок</span>
                                </div>
                                <button
                                    onClick={() => setChangeCompany(true)}
                                    className="rounded-[13px] bg-black py-[9px]">
                                    <span className="text-[14px] text-primary">Переключиться</span>
                                </button>
                            </div>
                            <div className={`rounded-[26px] transition-all duration-300 ${securityView ? 'bg-[#ECEEF1]' : 'bg-primary'} p-[15px] w-full h-full flex flex-col cursor-pointer`}
                                onClick={() => { ResetFilter(); setSecurityView(true) }}
                            >

                                <SecurityCart status={profileInformation2Part?.SecurityStatus || ''} active={securityView} />

                            </div>
                            <div className={`rounded-[26px] transition-all duration-300 ${staticsticsView ? 'bg-[#ECEEF1]' : 'bg-primary'} p-[15px] w-full h-full row-span-2 flex flex-col gap-[10px]`}>

                                <StatisticsCart active={staticsticsView} select={() => { ResetFilter(); setStaticsticsView(true) }} />

                            </div>
                            <div
                                onClick={() => { ResetFilter(); setAccessView(true) }}
                                className={`cursor-pointer rounded-[26px] transition-all duration-300 ${accessView ? 'bg-[#ECEEF1]' : 'bg-primary'} p-[15px] w-full h-full flex flex-col`}>

                                <AccessCart status={profileInformation2Part?.AccessLastChange || ''} active={accessView} />

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