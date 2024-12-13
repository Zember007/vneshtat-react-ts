import Document from "@/assets/icons/document.svg?react";
import Team from "@/assets/icons/team.svg?react";
import Filter from "@/assets/icons/filter.svg?react";
import Lock from "@/assets/icons/lock.svg?react";
import clsx from "clsx";
import CloseImg from '@/assets/icons/cross.svg?react'
import InputDate from "../../../jobs/UI/InputDate";
import InputSelect from "../../../jobs/UI/InputSelect";
import { Checkbox } from "@/shared/UI";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/config/store";
import { setDepartments, setNoDepartments, setServices, setCenters, setProjects, setStructure } from "../../model/reports.store";
import { CheckboxItem } from "@/shared/UI/checkbox/checkbox.props";
import { useState } from "react";
import SimpleBar from "simplebar-react";

const ServicesFilters = ({ filterStep, setFilterStep }: { filterStep: number | null; setFilterStep: Function; }) => {
    const dispatch: AppDispatch = useDispatch();
    const Departments = useSelector((state: RootState) => state.reports.departments);
    const NoDepartments = useSelector((state: RootState) => state.reports.noDepartments);
    const Services = useSelector((state: RootState) => state.reports.services);

    const centers = useSelector((state: RootState) => state.reports.centers);
    const projects = useSelector((state: RootState) => state.reports.projects);
    const structure = useSelector((state: RootState) => state.reports.structure);


    const navigation = [
        {
            Img: Document,
            step: 0
        },
        {
            Img: Team,
            step: 1
        },
        {
            Img: Filter,
            step: 2
        }
    ]

    const SelectAll = (data: Array<CheckboxItem>, set: Function) => {
        data.map(item => {
            if (!item.isSelected) {
                let id = item.id
                dispatch(set({ id, oneChoise: false }))
            }
        })
    }

    const [dateFrom, setDateFrom] = useState<Date>(new Date)
    const [dateBefore, setDateBefore] = useState<Date>(new Date)

    return (
        <div className="p-[20px] flex flex-col gap-[10px] ">
            <div className="flex items-center gap-[10px]">
                {
                    navigation.map(item => (
                        <button onClick={() => { setFilterStep(item.step) }} className={clsx('w-[35px] h-[35px] transition-all duration-300 flex items-center justify-center rounded-[11px] bg-[#ECEEF1]', item.step === filterStep && '!bg-[#121212]')}>
                            <item.Img className={clsx('w-[19px] h-[19px] *:duration-300 *:transition-all', item.step === filterStep && '*:fill-[#FAFAFA]')} />
                        </button>
                    ))
                }
            </div>

            {filterStep == 0 && (
                <SimpleBar className="h-[calc(100vh-320px)]">
                    <div className="flex flex-col gap-[10px]">
                        <div className="flex items-center justify-between border-b-[#E5E7EA] border-solid border-0 border-b pb-[10px]">
                            <span className="font-medium ">Параметры</span>
                            <button onClick={() => { setFilterStep(null) }}>
                                <CloseImg className="*:fill-[#BDBFC7] h-[18px] w-[18px]" />
                            </button>
                        </div>
                        <div className="rounded-[23px] p-[13px] bg-[#ECEEF1] flex flex-col gap-[6px]">
                            <div className=" flex items-center gap-[20px] justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                                <span className="text-[#9B9FAD] text-[12px] font-medium whitespace-nowrap">Дата от</span>
                                <InputDate ClassCalendar="!w-[260px] translate-x-[23px]" value={dateFrom} change={setDateFrom} />
                            </div>
                            <div className=" flex items-center gap-[20px] justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                                <span className="text-[#9B9FAD] text-[12px] font-medium whitespace-nowrap">Дата до</span>
                                <InputDate ClassCalendar="!w-[260px] translate-x-[23px]" value={dateBefore} change={setDateBefore} />
                            </div>
                        </div>
                        <div className="rounded-[23px] p-[13px] bg-[#ECEEF1] flex flex-col gap-[6px]">

                            <div className="flex items-center gap-[20px] justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                                <span className="text-[#9B9FAD] text-[12px] font-medium">Компания</span>
                                <div className="flex items-center gap-[6px]">
                                    <span className=" text-[12px] font-medium">{localStorage.getItem("CompanyName")}</span>
                                    <Lock />
                                </div>
                            </div>

                            <InputSelect data={centers} title="Центры затрат" default="Не выбрано" change={(id: number) => dispatch(setCenters({ id, oneChoise: true }))} />

                            <InputSelect data={projects} title="Проект" default="Не выбрано" change={(id: number) => dispatch(setProjects({ id, oneChoise: true }))} />

                            <InputSelect data={structure} title="Структурные аналитики " default="Не выбрано" change={(id: number) => dispatch(setStructure({ id, oneChoise: true }))} />

                        </div>
                    </div>
                </SimpleBar>

            )}

            {filterStep == 1 && (
                <SimpleBar className="h-[calc(100vh-320px)]">
                    <div className="flex flex-col gap-[10px]">
                        <div className="flex items-center justify-between border-b-[#E5E7EA] border-solid border-0 border-b pb-[10px]"></div>
                        <div className="flex items-center justify-between">
                            <span className="font-medium">Отделы</span>
                            <button
                                onClick={() => SelectAll(Departments.data, setDepartments)}>
                                <span className="text-[#787B86] text-[10px] font-medium">Выбрать все</span>
                            </button>
                        </div>
                        <div className="rounded-[23px] p-[13px] bg-[#ECEEF1] flex flex-col gap-[6px]">

                            <Checkbox
                                items={Departments.data}
                                onChange={(id: number) => dispatch(setDepartments({ id, oneChoise: false }))}
                            />

                        </div>
                        <div className="flex items-center justify-between">
                            <span className="font-medium">Без отдела</span>
                            <button
                                onClick={() => SelectAll(NoDepartments.data, setNoDepartments)}>
                                <span className="text-[#787B86] text-[10px] font-medium">Выбрать всеx</span>
                            </button>
                        </div>
                        <div className="rounded-[23px] p-[13px] bg-[#ECEEF1] flex flex-col gap-[6px]">

                            <Checkbox
                                items={NoDepartments.data}
                                onChange={(id: number) => dispatch(setNoDepartments({ id, oneChoise: false }))}
                            />

                        </div>
                    </div>
                </SimpleBar>
            )}


            {filterStep == 2 && (
                <SimpleBar className="h-[calc(100vh-320px)]">
                    <div className="flex flex-col gap-[10px] ">
                        <div className="flex items-center justify-between border-b-[#E5E7EA] border-solid border-0 border-b pb-[10px]">
                            <span className="font-medium ">Услуги</span>
                            <button onClick={() => { setFilterStep(null) }}>
                                <CloseImg className="*:fill-[#BDBFC7] h-[18px] w-[18px]" />
                            </button>
                        </div>
                        <div className="rounded-[23px] p-[13px] bg-[#ECEEF1] flex flex-col gap-[6px]">

                            <Checkbox
                                items={Services.data}
                                onChange={(id: number) => dispatch(setServices({ id, oneChoise: false }))}
                            />

                        </div>
                    </div>
                </SimpleBar>
            )}



        </div>
    );
};

export { ServicesFilters };