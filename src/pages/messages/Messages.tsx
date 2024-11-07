import { Switch } from "@/shared/UI";
import BurgerImg from "@/assets/icons/burger.svg?react";
import ArchiveImg from "@/assets/icons/archive.svg?react";
import { useState } from "react";
import { SearchInput } from "@/shared/UI";

const Messages = () => {

    const [Archive, setArchive] = useState<boolean>(false)
    const [AllMessages, setAllMessages] = useState<boolean>(true)
    const [Search, setSearch] = useState<string>('')
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

                <div className=""></div>
            </div>
            <div className="p-[20px] rounded-[26px] bg-primary grow"></div>
        </div>
    );
};

export default Messages;