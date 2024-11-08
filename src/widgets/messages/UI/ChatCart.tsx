
const ChatCart = ({ active, lastMessage, online, Name, Surname, lastTime, select }: { active: boolean, lastMessage: string, online: boolean, Name: string, Surname: string, lastTime: string, select:Function }) => {
    return (
        <div className="flex items-center gap-[10px]">
            <div className={`w-[29px] h-[29px] rounded-[26px] bg-[#ECEEF1] text-[11px] flex items-center justify-center  ${online ? 'text-[#007BFB]' : 'text-[#787B86]'}`}>
                {Name[0]}{Surname[0]}
            </div>
            <div
            onClick={() => {select()}}
            className={`p-[13px] rounded-[13px] grow flex cursor-pointer ${active ? 'bg-[#121212]' : 'bg-[#ECEEF1]'}`}>
                <div className="flex flex-col gap-[2px]">
                    <div className="flex items-center gap-[3px]">
                        <span className={`text-[14px] font-medium ${active && 'text-primary'}`}>{Name} {Surname}</span>
                        {online && <span className="text-[10px] font-medium text-[#007BFB]">Онлайн</span>}
                    </div>
                    <span className="text-[11px] text-[#9B9FAD] truncate max-w-[236px]">{lastMessage}</span>
                </div>
                <div className="flex flex-col justify-between items-end">
                    <span className="text-[11px] text-[#9B9FAD]">{lastTime}</span>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.39763 1.10911C7.87384 0.638465 8.64141 0.642975 9.11206 1.11918L12.8936 4.94544C13.3643 5.42165 13.3598 6.18923 12.8835 6.65987C12.4073 7.13051 11.6398 7.126 11.1691 6.6498L10.9069 6.38445L9.2842 7.98663C9.28951 8.01623 9.29495 8.04839 9.30035 8.08298C9.33092 8.27884 9.36056 8.55434 9.35805 8.87877C9.35305 9.52501 9.22006 10.3863 8.6909 11.1945C8.49556 11.4928 8.18148 11.627 7.87349 11.6246C7.57208 11.6223 7.27217 11.4922 7.04825 11.2656L5.14154 9.33638L3.56361 10.8955C3.41083 11.0465 3.1646 11.045 3.01365 10.8922C2.86269 10.7394 2.86417 10.4932 3.01695 10.3422L4.59481 8.78319L2.68817 6.85401C2.46425 6.62744 2.33763 6.32603 2.33888 6.02461C2.34016 5.71662 2.478 5.40413 2.77862 5.21231C3.59296 4.69269 4.45575 4.56982 5.102 4.57242C5.42644 4.57372 5.70157 4.60659 5.89706 4.63947C5.93167 4.64529 5.96386 4.65112 5.99345 4.6568L7.61603 3.05471L7.38756 2.82354C6.91692 2.34733 6.92143 1.57975 7.39763 1.10911Z" fill="#BDBFC7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export { ChatCart };