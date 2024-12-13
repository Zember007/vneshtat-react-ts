import {Link, useLocation} from "react-router-dom";
import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import HomeImg from "@/assets/icons/home.svg?react";
import SwapImg from "@/assets/icons/swap.svg?react";
import CopyImg from "@/assets/icons/copy.svg?react";
import MessageImg from "@/assets/icons/message.svg?react";
import JobImg from "@/assets/icons/job.svg?react";
import ScopeImg from "@/assets/icons/scope.svg?react";
import SettingsImg from "@/assets/icons/settings.svg?react";
import RightImg from "@/assets/icons/arrow-right.svg?react";
import OptionsImg from "@/assets/icons/options.svg?react"
import {useSelector} from "react-redux";
import LogoText from "@/assets/icons/vneshtat.svg?react";
import {RootState} from "@/app/config/store";
import logoAnimation from "@/assets/animation/logo-animation.json"
import lottie, {AnimationItem} from 'lottie-web';

const Sidebar = ({isOpen, setIsOpen}: {isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>}) => {
    const {fullname} = useSelector((state: RootState) => state.user);
    const [isButtonHovered, setIsButtonHovered] = useState(false);
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

    useEffect(() => {
        if (isOpen && animationRef.current) {
            // Если сайдбар открыт, запускаем анимацию вверх
            isAnimating.current = true;
            animationRef.current.goToAndStop(0, true);
            animationRef.current.setDirection(1);
            animationRef.current.play();
        } else if (!isOpen && animationRef.current) {
            // Если сайдбар закрыт, запускаем анимацию вниз
            isAnimating.current = true;
            animationRef.current.setDirection(-1);
            animationRef.current.play();
        }
    }, [isOpen]);

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

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <div
            className={`flex flex-col gap-5 items-center pt-4 min-w-fit ultra:w-full w-fit max-w-[100px] h-[calc(100vh-60px)] ${isOpen ? "!min-w-[210px] !w-[210px] !max-w-[210px] absolute z-10" : "min-w-[100px]"}`}>
            <div className="flex items-center justify-center relative">
                <Link to={"/"}
                      className={`flex items-center ${isOpen ? "-translate-x-[73px]" : ""} logo-animation-container`}
                      ref={containerRef}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}>
                </Link>
                <div className={`absolute ${isOpen ? "-left-[38px]" : "left-3"} w-[140px] h-[18px] mb-3 overflow-hidden`}>
                    <div className={`flex ${isOpen ? "justify-end" : "justify-start"}`}>
                        <LogoText className={`logo-text h-full w-[125px] ${isOpen ? "open" : ""}`} />
                    </div>
                </div>
            </div>
            <div
                className={`transition-all duration-400 w-full h-full flex flex-col items-center gap-2.5 py-5 px-2.5 ultra:gap-7 bg-primary ${isOpen ? "rounded-[26px]" : "rounded-primary"}`}>
                <div className={`w-full flex flex-col gap-2.5 ultra:gap-7`}>
                    <Link to={"/"}
                          onClick={handleLinkClick}
                          className={`min-h-[45px] h-[45px] flex items-center justify-center p-2.5 ultra:px-5 ${isOpen ? "flex items-center justify-between w-full rounded-primary hover:bg-secondary transition group" : "rounded-primary hover:bg-secondary transition group"}`}>
                        <div className="flex gap-2.5 items-center">
                            <HomeImg
                                className={`blue-fill-hover transition min-w-5 min-h-5 ultra:min-w-7 ultra:min-h-7 ${location === "/" && "blue-fill"}`}/>
                            {isOpen && <p className={`text-sm ${location === "/" && "text-blue"}`}>Пульс</p>}
                        </div>
                        {isOpen && (
                            <div className={"h-8 w-8 bg-primary flex items-center justify-center rounded-[9px]"}>
                                <p className={"text-xs text-[#787B86]"}>27</p>
                            </div>
                        )}
                    </Link>
                    <Link to={"/journeys/all"}
                          onClick={handleLinkClick}
                          className={`min-h-[45px] h-[45px] flex items-center justify-center p-2.5 ultra:px-5 ${isOpen ? "flex items-center justify-between w-full rounded-primary hover:bg-secondary transition group" : "rounded-primary hover:bg-secondary transition group"}`}>
                        <div className="flex gap-2.5 items-center">
                            <SwapImg
                                className={`blue-fill-hover transition min-w-5 min-h-5 ultra:min-w-7 ultra:min-h-7 ${location.includes("/journeys") && "blue-fill"}`}/>
                            {isOpen && <p className={`text-sm ${location.includes("/journeys")  && "text-blue"}`}>Поездка</p>}
                        </div>
                        {isOpen && (
                            <div className={"h-8 w-8 bg-primary flex items-center justify-center rounded-[9px]"}>
                                <p className={"text-xs text-[#787B86]"}>15</p>
                            </div>
                        )}
                    </Link>
                    <Link to={"/templates/all"}
                          onClick={handleLinkClick}
                          className={`min-h-[45px] h-[45px] flex items-center justify-center p-2.5 ultra:px-5 ${isOpen ? "flex items-center justify-between w-full rounded-primary hover:bg-secondary transition group" : "rounded-primary hover:bg-secondary transition group"}`}>
                        <div className="flex gap-2.5 items-center">
                            <CopyImg
                                className={`blue-fill-hover transition min-w-5 min-h-5 ultra:min-w-7 ultra:min-h-7 ${location.includes("/templates") && "blue-fill"}`}/>
                            {isOpen && <p className={`text-sm ${location.includes("/templates") && "text-blue"}`}>Шаблоны</p>}
                        </div>
                        {isOpen && (
                            <div className={"h-8 w-8 bg-primary flex items-center justify-center rounded-[9px]"}>
                                <p className={"text-xs text-[#787B86]"}>9</p>
                            </div>
                        )}
                    </Link>
                </div>
                <hr className={"h-[1px] w-full bg-[#e5e7ea]"}/>
                <div className={`w-full flex flex-col gap-2.5 ultra:gap-7`}>
                    <Link to={"/messages"}
                          onClick={handleLinkClick}
                          className={`min-h-[45px] h-[45px] flex items-center justify-center p-2.5 ultra:px-5 ${isOpen ? "flex items-center justify-between w-full rounded-primary hover:bg-secondary transition group" : "rounded-primary hover:bg-secondary transition group"}`}>
                        <div className="flex gap-2.5 items-center">
                            <MessageImg
                                className={`blue-fill-hover transition min-w-5 min-h-5 ultra:min-w-7 ultra:min-h-7 ${location.includes("/messages") && "blue-fill"}`}/>
                            {isOpen &&
                                <p className={`text-sm ${location.includes("/messages") && "text-blue"}`}>Мессенджер</p>}
                        </div>
                        {isOpen && (
                            <div className={"h-8 w-8 bg-primary flex items-center justify-center rounded-[9px]"}>
                                <p className={"text-xs text-[#787B86]"}>3</p>
                            </div>
                        )}
                    </Link>
                    <Link to={"/jobs/company"}
                          onClick={handleLinkClick}
                          className={`min-h-[45px] h-[45px] flex items-center justify-center p-2.5 ultra:px-5 ${isOpen ? "flex items-center justify-between w-full rounded-primary hover:bg-secondary transition group" : "rounded-primary hover:bg-secondary transition group"}`}>
                        <div className="flex gap-2.5 items-center">
                            <JobImg
                                className={`blue-fill-hover transition min-w-5 min-h-5 ultra:min-w-7 ultra:min-h-7 ${location.includes("/jobs") && "blue-fill"}`}/>
                            {isOpen && <p className={`text-sm ${location .includes("/jobs") && "text-blue"}`}>Компания</p>}
                        </div>
                        {isOpen && (
                            <div className={"h-8 w-8 bg-primary flex items-center justify-center rounded-[9px]"}>
                                <p className={"text-xs text-[#787B86]"}>8</p>
                            </div>
                        )}
                    </Link>
                </div>
                <hr className={"h-[1px] w-full bg-[#e5e7ea]"}/>
                <div className={`w-full flex flex-col gap-2.5 ultra:gap-7`}>
                    <Link to={"/scope"}
                          onClick={handleLinkClick}
                          className={`min-h-[45px] h-[45px] flex items-center justify-center p-2.5 ultra:px-5 ${isOpen ? "flex items-center justify-between w-full rounded-primary hover:bg-secondary transition group" : "rounded-primary hover:bg-secondary transition group"}`}>
                        <div className="flex gap-2.5 items-center">
                            <ScopeImg
                                className={`blue-fill-hover transition min-w-5 min-h-5 ultra:min-w-7 ultra:min-h-7 ${location === "/scope" && "blue-fill"}`}/>
                            {isOpen && <p className={`text-sm ${location === "/scope" && "text-blue"}`}>Учебник</p>}
                        </div>
                        {isOpen && (
                            <div className={"h-8 w-8 bg-primary flex items-center justify-center rounded-[9px]"}>
                                <p className={"text-xs text-[#787B86]"}>12</p>
                            </div>
                        )}
                    </Link>
                    <Link to={"/settings"}
                          onClick={handleLinkClick}
                          className={`min-h-[45px] h-[45px] flex items-center justify-center p-2.5 ultra:px-5 ${isOpen ? "flex items-center justify-between w-full rounded-primary hover:bg-secondary transition group" : "rounded-primary hover:bg-secondary transition group"}`}>
                        <div className="flex gap-2.5 items-center">
                            <SettingsImg
                                className={`blue-fill-hover transition min-w-5 min-h-5 ultra:min-w-7 ultra:min-h-7 ${location.includes("/settings") && "blue-fill"}`}/>
                            {isOpen && <p className={`text-sm ${location.includes("/settings") && "text-blue"}`}>Настройки</p>}
                        </div>
                        {isOpen && (
                            <div className={"h-8 w-8 bg-primary flex items-center justify-center rounded-[9px]"}>
                                <p className={"text-xs text-[#787B86]"}>7</p>
                            </div>
                        )}
                    </Link>
                </div>
                {!isOpen && <hr className={"h-[1px] w-full bg-[#e5e7ea]"}/>}
                <button onClick={() => setIsOpen((prev) => !prev)}
                        onMouseEnter={() => setIsButtonHovered(true)}
                        onMouseLeave={() => setIsButtonHovered(false)}
                        className={`${isOpen ? "w-full pl-2.5 mt-5 ultra:pl-5 ultra:mt-10" : "mt-2.5"} flex gap-2.5 items-center`}>
                    <RightImg
                        className={`blue-fill-hover transition ultra:min-w-7 ultra:min-h-7 ${isButtonHovered && "blue-fill"} ${isOpen ? "rotate-180" : "rotate-0"}`}/>
                    {isOpen && <p className={`text-sm text-[#787B86] ${isButtonHovered && "text-blue"}`}>Свернуть</p>}
                </button>
            </div>
            {isOpen ? (
                <div
                    className={"w-full rounded-[23px] min-h-[65px] ultra:min-h-[92px] py-3 pl-[13px] pr-4 flex justify-between items-center bg-black"}>
                    <div className={"flex items-center gap-2.5"}>
                        <div className={"bg-section h-[39px] w-[39px] ultra:h-[60px] ultra:w-[60px] flex items-center justify-center rounded-[100%] py-1.5 px-2"}>
                            <p className={"text-lg tracking-[-0.1em]"}>{fullname.name[0].toUpperCase()}{fullname.surname[0].toUpperCase()}</p>
                        </div>
                        <span className={"flex flex-col"}>
                            <h3 className={"text-base text-primary capitalize"}>{fullname.name} {fullname.surname[0].toUpperCase()}.</h3>
                            <p className={"text-[11px] text-primary"}>администратор</p>
                        </span>
                    </div>
                    <Link to={'/profile'}>
                        <OptionsImg/>
                    </Link>
                </div>
            ) : (
                <Link to={'/profile'} className={"w-full min-h-[65px] ultra:min-h-[92px] rounded-[23px] flex justify-center items-center bg-black"}>
                    <div className={"bg-section h-[39px] w-[39px] ultra:h-[60px] ultra:w-[60px] flex items-center justify-center rounded-[100%] py-1.5 px-2"}>
                        {fullname.name.length && fullname.surname.length ? (
                            <p className={"text-lg tracking-[-0.1em]"}>{fullname.name[0].toUpperCase()}{fullname.surname[0].toUpperCase()}</p>
                        ) : null}
                    </div>
                </Link>
            )}
        </div>
    );
};

export {Sidebar};
