import CloseImg from '@/assets/icons/close.svg?react'
import CalendarImg from "@/assets/icons/google_calendar.svg?react";
import TrashImg from "@/assets/icons/trash.svg?react";
interface calendar {
    "Email": string
}

const GoogleCalendar = ({ close, data }: { close: Function; data: calendar[] | null }) => {
    return (
        <div className="flex flex-col gap-[10px] h-full">
            <div className="mt-[5px] flex items-center justify-between pb-[10px] border-0 border-b border-solid border-[#D9D9D9]">
                <span className="font-medium">Google Календарь</span>
                <button
                    onClick={() => { close() }}>
                    <CloseImg className='*:fill-[#BDBFC7] w-[18px] h-[18px]' />
                </button>
            </div>
            <div className="grow h-full flex flex-col justify-between">
                <div className="flex flex-col gap-[15px]">
                    <p className="text-[#787B86] text-[14px]">
                        Все ваши поездки будут отображаться в Google Календаре параллельно с другими вашими делами. Календарю будет назначен пурпурный цвет.
                    </p>
                    {data &&
                        data.map(item => (
                            <div className="flex items-center gap-[10px] p-[12px] rounded-[13px] bg-[#ECEEF1]">
                                <CalendarImg className='w-[18px] h-[18px]' />
                                <span className='text-[14px] grow'>{item.Email}</span>
                                <button><TrashImg className='w-[18px] h-[18px]' /></button>
                            </div>
                        ))
                    }
                </div>
                <div className="flex items-center flex-col gap-[10px]">
                    <button
                        onClick={() => { }}
                        className="w-[255px] rounded-[18px] bg-black py-[15px]">
                        <p className="text-primary">Выбрать аккаунт Google</p>
                    </button>
                    <p className="text-[#787B86] text-[12px] text-center">
                        Необходимо войти в аккаунт Google, чтобы подтвердить интеграцию.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GoogleCalendar;