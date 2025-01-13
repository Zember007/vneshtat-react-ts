

const AeroNavigations = () => {
    return (
        <button
            className={"min-h-[50px] transition w-full flex justify-center items-center py-4 rounded-[18px] bg-black disabled:bg-[#DCE0E5]"}
            disabled={true}>
            <p className={`text-base leading-none text-black`}>Забронировать</p>
        </button>
    );
};

export { AeroNavigations };