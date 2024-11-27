import { RootState } from "@/app/config/store";
import { setCompanies } from "@/app/model/user.store";
import SuccessImg from "@/assets/icons/success-filled.svg?react";
import { getUserCompanies } from "@/shared/utils/methods";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const CompanyChoose = ({ select }: { select: Function }) => {

    const dispatch = useDispatch()

    const { companies } = useSelector((state: RootState) => state.user);

    const set = async () => {
        const companiesData = await getUserCompanies();
        dispatch(setCompanies(companiesData.data))
    }

    useEffect(() => {
        if(companies.length === 0) {
            set()
        }
    }, [])

    return (
        <>
            {
                companies.length > 0 &&
                <div className={"top-0 bottom-0 left-0 right-0 flex justify-center items-center fixed bg-primary z-[100]"}>
                    <div className={"flex flex-col gap-6"}>
                        <h1 className={"text-[30px] text-center"}>В какую компанию войти?</h1>
                        <form className={"flex items-center justify-center w-full gap-4 relative"} autoComplete={"on"}>
                            {companies?.map((item) => (
                                <div className={"bg-primary p-6 rounded-[35px] w-[320px]"} key={item.EmployeeId}>
                                    <div className={"flex justify-center items-center"}>
                                        <div className="w-[95px] h-[95px] flex items-center justify-center rounded-[50%] border border-solid border-[#E5E7EA]">
                                            <span className="font-medium text-[54px] text-[#9B9FAD]">
                                                {item.CompanyName.split(' ')[0][0]}
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        className={"flex items-center justify-between pl-6 py-4 pr-4 mt-5 h-[50px] rounded-[16px] border border-solid border-[#E5E7EA]"}>
                                        <h2 className={"text-lg text-[#9B9FAD]"}>{item.CompanyName}</h2>
                                        <SuccessImg className={"min-w-6 min-h-6 blue-fill"} />
                                    </div>
                                    <button
                                        className={"w-full flex justify-center items-center py-3 mt-2.5 h-[50px] rounded-primary bg-[#292933]"}
                                        onClick={() => {
                                            localStorage.setItem("EmployeeId", item.EmployeeId.toString());
                                            localStorage.setItem("CompanyName", item.CompanyName.toString());
                                            select()
                                        }}
                                    >
                                        <p className={`text-lg font-medium text-primary`}>Войти</p>
                                    </button>
                                </div>
                            ))}
                        </form>
                        <p className={"text-base text-center font-medium text-[#9B9FAD]"}>Вы всегда можете переключить
                            компанию в
                            Личном кабинете</p>
                    </div>
                </div>
            }
        </>
    );
};

export { CompanyChoose };