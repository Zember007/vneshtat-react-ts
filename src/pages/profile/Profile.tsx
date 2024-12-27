import Layout from "@/app/layouts/layout";
import RouteImg from '@/assets/icons/route.svg?react'
import { useEffect, useState } from "react";

import { SecurityCart, SecurityFilter } from "@/widgets/profile/security";
import { StatisticsCart, StatisticsFilter } from "@/widgets/profile/statistics";
import { AccessCart, AccessFilter } from "@/widgets/profile/access";
import { PersonalCart, PersonalFilter } from "@/widgets/profile/personal";
import { CompanyChoose } from "@/widgets/company";
import { getAccessToken } from "@/shared/utils";
import { RootState } from "@/app/config/store";
import { useSelector } from "react-redux";
import { revokeAccessToken } from "@/shared/utils/methods";

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
    const [informationView, setInformationView] = useState(false)
    const [activeBlock, setActiveBlock] = useState<string | null>(null)

    const activePersonalFilter = useSelector((state: RootState) => state.profile.activePersonalFilter);


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
        setActiveBlock(null)
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

    const StafferInformation = useSelector((state: RootState) => state.employees.StaffersInformations).find(item => item.EmployeeId === Number(EmployeeId));

    const setPersonal = async () => {
        const formdata = new FormData();

        formdata.append('EmployeeId', EmployeeId ?? '')

        const url = StafferInformation?.Type === 'Update' ? 'edit_profile_personal_information' : 'create_profile_personal_information'
        const method = StafferInformation?.Type === 'Update' ? 'PATCH' : 'POST'

        if (StafferInformation?.Type === 'Update') {
            formdata.append('Surname', StafferInformation?.Surname ?? '')
            formdata.append('MiddleName', StafferInformation?.MiddleName ?? '')
            formdata.append('Name', StafferInformation?.Name ?? '')
            formdata.append('PersonalInfoSurname', StafferInformation?.PersonalInfoSurname ?? '')
            formdata.append('PersonalInfoName', StafferInformation?.PersonalInfoName ?? '')
            formdata.append('PersonalInfoBirthDate', StafferInformation?.PersonalInfoBirthDate ? StafferInformation.PersonalInfoBirthDate.split('-').reverse().join('-') : '')
            formdata.append('PersonalInfoGender', StafferInformation?.PersonalInfoGender ?? 'male')
            formdata.append('PersonalInfoNationality', StafferInformation?.PersonalInfoNationality ?? '')
            formdata.append('Email', StafferInformation?.Email ?? '')
            formdata.append('PhoneNumber', StafferInformation?.PhoneNumber ?? '')
            formdata.append('Username', StafferInformation?.Username ?? '')
        }

        if (StafferInformation?.Type === 'Create') {
            formdata.append('Surname', StafferInformation?.PersonalInfoSurname ?? '')
            formdata.append('Name', StafferInformation?.PersonalInfoName ?? '')
            formdata.append('BirthDate', StafferInformation?.PersonalInfoBirthDate ? StafferInformation.PersonalInfoBirthDate.split('-').reverse().join('-') : '')
            formdata.append('Gender', StafferInformation?.PersonalInfoGender ?? 'male')
            formdata.append('Nationality', StafferInformation?.PersonalInfoNationality ?? '')
        }

        try {
            const res = await fetch(import.meta.env.VITE_API_URL + '/user/profile/' + url, {
                method: method,
                headers: {
                    Authorization: `Bearer ${AccessToken}`
                },
                body: formdata
            });
            const data = await res.json();
            if (data.status === "error") {
                console.log("error", data);
            }

            if (data.status === "success") {
                console.log(data);
                setProfileInformation1Part((prev) => ({
                    ...prev,
                    Name: StafferInformation?.Name,
                    Surname: StafferInformation?.Surname,
                    MiddleName: StafferInformation?.MiddleName
                }))
            }

        } catch (error) {

            console.log(error);

        }
    }

    const Documents = useSelector((state: RootState) => state.employees.StaffersDocuments).find(item => item.EmployeeId === Number(EmployeeId));

    const setDocuments = async () => {
        const Documents_new = Documents?.Documents.filter(item => item.New)
        const Documents_edit = Documents?.Documents.filter(item => item.Edit)

        if (Documents_new && Documents_new.length > 0) {
            Documents_new.forEach(async (el) => {
                
                const formdata = new FormData()

                formdata.append('EmployeeId', EmployeeId || '')
                formdata.append('DocumentType', el.DocumentType)
                formdata.append('Number', el.Number)
                formdata.append('DateOfIssue', el.DateOfIssue || '')
                formdata.append('MiddleName', el.MiddleName)
                formdata.append('Nationality', el.Nationality)
                formdata.append('ValidityDeadline', el.ValidityDeadline || '')
                formdata.append('Name', el.Name)
                formdata.append('Surname', el.Surname)       
                formdata.append('Species', el.Species)
                


                try {
                    const res = await fetch(import.meta.env.VITE_API_URL + '/user/profile/create_profile_document', {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${AccessToken}`,
                        },
                        body: formdata
                    });
                    const data = await res.json();
                    if (data.status === "error") {
                        console.log("error", data);
                    }

                    if (data.status === "success") {
                        console.log(data);

                    }

                } catch (error) {

                    console.log(error);

                }
            })
        }

        if (Documents_edit && Documents_edit.length > 0) {
            Documents_edit.forEach(async (el) => {
                
                const formdata = new FormData()

                formdata.append('EmployeeId', EmployeeId || '')
                formdata.append('DocumentType', el.DocumentType)
                formdata.append('DocumentId', el.id?.toString() || '')
                formdata.append('Type', el.Type)
                formdata.append('Number', el.Number)
                formdata.append('DateOfIssue', el.DateOfIssue || '')
                formdata.append('MiddleName', el.MiddleName)
                formdata.append('Nationality', el.Nationality)
                formdata.append('ValidityDeadline', el.ValidityDeadline || '')
                formdata.append('Name', el.Name)
                formdata.append('Surname', el.Surname)       
                formdata.append('Species', el.Species)                
                


                try {
                    const res = await fetch(import.meta.env.VITE_API_URL + '/user/profile/edit_profile_document', {
                        method: "PATCH",
                        headers: {
                            Authorization: `Bearer ${AccessToken}`,
                        },
                        body: formdata
                    });
                    const data = await res.json();
                    if (data.status === "error") {
                        console.log("error", data);
                    }

                    if (data.status === "success") {
                        console.log(data);

                    }

                } catch (error) {

                    console.log(error);

                }
            })
        }

    }


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
                                    <span className="text-primary text-[18px] font-medium">{profileInformation1Part.CompanyName || localStorage.getItem('CompanyName')}</span>
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
                            <div className={`rounded-[26px] transition-all duration-300 ${activeBlock === 'security' ? 'bg-[#ECEEF1]' : 'bg-primary'} p-[15px] w-full h-full flex flex-col cursor-pointer`}
                                onClick={() => { ResetFilter(); setActiveBlock('security') }}
                            >

                                <SecurityCart status={profileInformation2Part?.SecurityStatus || ''} active={activeBlock === 'security'} />

                            </div>
                            <div className={`rounded-[26px] transition-all duration-300 ${activeBlock === 'staticstics' ? 'bg-[#ECEEF1]' : 'bg-primary'} p-[15px] w-full h-full row-span-2 flex flex-col gap-[10px]`}>

                                <StatisticsCart active={activeBlock === 'staticstics'} select={() => { ResetFilter(); setActiveBlock('staticstics') }} />

                            </div>
                            <div
                                onClick={() => { ResetFilter(); setActiveBlock('access') }}
                                className={`cursor-pointer rounded-[26px] transition-all duration-300 ${activeBlock === 'access' ? 'bg-[#ECEEF1]' : 'bg-primary'} p-[15px] w-full h-full flex flex-col`}>

                                <AccessCart status={profileInformation2Part?.AccessLastChange || ''} active={activeBlock === 'access'} />

                            </div>
                            <div className={`rounded-[26px] transition-all duration-300 ${activeBlock === 'personal' ? 'bg-[#ECEEF1]' : 'bg-primary'} p-[15px] w-full h-full flex flex-col`}>

                                <PersonalCart select={() => { ResetFilter(); setActiveBlock('personal') }} />

                            </div>
                        </div>
                    </>
                }
                information={
                    <>
                        {informationView &&
                            <div className="p-[20px] flex flex-col gap-[15px] h-full">
                                {activeBlock === 'staticstics' && <StatisticsFilter close={() => { ResetFilter(); setInformationView(false) }} />}
                                {activeBlock === 'security' && <SecurityFilter close={() => { ResetFilter(); setInformationView(false) }} />}
                                {activeBlock === 'personal' && <PersonalFilter close={() => { ResetFilter(); setInformationView(false) }} />}
                                {activeBlock === 'access' && <AccessFilter close={() => { ResetFilter(); setInformationView(false) }} />}
                            </div>
                        }

                    </>
                }
                navigation={<>
                    {!informationView && <button
                        onClick={() => {
                            revokeAccessToken()
                        }}
                        className="py-[15px] rounded-[18px] bg-[#DCE0E5]">
                        <span>Выйти из аккаунта</span>
                    </button>}
                    {(activeBlock === 'personal' || activeBlock === 'access') &&
                        <button
                            onClick={() => {
                                if (activeBlock === 'personal') {
                                    if(activePersonalFilter === 'user') {
                                        setPersonal()
                                    }
                                    if(activePersonalFilter === 'document') {
                                        setDocuments()
                                    }
                                }
                            }}
                            className="py-[15px] rounded-[18px] bg-[#DCE0E5]">
                            <span>Сохранить</span>
                        </button>
                    }
                </>}
            />
        </>
    )
};

export default Profile;