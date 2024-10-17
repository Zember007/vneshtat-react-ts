import { PassengerItem } from "@/shared/UI";
import PlusImg from '@/assets/icons/plus.svg?react'

const ServiceTeam = () => {
    return (
        <div className="h-full flex flex-col justify-between">

            <div className="flex flex-col gap-[10px]">
                <PassengerItem id={0} delete={() => { }} internationalPassport="2321312" name="Бойко" passport="213123123" surname="Игорь" />
                <PassengerItem id={1} delete={() => { }} internationalPassport="2321312" name="Бойко" passport="213123123" surname="Игорь" />
                <PassengerItem id={2} delete={() => { }} internationalPassport="2321312" name="Бойко" passport="213123123" surname="Игорь" />
            </div>

            <div className="pt-[15px] border-0 border-t border-solid border-[#E5E7EA]">
                <button className="w-full flex justify-between items-center p-[13px] border border-solid border-[#E5E7EA] rounded-[23px]">
                    <span className="text-[12px] text-[#787B86]">Добавить пассажира</span>
                    <PlusImg />
                </button>
            </div>

        </div>
    );
};

export default ServiceTeam;