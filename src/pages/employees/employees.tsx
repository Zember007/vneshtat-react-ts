import Layout from '@/widgets/jobs/layout/layout';
import ButtonLink from '@/widgets/jobs/UI/Button';
import PassengersImg from "@/assets/icons/passengers.svg?react";
import SectionsImg from "@/assets/icons/sections.svg?react";
import GroupsImg from "@/assets/icons/groups.svg?react";
import SettingsImg from "@/assets/icons/settings.svg?react";
import TeamImg from "@/assets/icons/team.svg?react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Index, IndexInfornation, IndexNavigation } from '@/widgets/employees/index'
import { Passengers, PassengersInfornation, PassengersNavigation } from '@/widgets/employees/passengers';
import { Sections, SectionsInfornation, SectionsNavigation } from '@/widgets/employees/sections';
import { Groups, GroupsInfornation, GroupsNavigation } from '@/widgets/employees/groups';
import { Structure, StructureNavigation, StructureInfornation } from '@/widgets/employees/structure';


const employees = () => {

    const location = useLocation().pathname



    const links = [
        { Img: TeamImg, title: 'Сотрудники', to: '/jobs/employees' },
        { Img: SettingsImg, title: 'Своя структура', to: '/jobs/employees/structure' },
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

        if (selectedStafferId !== null || selectedPassengerId !== null || selectedGroupsId !== null || selectedSectionsId !== null || selectedStrucrureId !== null ) {
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

    return (
        <>

            <Layout

                links={
                    <div onClick={() => { reset() }} className="flex gap-[10px]">
                        {links.map(item => (
                            <ButtonLink to={item.to} key={item.to} title={
                                <div className="flex gap-[5px] items-center">
                                    <item.Img className={location === item.to ? '*:fill-[#007BFB]' : ''} />
                                    <span className={location === item.to ? 'text-[#007BFB]' : ''} >{item.title}</span>
                                </div>
                            }></ButtonLink>
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


                    (location == '/jobs/employees' || location == '/jobs/employees/') && <IndexNavigation />
                    ||
                    location.includes('/jobs/employees/passengers') && <PassengersNavigation />
                    ||
                    location.includes('/jobs/employees/sections') && <SectionsNavigation />
                    ||
                    location.includes('/jobs/employees/groups') && <GroupsNavigation />
                    ||
                    location.includes('/jobs/employees/structure') && <StructureNavigation />



                }
            />

        </>
    );
};

export default employees;