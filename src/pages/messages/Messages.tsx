import { Switch } from "@/shared/UI";
import BurgerImg from "@/assets/icons/burger.svg?react";
import ArchiveImg from "@/assets/icons/archive.svg?react";
import DotsImg from "@/assets/icons/options.svg?react";
import SearchImg from "@/assets/icons/search.svg?react";
import CloseImg from "@/assets/icons/close.svg?react";
import TeamImg from "@/assets/icons/team.svg?react";
import AttachmentsImg from "@/assets/icons/attachments.svg?react";
import PinImg from "@/assets/icons/pin_.svg?react";
import SendImg from "@/assets/icons/send.svg?react";
import { useEffect, useState } from "react";
import { SearchInput } from "@/shared/UI";
import { useLocation, useNavigate } from "react-router-dom";
import { ChatCart, Message } from "@/widgets/messages";
import SimpleBar from "simplebar-react";

const Messages = () => {

    const location = useLocation().pathname
    const navigate = useNavigate()

    useEffect(() => {

        if (location === '/messages' || location === '/messages/') {
            navigate('/messages/all')
        }



    }, [location])

    const [Archive, setArchive] = useState<boolean>(false)
    const [AllMessages, setAllMessages] = useState<boolean>(true)
    const [Search, setSearch] = useState<string>('')

    const [openList, setOpenList] = useState<boolean>(false)

    return (
        <div className="flex gap-[15px] grow w-full">
            <div className="p-[20px] rounded-[26px] bg-primary w-[365px] flex flex-col gap-[15px]">
                <div className="flex flex-col gap-[20px]">
                    <div className="flex items-center justify-between">
                        <Switch
                            firstChild={<BurgerImg className={"h-[19px] w-[19px]"} />}
                            secondChild={<ArchiveImg className={"h-[19px] w-[19px]"} />}
                            isSelected={Archive}
                            setter={setArchive}
                            extraChildClass={'!p-[4px]'}
                        />

                        <div className="flex items-center gap-[10px] *:text-[12px]">
                            <button onClick={() => { setAllMessages(true) }} className={AllMessages ? 'font-medium' : ''}>Все</button>
                            <button onClick={() => { setAllMessages(false) }} className={AllMessages ? '' : 'font-medium'}>Непрочитанные</button>
                        </div>
                    </div>

                    <div className="pb-[15px] border-0 border-b border-solid border-[#E5E7EA]">
                        <SearchInput placeholder="Поиск" value={Search} change={(value: string) => { setSearch(value) }} />
                    </div>
                </div>

                <div className="flex flex-col gap-[10px]">
                    <ChatCart select={() => { }} Name="Иван" Surname="Полторацкий" active={true} lastMessage="Спасибо! Спасибо! Можете пожалуйста также рассчитать, во сколько обойдется путь до туда. И было бы круто всю отчетность сразу отправить боссу, он хочет лично посмотреть на цифры и графики." lastTime="17:45" online={false} />
                    <ChatCart select={() => { }} Name="Иван" Surname="Полторацкий" active={false} lastMessage="Спасибо! Спасибо! Можете пожалуйста также рассчитать, во сколько обойдется путь до туда. И было бы круто всю отчетность сразу отправить боссу, он хочет лично посмотреть на цифры и графики." lastTime="17:45" online={true} />
                </div>
            </div>
            <div className="p-[20px] rounded-[26px] bg-primary grow flex flex-col gap-[16px]">
                <div className="flex gap-[10px]">
                    <div className="flex items-center justify-between grow px-[13px] py-[7px] bg-[#ECEEF1] rounded-[13px]">
                        <div className="flex items-center gap-[5px]">
                            <span className="text-[14px] font-medium">Иван Борисович Полторацкий</span>
                            <span className="text-[12px] font-medium text-[#007BFB]">Онлайн</span>
                        </div>
                        <span className="text-[14px] font-medium text-[#9B9FAD]">Тревел-менеджер</span>
                    </div>
                    <div className="relative">
                        <button
                            onClick={() => { setOpenList(!openList) }}
                            className="p-[8px] rounded-[11px] bg-[#ECEEF1]">
                            <SearchImg className="w-[19px] h-[19px] *:fill-[#8C909C]" />
                        </button>
                        <div className={`min-w-[140px] absolute  left-[50%] translate-x-[-50%] translate-y-[100%] bg-[#F5F5F5D1] rounded-[23px] p-[13px] flex flex-col gap-[5px] transition-all duration-300 z-[1] ${openList ? 'bottom-[-5px]' : 'bottom-[0px] opacity-0 invisible'}`}>
                            <button className="rounded-[13px] px-[9px] py-[6px] bg-[#ECEEF1] flex gap-[5px] items-center">
                                <TeamImg className="w-[18px] h-[18px] *:fill-[#8C909C]" />
                                <span className="text-[12px] font-medium">Профиль</span>
                            </button>
                            <button className="rounded-[13px] px-[9px] py-[6px] bg-[#ECEEF1] flex gap-[5px] items-center">
                                <AttachmentsImg className="w-[18px] h-[18px] *:fill-[#8C909C]" />
                                <span className="text-[12px] font-medium">Вложения</span>
                            </button>
                            <button className="rounded-[13px] px-[9px] py-[6px] bg-[#ECEEF1] flex gap-[5px] items-center">
                                <PinImg className="w-[18px] h-[18px] *:fill-[#8C909C]" />
                                <span className="text-[12px] font-medium">Закрепить</span>
                            </button>
                            <button className="rounded-[13px] px-[9px] py-[6px] bg-[#ECEEF1] flex gap-[5px] items-center">
                                <ArchiveImg className="w-[18px] h-[18px] *:fill-[#8C909C]" />
                                <span className="text-[12px] font-medium">В архив</span>
                            </button>
                        </div>
                    </div>
                    <button className="p-[8px] rounded-[11px] bg-[#ECEEF1]">
                        <DotsImg className="w-[19px] h-[19px] *:fill-[#8C909C]" />
                    </button>
                    <button className="p-[8px] rounded-[11px] bg-[#ECEEF1]">
                        <CloseImg className="w-[19px] h-[19px] *:fill-[#8C909C]" />
                    </button>
                </div>
                <SimpleBar className="max-h-[calc(100vh-350px)] border-0 border-solid border-[#D9D9D9] border-t border-b   py-[10px]">
                    <div className="flex flex-col gap-[10px] grow ">

                        <Message owner={false} text="Вот ваша бронь. Сделал ее специально на 15 минут позже, чтобы вы точно не опоздали. Не в обиду вашей пунктуальности, просто там реально тяжело найти вход." time="17:45" view={false} />
                        <Message owner={true} text="Иван, кажется вы забыли приложить файл к сообщению)" time="17:45" view={true} />
                        <Message owner={true} text="Спасибо! Можете пожалуйста также рассчитать, во сколько обойдется путь до туда. И было бы круто всю отчетность сразу отправить боссу, он хочет лично посмотреть на цифры и графики." time="17:45" view={false} />
                        <Message owner={false} text="Вот ваша бронь. Сделал ее специально на 15 минут позже, чтобы вы точно не опоздали. Не в обиду вашей пунктуальности, просто там реально тяжело найти вход." time="17:45" view={false} />
                        <Message owner={true} text="Иван, кажется вы забыли приложить файл к сообщению)" time="17:45" view={true} />
                        <Message owner={true} text="Спасибо! Можете пожалуйста также рассчитать, во сколько обойдется путь до туда. И было бы круто всю отчетность сразу отправить боссу, он хочет лично посмотреть на цифры и графики." time="17:45" view={false} />
                        <Message owner={false} text="Вот ваша бронь. Сделал ее специально на 15 минут позже, чтобы вы точно не опоздали. Не в обиду вашей пунктуальности, просто там реально тяжело найти вход." time="17:45" view={false} />
                        <Message owner={true} text="Иван, кажется вы забыли приложить файл к сообщению)" time="17:45" view={true} />
                        <Message owner={true} text="Спасибо! Можете пожалуйста также рассчитать, во сколько обойдется путь до туда. И было бы круто всю отчетность сразу отправить боссу, он хочет лично посмотреть на цифры и графики." time="17:45" view={false} />
                        <Message owner={false} text="Вот ваша бронь. Сделал ее специально на 15 минут позже, чтобы вы точно не опоздали. Не в обиду вашей пунктуальности, просто там реально тяжело найти вход." time="17:45" view={false} />
                        <Message owner={true} text="Иван, кажется вы забыли приложить файл к сообщению)" time="17:45" view={true} />
                        <Message owner={true} text="Спасибо! Можете пожалуйста также рассчитать, во сколько обойдется путь до туда. И было бы круто всю отчетность сразу отправить боссу, он хочет лично посмотреть на цифры и графики." time="17:45" view={false} />
                        <Message owner={false} text="Вот ваша бронь. Сделал ее специально на 15 минут позже, чтобы вы точно не опоздали. Не в обиду вашей пунктуальности, просто там реально тяжело найти вход." time="17:45" view={false} />
                        <Message owner={true} text="Иван, кажется вы забыли приложить файл к сообщению)" time="17:45" view={true} />
                        <Message owner={true} text="Спасибо! Можете пожалуйста также рассчитать, во сколько обойдется путь до туда. И было бы круто всю отчетность сразу отправить боссу, он хочет лично посмотреть на цифры и графики." time="17:45" view={false} />
                        <Message owner={false} text="Вот ваша бронь. Сделал ее специально на 15 минут позже, чтобы вы точно не опоздали. Не в обиду вашей пунктуальности, просто там реально тяжело найти вход." time="17:45" view={false} />
                        <Message owner={true} text="Иван, кажется вы забыли приложить файл к сообщению)" time="17:45" view={true} />
                        <Message owner={true} text="Спасибо! Можете пожалуйста также рассчитать, во сколько обойдется путь до туда. И было бы круто всю отчетность сразу отправить боссу, он хочет лично посмотреть на цифры и графики." time="17:45" view={false} />

                    </div>
                </SimpleBar>
                <div className="flex gap-[10px]">
                    <button className="p-[8px] rounded-[11px] bg-[#ECEEF1]">
                        <AttachmentsImg className="w-[19px] h-[19px] *:fill-[#8C909C]" />
                    </button>

                    <div className="rounded-[13px] px-[15px] py-[7px] grow bg-[#ECEEF1]">
                        <input type="text" className="w-full bg-[transparent] text-[14px]" placeholder="Написать сообщение..." />
                    </div>

                    <button className="p-[8px] rounded-[11px] bg-[#ECEEF1]">
                        <SendImg className="w-[19px] h-[19px] *:fill-[#8C909C]" />
                    </button>
                </div>
            </div>
        </div >
    );
};

export default Messages;