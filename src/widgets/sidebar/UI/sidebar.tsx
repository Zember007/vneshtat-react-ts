import { Link, useLocation } from "react-router-dom";
import {useEffect, useRef, useState } from "react";
import HomeImg from "@/assets/icons/sidebar_pulse.svg?react";
import SwapImg from "@/assets/icons/sidebar_jorneys.svg?react";
import CopyImg from "@/assets/icons/sidebar_teamplate.svg?react";
import MessageImg from "@/assets/icons/sidebar_messenger.svg?react";
import JobImg from "@/assets/icons/sidebar_company.svg?react";
import ScopeImg from "@/assets/icons/sidebar_textbook.svg?react";
import SettingsImg from "@/assets/icons/sidebar_settings.svg?react";
import OptionsImg from "@/assets/icons/options.svg?react";
import UserImg from "@/assets/icons/user.svg?react";
import ExitImg from "@/assets/icons/exit.svg?react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/config/store";
import logoAnimation from "@/assets/animation/logo-animation.json"
import lottie, { AnimationItem } from 'lottie-web';
import { revokeAccessToken } from "@/shared/utils/methods";

const Sidebar = () => {
    const { fullname } = useSelector((state: RootState) => state.user);
    const [openOptions, setOpenOptions] = useState(false);
    const location = useLocation().pathname;
    const containerRef = useRef<HTMLAnchorElement | null>(null);
    const animationRef = useRef<AnimationItem | null>(null);
    const isAnimating = useRef(false);
    let completedCount = useRef(0);
    const timeoutId = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        animationRef.current = lottie.loadAnimation({
            container: containerRef.current!,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: logoAnimation
        });

        animationRef.current.addEventListener('complete', () => {
            completedCount.current += 1;
            isAnimating.current = false;
        });

        return () => {
            animationRef.current?.destroy();
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
        };
    }, []);


    const handleMouseEnter = () => {
        if (animationRef.current && !isAnimating.current && completedCount.current % 2 === 0) {
            isAnimating.current = true;
            animationRef.current.goToAndStop(0, true);
            animationRef.current.setDirection(1);
            animationRef.current.play();
        }
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }
    };

    const handleMouseLeave = () => {
        if (animationRef.current) {
            timeoutId.current = setTimeout(() => {
                if (isAnimating.current) {
                    animationRef.current?.addEventListener('complete', () => {
                        if (animationRef.current) {
                            animationRef.current.setDirection(-1);
                            animationRef.current.play();
                        }
                    });
                } else {
                    if (animationRef.current) {
                        animationRef.current.setDirection(-1);
                        animationRef.current.play();
                    }
                }
            }, 1000);
        }
    };


    return (
        <div
            className={`flex flex-col gap-[35px] h-full w-[160px]`}>
            <div className="relative ">
                <Link to={"/"}
                    className={`flex items-center logo-animation-container`}
                    ref={containerRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                </Link>
            </div>
            <div
                className={`flex flex-col gap-[20px] grow`}>
                <div className={`w-full flex flex-col gap-[6px] ultra:gap-7`}>
                    <Link to={"/"}
                        
                        className={`flex items-center p-2.5 gap-[10px] px-[13px] py-[11px] rounded-primary hover:bg-secondary transition group ${location === "/" && "bg-secondary"}`}>
                        <HomeImg
                            className={`group-hover:*:stroke-blue transition w-[22px] h-[22px] ${location === "/" && "blue-stroke"}`} />
                        <p className={`text-[#787B86] font-medium group-hover:text-blue ${location === "/" && "text-blue"}`}>Пульс</p>

                    </Link>
                    <Link to={"/journeys/all"}
                        
                        className={`flex items-center p-2.5 gap-[10px] px-[13px] py-[11px] rounded-primary hover:bg-secondary transition group ${location.includes("/journeys") && "bg-secondary"}`}>
                        <SwapImg
                            className={`group-hover:*:stroke-blue transition w-[22px] h-[22px] ${location.includes("/journeys") && "blue-stroke"}`} />
                        <p className={`text-[#787B86] font-medium group-hover:text-blue ${location.includes("/journeys") && "text-blue"}`}>Поездка</p>

                    </Link>

                    <Link to={"/templates/all"}
                        
                        className={`flex items-center p-2.5 gap-[10px] px-[13px] py-[11px] rounded-primary hover:bg-secondary transition group ${location.includes("/templates") && "bg-secondary"}`}>
                        <CopyImg
                            className={`group-hover:*:fill-blue transition w-[22px] h-[22px] ${location.includes("/templates") && "blue-fill"}`} />
                        <p className={`text-[#787B86] font-medium group-hover:text-blue ${location.includes("/templates") && "text-blue"}`}>Шаблоны</p>

                    </Link>
                </div>
                <hr className={"h-[1px] w-full bg-[#e5e7ea]"} />
                <div className={`w-full flex flex-col gap-[6px] ultra:gap-7`}>
                    <Link to={"/messages"}
                        
                        className={`flex items-center p-2.5 gap-[10px] px-[13px] py-[11px] rounded-primary hover:bg-secondary transition group ${location.includes("/messages") && "bg-secondary"}`}>
                        <MessageImg
                            className={`group-hover:*:fill-blue transition w-[22px] h-[22px] ${location.includes("/messages") && "blue-fill"}`} />
                        <p className={`text-[#787B86] font-medium group-hover:text-blue ${location.includes("/messages") && "text-blue"}`}>Мессенджер</p>

                    </Link>

                    <Link to={"/jobs/company"}
                        
                        className={`flex items-center p-2.5 gap-[10px] px-[13px] py-[11px] rounded-primary hover:bg-secondary transition group ${location.includes("/jobs") && "bg-secondary"}`}>
                        <JobImg
                            className={`group-hover:*:stroke-blue transition w-[22px] h-[22px] ${location.includes("/jobs") && "blue-stroke"}`} />
                        <p className={`text-[#787B86] font-medium group-hover:text-blue ${location.includes("/jobs") && "text-blue"}`}>Компания</p>

                    </Link>
                </div>
                <hr className={"h-[1px] w-full bg-[#e5e7ea]"} />
                <div className={`w-full flex flex-col gap-[6px] ultra:gap-7`}>
                    <Link to={"/scope"}
                        
                        className={`flex items-center p-2.5 gap-[10px] px-[13px] py-[11px] rounded-primary hover:bg-secondary transition group ${location.includes("/scope") && "bg-secondary"}`}>
                        <ScopeImg
                            className={`group-hover:*:stroke-blue transition w-[22px] h-[22px] ${location.includes("/scope") && "blue-stroke"}`} />
                        <p className={`text-[#787B86] font-medium group-hover:text-blue ${location.includes("/scope") && "text-blue"}`}>Учебник</p>

                    </Link>
                    <Link to={"/settings"}
                        
                        className={`flex items-center p-2.5 gap-[10px] px-[13px] py-[11px] rounded-primary hover:bg-secondary transition group ${location.includes("/settings") && "bg-secondary"}`}>
                        <SettingsImg
                            className={`group-hover:*:stroke-blue transition w-[22px] h-[22px] ${location.includes("/settings") && "blue-stroke"}`} />
                        <p className={`text-[#787B86] font-medium group-hover:text-blue ${location.includes("/settings") && "text-blue"}`}>Настройки</p>

                    </Link>
                </div>
            </div>

            {fullname.surname && fullname.name &&
                <div className="flex items-center justify-between rounded-[13px] p-[5px] bg-[#ECEEF1] relative">
                    <div className={`absolute flex flex-col gap-[5px] top-[-10px] rounded-[23px] p-[13px] translate-y-[-100%] bg-[#F5F5F5D1] trnsition-all duration-300 ${!openOptions && 'opacity-0 invisible'}`}
                        style={{
                            boxShadow: '0px 4px 6.5px 0px rgba(0, 0, 0, 0.04)',
                            backdropFilter: 'blur(4.849999904632568px)'
                        }}
                    >
                        <Link to={'/profile'}
                        onClick={() => {setOpenOptions(prev => !prev)}}
                            className="py-[6px] px-[9px] rounded-[13px] bg-[#ECEEF1] flex gap-[5px] items-center"
                        >
                            <UserImg className="w-[19px] h-[19px] *:fill-[#8C909C]" />
                            <span className="text-[12px] text-[#787B86] font-medium whitespace-nowrap">Открыть профиль</span>
                        </Link>
                        <button onClick={() => {setOpenOptions(prev => !prev);revokeAccessToken()}}
                            className="py-[6px] px-[9px] rounded-[13px] bg-[#ECEEF1] flex gap-[5px] items-center"
                        >
                            <div className="p-[3px]">
                                <ExitImg className=" *:fill-[#FF64A3]" />
                            </div>
                            <span className="text-[12px] text-[#FF64A3] font-medium whitespace-nowrap">Выйти из аккаунта</span>
                        </button>
                    </div>
                    <div className="text-[#9B9FAD] w-[37px] h-[37px] rounded-[13px] bg-primary flex items-center justify-center">
                        {fullname.name[0].toLocaleUpperCase()}{fullname.surname[0].toLocaleUpperCase()}
                    </div>
                    <span className="text-[13px] font-medium text-[#787B86]">{fullname.name} {fullname.surname[0].toLocaleUpperCase()}.</span>
                    <button
                        onClick={() => {setOpenOptions(prev => !prev)}}>
                        <OptionsImg className="w-[18px] h-[18px] rotate-[90deg] *:fill-[#8C909C]" />
                    </button>
                </div>
            }
        </div>
    );
};

export { Sidebar };
