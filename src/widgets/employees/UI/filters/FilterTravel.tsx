import InputSelect from "@/widgets/jobs/UI/InputSelect";
import { setTaxi,setLevel,setReports,setAccommodation,setRight,setTickets } from "../../model/index.store";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/config/store";

const FilterTravel = () => {
    
    const dispatch = useDispatch();

    const levels = useSelector((state: RootState) => state.employees.level);

    const tickets = useSelector((state: RootState) => state.employees.tickets);

    const accommodation = useSelector((state: RootState) => state.employees.accommodation);

    const taxi = useSelector((state: RootState) => state.employees.taxi);

    const right = useSelector((state: RootState) => state.employees.right);

    const reports = useSelector((state: RootState) => state.employees.reports);

    return (
        <>
            <span className="font-medium mt-[5px]">Тревел-политика</span>
            <div className="flex flex-col gap-[6px] rounded-[23px] p-[13px] bg-[#ECEEF1]">
                <InputSelect title="Уровень" data={levels} change={(id:number) => dispatch(setLevel({id, oneChoise: true}))} />
                <InputSelect title="Билеты на поезд" data={tickets} change={(id:number) => dispatch(setTickets({id, oneChoise: true}))} />
                <InputSelect title="Проживание" data={accommodation} change={(id:number) => dispatch(setAccommodation({id, oneChoise: true}))}/>
                <InputSelect title="Такси" data={taxi} change={(id:number) => dispatch(setTaxi({id, oneChoise: true}))} />
            </div>
            <span className="font-medium mt-[5px]">Согласование</span>
            <div className="flex flex-col gap-[6px] rounded-[23px] p-[13px] bg-[#ECEEF1]">
                <InputSelect title="Поездки" data={right} change={(id:number) => dispatch(setRight({id, oneChoise: true}))} />
                <InputSelect title="Авансовые отчёты" data={reports} change={(id:number) => dispatch(setReports({id, oneChoise: true}))} />
            </div>
        </>
    );
};

export default FilterTravel;