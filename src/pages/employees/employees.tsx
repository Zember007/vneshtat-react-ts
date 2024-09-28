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
import { Passengers } from '@/widgets/employees/passengers';
import { Sections } from '@/widgets/employees/sections';
import { Groups } from '@/widgets/employees/groups';
import { Structure } from '@/widgets/employees/structure';


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
                    location.includes('/jobs/employees/passengers') && <Passengers />
                    ||
                    location.includes('/jobs/employees/sections') && <Sections />
                    ||
                    location.includes('/jobs/employees/groups') && <Groups />
                    ||
                    location.includes('/jobs/employees/structure') && <Structure />
                   
                }

            information={
                <>
                    {
                        (location == '/jobs/employees' || location == '/jobs/employees/') && <IndexInfornation selectedStafferId={selectedStafferId}/>
                    }
                </>
            }

            navigation={


                (location == '/jobs/employees' || location == '/jobs/employees/') && <IndexNavigation />


            }
            />

        </>
    );
};

export default employees;