import Layout from '@/app/layouts/layout';
import PassengersImg from "@/assets/icons/passengers.svg?react";
import SectionsImg from "@/assets/icons/sections.svg?react";
import GroupsImg from "@/assets/icons/groups.svg?react";
import SettingsImg from "@/assets/icons/settings.svg?react";
import TeamImg from "@/assets/icons/team.svg?react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Index, IndexInfornation, IndexNavigation } from '@/widgets/employees/index'
import { Passengers, PassengersInfornation, PassengersNavigation } from '@/widgets/employees/passengers';
import { Sections, SectionsInfornation, SectionsNavigation } from '@/widgets/employees/sections';
import { Groups, GroupsInfornation, GroupsNavigation } from '@/widgets/employees/groups';
import { Structure, StructureNavigation, StructureInfornation } from '@/widgets/employees/structure';
import { useDispatch } from 'react-redux';
import { getAccessToken } from '@/shared/utils';
import { setStaffers } from '@/widgets/employees/model/index.store';


const employees = () => {

    const location = useLocation().pathname
    const dispatch = useDispatch();


    const links = [
        { Img: TeamImg, title: 'Сотрудники', to: '/jobs/employees' },
        { Img: SettingsImg, title: 'Своя структура', to: '/jobs/employees/structure', disabled: true },
        { Img: SectionsImg, title: 'Отделы', to: '/jobs/employees/sections' },
        { Img: PassengersImg, title: 'Пассажиры', to: '/jobs/employees/passengers' },
        { Img: GroupsImg, title: 'Группы', to: '/jobs/employees/groups' },
    ]

    const [selectedStafferId, setSelectedStafferId] = useState<number | null>(null)
    const [selectedPassengerId, setSelectedPassengerId] = useState<number | null>(null)
    const [selectedGroupsId, setSelectedGroupsId] = useState<number | null>(null)
    const [selectedSectionsId, setSelectedSectionsId] = useState<number | null>(null)
    const [selectedStrucrureId, setSelectedStrucrureId] = useState<number | null>(null)
    const [informationView, setInfornationView] = useState<boolean>(true)

    useEffect(() => {

        if (selectedStafferId !== null || selectedPassengerId !== null || selectedGroupsId !== null || selectedSectionsId !== null || selectedStrucrureId !== null) {
            setInfornationView(true)
        }


    }, [selectedStafferId, selectedPassengerId, selectedGroupsId, selectedSectionsId, selectedStrucrureId])

    useEffect(() => {

        if (informationView === false) {
            reset()
        }

    }, [informationView])

    const reset = () => {
        setSelectedStafferId(null)
        setSelectedPassengerId(null)
        setSelectedGroupsId(null)
        setSelectedSectionsId(null)
        setSelectedStrucrureId(null)
    }

    const EmployeeId = localStorage.getItem('EmployeeId')
    const AccessToken = getAccessToken()

    const getOnline = async () => {
        const url = new URL(import.meta.env.VITE_API_URL + '/company/employees_profile/get_online_employees');
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
                return data.data
            }
        } catch (error) {

            console.log(error);

        }

    }

    const getStaffers = async (onlines: number[]) => {
        const url = new URL(import.meta.env.VITE_API_URL + '/company/employees_profile/get_employees_profile');
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

                const employees: any[] = data.data

                employees.forEach(el => {
                    const online = onlines.find(item_online => item_online == el.id)

                    el.isSelected = false
                    el.content = `${el.Surname} ${el.Name}`

                    el.online = online ? true : false
                })

                dispatch(setStaffers(employees))

            }
        } catch (error) {

            console.log(error);

        }

    }

    useEffect(() => {
        getOnline().then((res) => {
            getStaffers(res)
        })
    }, [])

    return (
        <>

            <Layout

                links={
                    <div onClick={() => { reset() }} className="flex gap-[10px]">
                        {links.map((item, index) => (
                            <Link to={item.to} key={index} className={`px-[25px] py-[15px] rounded-[13px] bg-[#FAFAFA] font-normal transition-all ${item.disabled && 'pointer-events-none'}`}>
                                <div className={`flex gap-[5px] items-center`}>
                                    <item.Img className={`${location === item.to && '*:fill-[#007BFB]'} ${item.disabled && '*:fill-[#8C909C]'}`} />
                                    <span className={`${location === item.to && 'text-[#007BFB]'} ${item.disabled && 'text-[#8C909C]'}`} >{item.title}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                }

                component={

                    (location == '/jobs/employees' || location == '/jobs/employees/') && <Index active={selectedStafferId} select={setSelectedStafferId} />
                    ||
                    location.includes('/jobs/employees/passengers') && <Passengers active={selectedPassengerId} select={setSelectedPassengerId} />
                    ||
                    location.includes('/jobs/employees/sections') && <Sections active={selectedSectionsId} select={setSelectedSectionsId} />
                    ||
                    location.includes('/jobs/employees/groups') && <Groups active={selectedGroupsId} select={setSelectedGroupsId} />
                    ||
                    location.includes('/jobs/employees/structure') && <Structure active={selectedStrucrureId} select={setSelectedStrucrureId} />

                }

                information={
                    <>
                        {informationView && (<>
                            {
                                (location == '/jobs/employees' || location == '/jobs/employees/') && <IndexInfornation close={() => setInfornationView(false)} selectedStafferId={selectedStafferId} />
                            }
                            {
                                location.includes('/jobs/employees/passengers') && <PassengersInfornation close={() => setInfornationView(false)} selectedPassengerId={selectedPassengerId} />
                            }
                            {
                                location.includes('/jobs/employees/sections') && <SectionsInfornation close={() => setInfornationView(false)} selectedSectionId={selectedSectionsId} />
                            }
                            {
                                location.includes('/jobs/employees/structure') && <StructureInfornation close={() => setInfornationView(false)} selectedStructureId={selectedStrucrureId} />
                            }
                            {
                                location.includes('/jobs/employees/groups') && <GroupsInfornation selectedGroupsId={selectedGroupsId} />
                            }
                        </>)}
                    </>
                }

                navigation={


                    (location == '/jobs/employees' || location == '/jobs/employees/') && <IndexNavigation selectedStafferId={selectedStafferId} />
                    ||
                    location.includes('/jobs/employees/passengers') && <PassengersNavigation selectedPassengerId={selectedPassengerId} select={setSelectedPassengerId} />
                    ||
                    location.includes('/jobs/employees/sections') && <SectionsNavigation selectedSectionId={selectedSectionsId} select={setSelectedSectionsId} />
                    ||
                    location.includes('/jobs/employees/groups') && <GroupsNavigation selectedGroupsId={selectedGroupsId} select={setSelectedGroupsId} />
                    ||
                    location.includes('/jobs/employees/structure') && <StructureNavigation />



                }
            />

        </>
    );
};

export default employees;