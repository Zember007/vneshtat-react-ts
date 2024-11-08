import ViewTrueImg from "@/assets/icons/view-true.svg?react";
import ViewImg from "@/assets/icons/view-false.svg?react";


const Message = ({ text, time, owner, view }: { text: string, time: string, owner: boolean, view?: boolean }) => {
    return (
        <div className={`relative bg-[#ECEEF1] py-[13px] px-[20px] max-w-[480px] rounded-[23px] ${owner && 'self-end'}`}>
            <p className="text-[14px] whitespace-pre-wrap">
                {text}
                <span className={` inline-block ${owner ? 'w-[50px]' : 'w-[32px]'}`}></span>
            </p>
            <div className="absolute bottom-[13px] right-[20px] flex items-center gap-[2px]">
                <span className="text-[10px] text-[#9B9FAD]">{time}</span>
                {owner && <>
                    {
                        view ? <ViewTrueImg /> : <ViewImg />
                    }
                </>}
            </div>
        </div>
    );
};

export { Message };