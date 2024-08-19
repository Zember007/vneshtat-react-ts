import {Sidebar} from "@/widgets/sidebar";
import {Header} from "@/widgets/header";
import {useState} from "react";

const BasicLayout = ({component}: { component: JSX.Element }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={"flex flex-row justify-center overflow-hidden"}>
            <div className={"py-5 flex flex-row gap-7 overflow-hidden w-full px-8 ultra:px-24"}>
                <div
                    className={`fixed inset-0 transition-all ${isOpen ? "bg-opacity-50 z-10 bg-[#1212121A]" : "bg-opacity-0 z-[-1] bg-primary"}`}
                />

                <div className={`absolute max-h-[calc(100vh-60px)] z-10 ${isOpen ? "w-[calc(100vw-84px)] ultra:w-[calc(100vw-128px)]" : "w-0"}`}>
                    <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
                    <div
                        className={`overflow-hidden transition-all ml-[240px] mt-[85px] flex flex-col gap-4 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                        <div className={"h-[calc(50vh-115px)] w-full bg-primary rounded-primary"}></div>
                        <div className={"flex gap-4"}>
                            <div className={"h-[calc(50vh-115px)] w-[70%] bg-primary rounded-primary"}></div>
                            <div className={"h-[calc(50vh-115px)] w-full bg-primary rounded-primary"}></div>
                        </div>
                    </div>
                </div>

                <div className={`max-h-[calc(100vh-60px)] w-full flex flex-col gap-5 transition-all duration-300 ${isOpen ? "bg-[#1212121A] blur-md" : "ml-[84px]"}`}>
                    <Header/>
                    {component}
                </div>
            </div>
        </div>
    );
};

export default BasicLayout;