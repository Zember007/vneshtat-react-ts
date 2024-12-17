import { Checkbox, Dropdown } from "@/shared/UI";
import { setCenterCosts, setProject } from "../model/template.store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/config/store";
import Layout from "@/app/layouts/layout-jorney";
import { Link } from "react-router-dom";

const TemplateCreate = () => {
    const dispatch = useDispatch();

    const center_costs = useSelector((state: RootState) => state.template.center_costs)
    const center_costs_select = center_costs.find(item => item.isSelected === true)
    const projects = useSelector((state: RootState) => state.template.projects)
    const projects_select = projects.find(item => item.isSelected === true)

    return (

        <>
            <Layout

                block={
                    <>
                        <div className="h-full flex flex-col gap-[30px] items-start">
                            <span className="text-[25px] font-medium">Создать новый шаблон</span>
                            <div className="flex gap-[50px]">
                                <div className="flex flex-col gap-[30px]">
                                    <label className="flex flex-col gap-[10px]">
                                        <span className="text-[14px] text-[#787B86] font-medium">Название</span>

                                        <input type="text" className="w-full py-[11px] px-[20px] bg-[#ECEEF1] rounded-[13px] placeholder:text-[#787B86] text-[14px] font-medium" placeholder="Шаблон поездки #1" />
                                    </label>
                                    <div className="flex gap-[30px]">
                                        <div className="flex flex-col gap-[10px]">
                                            <span className="text-[14px] text-[#787B86] font-medium">Проект</span>
                                            <div className="py-[11px] px-[20px] bg-[#ECEEF1] rounded-[13px] w-[150px]">
                                                <p className="text-[14px] font-medium">Альфа</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-[10px]">
                                            <span className="text-[14px] text-[#787B86] font-medium">Контактное лицо</span>

                                            <div className="flex gap-[5px]">
                                                <div className="bg-[#ECEEF1] rounded-[50%] w-[40px] h-[40px] flex items-center justify-center">
                                                    <p className="text-[14px] font-medium leading-[1]">ВИ</p>
                                                </div>
                                                <div className="py-[11px] px-[20px] bg-[#ECEEF1] rounded-[13px] w-[200px]">
                                                    <p className="text-[14px] font-medium">Вознесенский Иван</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                </div>
                                <div className="flex flex-col gap-[30px] w-[250px]">
                                    <div className="flex flex-col gap-[10px] relative">
                                        <span className="text-[14px] text-[#787B86] font-medium">Проект</span>
                                        <label className="relative">
                                            <Dropdown
                                                selectedText={projects_select ? projects_select.content : 'Выбрать проект'}
                                                isAbsoluteDrop={true}
                                            >
                                                <Checkbox
                                                    items={projects}
                                                    onChange={(id: number) => dispatch(setProject({ id, oneChoise: true }))}
                                                />
                                            </Dropdown>
                                        </label>
                                    </div>

                                    <div className="flex flex-col gap-[10px] relative">
                                        <span className="text-[14px] text-[#787B86] font-medium">Центр затрат</span>
                                        <label className="relative">
                                            <Dropdown
                                                selectedText={center_costs_select ? center_costs_select.content : 'Выбрать центр затрат'}
                                                isAbsoluteDrop={true}
                                            >
                                                <Checkbox
                                                    items={center_costs}
                                                    onChange={(id: number) => dispatch(setCenterCosts({ id, oneChoise: true }))}
                                                />
                                            </Dropdown>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <Link to={'/templates/create/add'} className="py-[15px] w-[255px] bg-[#121212] rounded-[18px] self-end text-center">
                                <p className="text-primary text-[16px]">Перейти в шаблон</p>
                            </Link>
                        </div>
                    </>
                }

                block1={
                    <>
                        <div className="h-full flex flex-col gap-[30px] items-start justify-center">
                            <div className="flex flex-col gap-[15px]">
                                <span
                                    className="text-[#787B86] text-[25px] font-medium"
                                >Создать шаблон из существующей поездки</span>
                                <p
                                    className="text-[#787B86]"
                                >Вы можете использовать существующую или завершенную поездку в качестве основы для шаблона.</p>
                            </div>
                            <button className="text-[16px] bg-[#DCE0E5] rounded-[18px] py-[15px] px-[35px] self-end">Создать</button>
                        </div>
                    </>
                }

            />
        </>
    );
};

export { TemplateCreate };