import { RootState } from "@/app/config/store";
import { Checkbox, Dropdown } from "@/shared/UI";
import { useDispatch, useSelector } from "react-redux";
import { setLang } from "../model/settings.store";
import { Link } from "react-router-dom";

const Interface = ({ active }: { active: boolean }) => {
    const dispatch = useDispatch();

    const langs = useSelector((state: RootState) => state.settings.langs);
    const activeLang = langs.find(item => item.isSelected);

    const currency = useSelector((state: RootState) => state.settings.currency);
    const activeCurrency = currency.find(item => item.isSelected);

    const theme = useSelector((state: RootState) => state.settings.theme);
    const activeTheme = theme.find(item => item.isSelected);

    const time_zone = useSelector((state: RootState) => state.settings.time_zone);
    const TimeZoneActive = time_zone.find(item => item.isSelected);

    const time_zone_jorneys = useSelector((state: RootState) => state.settings.time_zone_jorneys);
    const TimeZoneJorneysActive = time_zone_jorneys.find(item => item.isSelected);

    return (
        <div className={`rounded-[26px] bg-primary  p-[20px]  transition-all duration-300 overflow-hidden  ${active && 'grow'}`}>

            <div className={`flex justify-between gap-[15px]`}>
                <div className={`flex flex-col transition-all duration-300 ${active && 'gap-[20px] p-[10px]'}`}>
                    <div className="flex flex-col gap-[10px]">
                        <span className={`${!active && 'text-[#787B86]'} text-[25px] font-medium`}>Настройки интерфейса</span>
                        {!active && <p className="text-[#787B86] max-w-[530px]">И подобрать все элементы шаблона в ручном режиме. У вас останется возможность создавать шаблоны услуг из существующих поездок.</p>}
                    </div>

                    <div className={`flex gap-[30px] transition-all duration-300 overflow-hidden max-h-[270px] ${!active && '!max-h-[0px]'}`}>
                        <div className="flex flex-col gap-[25px] min-w-[240px]">
                            <div className="flex flex-col gap-[5px] relative">
                                <span className="text-[#787B86] text-[14px] font-medium">Язык</span>
                                <Dropdown isAbsoluteDrop={true} title={activeLang && activeLang.content}>
                                    <Checkbox items={langs} onChange={(id: number) => dispatch(setLang(id))} />
                                </Dropdown>
                            </div>
                            <div className="flex flex-col gap-[5px] relative">
                                <span className="text-[#787B86] text-[14px] font-medium">Валюта</span>
                                <Dropdown isAbsoluteDrop={true} title={activeCurrency && activeCurrency.content}>
                                    <Checkbox items={currency} onChange={(id: number) => dispatch(setLang(id))} />
                                </Dropdown>
                            </div>
                            <div className="flex flex-col gap-[10px] relative">
                                <span className="text-[#787B86] text-[14px] font-medium">Тема интерфеса</span>
                                <Dropdown disable={true} isAbsoluteDrop={true} title={activeTheme && activeTheme.content}>
                                    <Checkbox items={theme} onChange={(id: number) => dispatch(setLang(id))} />
                                </Dropdown>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[25px] min-w-[280px]">
                            <div className="flex flex-col gap-[10px] ">
                                <span className="text-[#787B86] text-[14px] font-medium">Часовой пояс</span>
                                <div className="relative">
                                    <Dropdown isAbsoluteDrop={true} title={TimeZoneActive && TimeZoneActive.content}>
                                        <Checkbox items={time_zone} onChange={(id: number) => dispatch(setLang(id))} />
                                    </Dropdown>

                                    <div className="absolute bg-[#ECEEF1] rounded-[18px] top-0 bottom-0 flex items-center px-[20px] right-[-10px] translate-x-[100%]">
                                        <span className="text-[14px]">Moscow (UTC +3) 15:45</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-[10px] relative">
                                <span className="text-[#787B86] text-[14px] font-medium">Часовой пояс в поездках</span>
                                <Dropdown isAbsoluteDrop={true} title={TimeZoneJorneysActive && TimeZoneJorneysActive.content}>
                                    <Checkbox items={time_zone_jorneys} onChange={(id: number) => dispatch(setLang(id))} />
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>

                {!active && <Link to={'/settings'} className="text-center self-end w-[255px] rounded-[18px] bg-[#ECEEF1] py-[15px]">
                    <p>Перейти к настройкам</p>
                </Link>}

                {active && <div className="self-end flex gap-[15px]">
                    <button className="w-[255px] rounded-[18px] bg-[#ECEEF1] py-[15px]">
                        <p>Стандартные</p>
                    </button>
                    <button className="w-[255px] rounded-[18px] bg-black py-[15px]">
                        <p className="text-primary">Сохранить</p>
                    </button>
                </div>}

            </div>

        </div>
    );
};

export { Interface };