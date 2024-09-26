import Layout from '@/widgets/jobs/layout/layout';
import ButtonLink from '@/widgets/jobs/UI/Button';
import PassengersImg from "@/assets/icons/passengers.svg?react";
import SectionsImg from "@/assets/icons/sections.svg?react";
import GroupsImg from "@/assets/icons/groups.svg?react";
import SettingsImg from "@/assets/icons/settings.svg?react";
import TeamImg from "@/assets/icons/team.svg?react";
import { useLocation } from "react-router-dom";
import { useEffect } from 'react';
import { Index, IndexInfornation, IndexNavigation } from '@/widgets/employees/index'
// import { Passengers } from '@/widgets/employees/passengers';


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



    return (
        <>

            <Layout
                component={
                    <>
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

                        <Index />
                    </>
                }

                information={
                    <IndexInfornation />
                }

                navigation = {
                    <IndexNavigation />
                }
            />

        </>
    );
};

export default employees;