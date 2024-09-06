import {useSelector} from "react-redux";
import {RootState} from "@/app/config/store";
import {RegistrationCompanyFirst} from "@/widgets/registration/registration-company/UI/registration-company-first";
import {RegistrationCompanySecond} from "@/widgets/registration/registration-company/UI/registration-company-second";

const RegistrationCompany = () => {
    const {progress, page} = useSelector((state: RootState) => state.registrationCompany);

    return (
        <div className="flex flex-col items-center justify-center gap-5 h-[calc(100%-110px)]">
            {page === 1 ? <RegistrationCompanyFirst /> : null}
            {page === 2 ? <RegistrationCompanySecond /> : null}
            <div className="w-[700px] flex items-center gap-[5px]">
                <div
                    className="transition-all duration-300 h-2 rounded-[7px] bg-blue"
                    style={{ width: `${progress * 25}%` }}
                ></div>
                <div
                    className="transition-all duration-300 h-2 rounded-[7px] bg-[#C0C7D1]"
                    style={{ width: `${100 - progress * 25}%` }}
                ></div>
            </div>
        </div>
    );
};

export {RegistrationCompany};
