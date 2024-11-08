import Layout from "@/app/layouts/layout";
import { useState } from "react";
import TemplateCartService from "./TemplateCartService";
import Filters from "./filters/Filters";
// import { Services } from "../utils";
import { removeService, updateService } from "../model/template.store";
import { addService } from "../model/template.store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/config/store";
import { FlightTickets } from "@/widgets/flight/flight-tickets";


const TemplateAdd = () => {

    const dispatch = useDispatch();

    const services = useSelector((state: RootState) => state.template.services);

    const [serviceActive, setServiceActive] = useState<number | null>(null)
    const [activeFilter, setActiveFilter] = useState<string | null>(null)

    const service_select = services.find(item => item.id === serviceActive)

    const clearService = (data: string, id: number) => {
        if (data == 'type') {
            dispatch(removeService(id));
        } else {
            let value = null

            if (data == 'route') {
                value = {
                    class: null,
                    items: [
                        {
                            id: 1,
                            cityFrom: null,
                            cityBefore: null
                        }
                    ]
                }
            }

            dispatch(updateService({ id: id, field: data, value: value }))
        }

    }

    return (
        <Layout
            component={
                <>
                    {activeFilter == 'filters' || activeFilter == 'option' ?
                        <FlightTickets template={true} />
                        :
                        <div className="p-[20px] bg-primary rounded-[26px] flex flex-col h-full ">
                            <div className="max-h-[calc(100vh-185px)] scroll overflow-y-auto">
                                <div className="flex flex-col gap-[15px]">
                                    {services.map((item, index) => (
                                        <>
                                            <TemplateCartService active={serviceActive === item.id ? activeFilter : null} key={item.id} data={item} clear={(data: string) => { clearService(data, item.id) }} select={(filter: string) => { setActiveFilter(filter); setServiceActive(item.id); }} />
                                            {(index !== services.length - 1 && services.length !== 0) && (
                                                <div className="flex gap-[10px] pl-[50px]">
                                                    <button className="py-[15px] px-[35px] rounded-[18px] bg-[#ECEEF1]">
                                                        <p className="text-[16px] text-[#787B86]">Добавить транспорт</p>
                                                    </button>

                                                    <button className="py-[15px] px-[35px] rounded-[18px] bg-[#ECEEF1]">
                                                        <p className="text-[16px] text-[#787B86]">Добавить точку</p>
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    ))}
                                </div>

                                <div className="flex flex-col items-center gap-[12px] my-[100px]">
                                    <button onClick={() => { dispatch(addService()) }} className="w-[255px] py-[15px] rounded-[18px] bg-[#ECEEF1]">Добавить элемент</button>
                                    <button className="w-[255px] py-[15px] rounded-[18px] bg-[#ECEEF1]">Выбрать из поездки</button>
                                </div>
                            </div>
                        </div>
                    }

                </>
            }
            information={
                <div className="p-[20px] flex flex-col gap-[20px] h-full">
                    {activeFilter && <Filters activeFilter={activeFilter} setActiveFilter={setActiveFilter} data={service_select} close={() => { }} />}
                    {!activeFilter &&
                        <p className="text-[#787B86] my-auto px-[20px]">
                            В шаблоне вы можете создавать элементы поездки и заполнять их с разной степенью подробности.
                        </p>
                    }
                </div>
            }

            navigation={
                <>
                    {!activeFilter && <div className="flex flex-col gap-[10px]">
                        <button className="py-[8px] rounded-[13px] bg-[#ECEEF1]">
                            <p className="text-[#787B86]">Создать копию шаблона</p>
                        </button>
                        <button className="py-[8px] rounded-[13px] bg-[#ECEEF1]">
                            <p className="text-[#007BFB]">Подробнее</p>
                        </button>
                        <button className="py-[8px] rounded-[13px] bg-[#ECEEF1]">
                            <p>28 570 ₽</p>
                        </button>
                        <p className="text-[12px] text-center max-w-[151px] mx-auto">Ориентировочная стоимость поездки</p>
                        <hr className="h-[1px] w-[50px] bg-[#C0C7D1] mx-auto" />
                        <button className="rounded-[18px] bg-[#121212] py-[15px]">
                            <p className="text-primary">Создать поездку из шаблона</p>
                        </button>
                    </div>}

                    {activeFilter &&
                        <button onClick={() => {
                            activeFilter === 'type' ? setActiveFilter('route') : activeFilter === 'route' ? setActiveFilter('team') : activeFilter === 'team' ? setActiveFilter('filters') : setActiveFilter(null)
                        }} className="rounded-[18px] bg-[#121212] py-[15px] w-full">
                            <p className="text-primary">
                                {activeFilter === 'type' && 'Выбрать маршрут'}
                                {activeFilter === 'route' && 'Выбрать пассажиров'}
                                {activeFilter === 'team' && 'Выбрать фильтры'}
                                {activeFilter === 'filters' && 'Вернуться к шаблону'}
                                {activeFilter === 'option' && 'Добавить в шаблон'}
                            </p>
                        </button>
                    }
                </>
            }

        />
    );
};

export { TemplateAdd };