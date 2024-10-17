
import { Checkbox } from "@/shared/UI";
import { setServiceTypes } from "../../model/template.store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/app/config/store";
import { useEffect } from "react";
import { updateService } from "../../model/template.store";

const ServiceType = ({id}:{id:number | undefined}) => {

    const dispatch = useDispatch();

    const ServiceTypes = useSelector((state: RootState) => state.template.serviceTypes)
    const ServiceTypeSelect = ServiceTypes.find(item => item.isSelected === true)

    useEffect(() => {
        dispatch(updateService({ id: id, field: 'type', value: ServiceTypeSelect?.code}));
    }, [ServiceTypeSelect])
    
    return (
        <div className="p-[13px] bg-[#ECEEF1] rounded-[23px]">

            <Checkbox
                items={ServiceTypes}
                onChange={(id: number) => dispatch(setServiceTypes({ id, oneChoise: true }))}
            />

        </div>
    );
};

export default ServiceType;