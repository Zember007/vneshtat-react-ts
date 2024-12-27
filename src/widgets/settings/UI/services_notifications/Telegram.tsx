import CloseImg from '@/assets/icons/close.svg?react'
import { getAccessToken } from '@/shared/utils';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';

interface telegram {
    "Username": string
}

const Telegram = ({ close, data }: { close: Function; data?: telegram[] | null }) => {

    const AccessToken = getAccessToken()

    const [linkQr, setLinkQr] = useState<string | null>(null)

    const getInformation = async () => {
        const url = new URL(import.meta.env.VITE_API_URL + '/user/settings/get_telegram_connection_link');

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${AccessToken}`
                }
            });
            const data = await res.json();
            if (data.status === "error") {
                console.log("error", data);
            }

            if (data.status === "success" && data.data) {
                if (data.data.link) {
                    setLinkQr(data.data.link)
                }
            }
        } catch (error) {

            console.log(error);

        }

    }

    useEffect(() => {
        getInformation()
        console.log(data);
        
    }, [])

    return (
        <div className="flex flex-col gap-[10px] h-full">
            <div className="mt-[5px] flex items-center justify-between pb-[10px] border-0 border-b border-solid border-[#D9D9D9]">
                <span className="font-medium">Telegram</span>
                <button
                    onClick={() => { close() }}>
                    <CloseImg className='*:fill-[#BDBFC7] w-[18px] h-[18px]' />
                </button>
            </div>
            <div className="grow h-full flex flex-col">
                <div className="flex flex-col gap-[15px]">
                    <p className="text-[#787B86] text-[14px]">
                        Отсканируйте QR-код, чтобы активировать чат-бота. В нём будет доступен базовый функционал сервиса и уведомления.
                    </p>

                    <div className=""></div>
                </div>
                {linkQr && <div className="grow h-full flex items-center justify-center flex-col gap-[20px]">
                    <QRCodeSVG
                        value={linkQr}
                        size={126}
                        bgColor='#FAFAFA'
                    />
                    <p className="text-[#787B86] text-[12px] text-center">
                        QR-код генерируется индивидуально для каждого сотрудника.
                    </p>
                </div>}
            </div>
        </div>
    );
};

export default Telegram;