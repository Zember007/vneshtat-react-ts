import { Sidebar } from "@/widgets/sidebar";
import { Header } from "@/widgets/header";
import SuccessImg from "@/assets/icons/success-filled.svg?react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/config/store";
import { useNavigate } from "react-router-dom";

const BasicLayout = ({ component }: { component: JSX.Element }) => {
    const employeeId = localStorage.getItem("EmployeeId");
    const { companies } = useSelector((state: RootState) => state.user);


    const navigate = useNavigate();

    return (
        <div className={"flex flex-row justify-center items-center"}>
            {employeeId ? (
                <div className={"pt-5 pb-5 flex  gap-7 w-full px-16 ultra:px-24 h-[100vh] min-h-[664px] "}>

                    <div
                        className={`h-full`}>
                        <Sidebar />
                    </div>

                    <div
                        className={`h-full grow w-full flex flex-col gap-5 transition-all duration-300`}>
                        <Header />
                        {component}
                    </div>
                </div>
            ) : (
                <div className={"h-screen flex items-center"}>
                    <div className={"flex flex-col gap-6"}>
                        <h1 className={"text-[30px] text-center"}>В какую компанию войти?</h1>
                        <form className={"flex items-center justify-center w-full gap-4 relative"} autoComplete={"on"}>
                            {companies?.map((item) => (
                                <div className={"bg-primary p-6 rounded-[35px] w-[320px]"} key={item.EmployeeId}>
                                    <div className="w-[95px] h-[95px] flex items-center justify-center rounded-[50%] border border-solid border-[#E5E7EA]">
                                        <span className="font-medium text-[54px] text-[#9B9FAD]">
                                            {item.CompanyName.split(' ')[0][0]}
                                        </span>
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
                                            navigate("/")
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
            )}
        </div>
    );
};

export default BasicLayout;