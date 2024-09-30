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
import { Groups, GroupsInfornation,GroupsNavigation  } from '@/widgets/employees/groups';
import { Structure, StructureNavigation, StructureInfornation } from '@/widgets/employees/structure';


const employees = () => {

    const location = useLocation().pathname

    useEffect(() => {

    }, [])

    const links = [
        { Img: TeamImg, title: 'Сотрудники', to: '/jobs/employees' },
        { Img: SettingsImg, title: 'Своя структура', to: '/jobs/employees/structure' },
        { Img: SectionsImg, title: 'Отделы', to: '/jobs/employees/sections' },
        { Img: PassengersImg, title: 'Пассажиры', to: '/jobs/employees/passengers' },
        { Img: GroupsImg, title: 'Группы', to: '/jobs/employees/groups' },
    ]

    const [selectedStafferId, setSelectedStafferId] = useState<number | null>(null)
    const [selectedPassengerId, setSelectedPassengerId] = useState<number | null>(null)



    return (
        <>

            <Layout

                links={
                    <div className="flex gap-[10px]">
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
                    location.includes('/jobs/employees/sections') && <Sections active={selectedPassengerId} select={setSelectedPassengerId}/>
                    ||
                    location.includes('/jobs/employees/groups') && <Groups active={selectedPassengerId} select={setSelectedPassengerId}/>
                    ||
                    location.includes('/jobs/employees/structure') && <Structure active={selectedPassengerId} select={setSelectedPassengerId}/>

                }

                information={
                    <>
                        {
                            (location == '/jobs/employees' || location == '/jobs/employees/') && <IndexInfornation selectedStafferId={selectedStafferId} />
                        }
                        {
                            location.includes('/jobs/employees/passengers') && <PassengersInfornation selectedPassengerId={selectedPassengerId} />
                        } 
                        {
                            location.includes('/jobs/employees/sections') && <SectionsInfornation selectedSectionId={selectedPassengerId} /> 
                        }
                        {
                            location.includes('/jobs/employees/structure') && <StructureInfornation selectedStructureId={selectedPassengerId} /> 
                        }
                        {
                            location.includes('/jobs/employees/groups') && <GroupsInfornation selectedGroupsId={selectedPassengerId} /> 
                        }
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