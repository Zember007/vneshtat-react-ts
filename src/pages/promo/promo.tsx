import VneshtatImg from "@/assets/icons/vneshtat.svg?react";
import {PromoPopups} from "@/widgets/promo/promo-popups";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/config/store";
import {setIsOpen} from "@/widgets/promo/promo-popups/model/promo.store";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";

const Promo = () => {
    const isOpen = useSelector((store: RootState) => store.promo.isOpen);
    const isTryPage = useLocation().pathname === "/try"
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isTryPage) dispatch(setIsOpen(isTryPage))
    })

    const handleTryClick = () => {
        dispatch(setIsOpen(true));
        navigate("/try")
    };

    return (
        <div className={"h-[calc(100vh-120px)] px-[100px] py-[60px] bg-section"}>
            <header className={"flex items-center justify-between h-10"}>
                <VneshtatImg/>
                <div className={"flex items-center gap-2"}>
                    <span className={"w-[168px] h-10 bg-primary rounded-primary"}/>
                    <span className={"w-[168px] h-10 bg-primary rounded-primary"}/>
                    <span className={"w-[168px] h-10 bg-primary rounded-primary"}/>
                </div>
                <div className={"flex items-center gap-2"}>
                    <button
                        className={"h-10 px-10 py-2 flex items-center justify-center border border-solid border-[#9B9FAD] rounded-[14px]"}
                        onClick={() => navigate("/sign-in")}>
                        <p className={"text-[17px] text-[#9B9FAD]"}>Войти</p>
                    </button>
                    <button className={"h-10 px-10 py-2 flex items-center justify-center rounded-[14px] bg-[#292933]"}
                            onClick={handleTryClick}>
                        <p className={"text-[17px] text-primary"}>Попробовать</p>
                    </button>
                </div>
            </header>
            <div className={"h-full grid grid-cols-12 grid-rows-3 gap-3 mt-[70px]"}>
                <div className={"col-span-5 row-span-3 bg-primary rounded-[35px]"}></div>
                <div className={"col-span-4 bg-primary rounded-[26px]"}></div>
                <div className={"col-span-3 bg-primary rounded-[26px]"}></div>
                <div className={"col-span-5 row-span-2 bg-primary rounded-[26px]"}></div>
                <div className={"col-span-2 row-span-2 bg-primary rounded-[26px]"}></div>
            </div>
            {isOpen ? <PromoPopups/> : null}
        </div>
    )
};

export default Promo;