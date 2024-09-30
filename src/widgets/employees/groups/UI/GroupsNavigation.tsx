
const GroupsNavigation = () => {
    return (
        <div className="flex flex-col gap-[10px]">
            <div className="flex gap-[10px] pb-[10px] after:content-[''] after:absolute after:bottom-0 after:left-[50%] after:translate-x-[-50%] after:h-[1px] relative after:w-[50px] after:bg-[#C0C7D1]">
                <button
                className="font-medium w-full py-[10px] text-center rounded-[13px] bg-[#DCE0E5]"
                >Импорт</button>
                <button
                className="font-medium w-full py-[10px] text-center rounded-[13px] bg-[#DCE0E5]"
                >Экспорт</button>
            </div>
            <button className="py-[13px] text-center rounded-[18px] bg-[#292933] w-full">
                <p className="text-[16px] text-primary">
                    Создать группу
                </p>
            </button>

        </div>
    );
};

export { GroupsNavigation };