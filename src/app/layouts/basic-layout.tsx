import {Sidebar} from "@/widgets/sidebar";
import {Header} from "@/widgets/header";
import {useState} from "react";

1
import AlphaImg from "@/assets/icons/alpha.svg?react";
import SuccessImg from "@/assets/icons/success-filled.svg?react";
import {useSelector} from "react-redux";
import {RootState} from "@/app/config/store";
import {useNavigate} from "react-router-dom";

const BasicLayout = ({component}: { component: JSX.Element }) => {
    const [isOpen, setIsOpen] = useState(false);
    const employeeId = localStorage.getItem("EmployeeId");
    const {companies} = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    const handleCloseSidebar = () => {
        if (isOpen) {
            setIsOpen(false);
        }
    };

    return (
        <div className={"flex flex-row justify-center items-center"}>
            {employeeId ? (
                <div className={"pt-5 pb-10 flex flex-row gap-7 overflow-hidden w-full px-16 ultra:px-24"}>
                    <div
                        className={`fixed inset-0 transition-all ${isOpen ? "bg-opacity-50 z-10 bg-[#1212121A]" : "bg-opacity-0 z-[-1] bg-primary"}`}
                        onClick={handleCloseSidebar}
                    />

                    <div
                        className={`absolute max-h-[calc(100vh-60px)] z-10 ${isOpen ? "w-[calc(100vw-116px)] ultra:w-[calc(100vw-160px)]" : "w-0"}`}>
                        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
                        <div
                            className={`overflow-hidden transition-all ml-[241px] mt-[85px] ultra:ml-[255px] flex flex-col gap-4 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                            <div className={"h-[calc(50vh-115px)] w-full bg-primary rounded-primary"}></div>
                            <div className={"flex gap-4"}>
                                <div className={"h-[calc(50vh-115px)] w-[70%] bg-primary rounded-primary"}></div>
                                <div className={"h-[calc(50vh-115px)] w-full bg-primary rounded-primary"}></div>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`h-[calc(100vh-60px)] w-full flex flex-col gap-5 transition-all duration-300 ${isOpen ? "bg-[#1212121A] blur-md ml-[84px] ultra:ml-[110px]" : "ml-[84px] ultra:ml-[110px]"}`}>
                        <Header/>
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
                                    <div className={"flex justify-center items-center"}>
                                        <AlphaImg/>
                                    </div>
                                    <div
                                        className={"flex items-center justify-between pl-6 py-4 pr-4 mt-5 h-[50px] rounded-[16px] border border-solid border-[#E5E7EA]"}>
                                        <h2 className={"text-lg text-[#9B9FAD]"}>{item.CompanyName}</h2>
                                        <SuccessImg className={"min-w-6 min-h-6 blue-fill"}/>
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