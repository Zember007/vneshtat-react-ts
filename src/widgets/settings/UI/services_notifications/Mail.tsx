import { AppDispatch, RootState } from '@/app/config/store';
import CloseImg from '@/assets/icons/close.svg?react'
import { Checkbox } from '@/shared/UI';
import { getAccessToken } from '@/shared/utils';
import InputSelect from '@/widgets/jobs/UI/InputSelect';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SimpleBar from 'simplebar-react';
import { setEmailJorneys, setEmailJorneysTime, setEmailReserve, setEmailReserveTime, setEmailServices } from '../../model/settings.store';

const Mail = ({ close }: { close: Function }) => {

    const dispatch: AppDispatch = useDispatch();
    const EmailServices = useSelector((state: RootState) => state.settings.email_services);
    const EmailJorneys = useSelector((state: RootState) => state.settings.email_jorneys);
    const EmailJorneysTime = useSelector((state: RootState) => state.settings.email_jorneys_time);
    const EmailReserve = useSelector((state: RootState) => state.settings.email_reserve);
    const EmailReserveTime = useSelector((state: RootState) => state.settings.email_reserve_time);

    const CreatingTrip = EmailServices.find(item => item.code === 'CreatingTrip')
    const BookingService = EmailServices.find(item => item.code === 'BookingService')
    const FormalizationService = EmailServices.find(item => item.code === 'FormalizationService')
    const CancelingService = EmailServices.find(item => item.code === 'CancelingService')
    const RequestToCancelService = EmailServices.find(item => item.code === 'RequestToCancelService')
    const AcceptedOrDeclined = EmailServices.find(item => item.code === 'AcceptedOrDeclined')
    /* const ExpiringReserve = EmailJorneys[0]
    const NewTrip = EmailReserve[0] */


    const [email, setEmail] = useState('')

    const EmployeeId = localStorage.getItem('EmployeeId')
    const AccessToken = getAccessToken()

    const getInformation = async () => {
        const url = new URL(import.meta.env.VITE_API_URL + '/user/settings/get_email_notifications');
        url.searchParams.append('EmployeeId', EmployeeId || '');

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
                const information = data.data

                if (information.Email) {
                    setEmail(information.Email)
                }

                if (information.CreatingTrip) {
                    dispatch(setEmailServices(CreatingTrip?.id))
                }

                if (information.BookingService) {
                    dispatch(setEmailServices(BookingService?.id))
                }

                if (information.FormalizationService) {
                    dispatch(setEmailServices(FormalizationService?.id))
                }

                if (information.CancelingService) {
                    dispatch(setEmailServices(CancelingService?.id))
                }

                if (information.RequestToCancelService) {
                    dispatch(setEmailServices(RequestToCancelService?.id))
                }

                if (information.AcceptedOrDeclined) {
                    dispatch(setEmailServices(AcceptedOrDeclined?.id))
                }

                if (information.ExpiringReserve) {
                    dispatch(setEmailReserve(1))
                }

                if (information.NewTrip) {
                    dispatch(setEmailJorneys(1))
                }

            }
        } catch (error) {

            console.log(error);

        }

    }

    const setInformation = async () => {
        const url = import.meta.env.VITE_API_URL + '/user/settings/edit_email_notification';

        const formdata = {
            "Email": "devromancom@gmail.com",
            "CreatingTrip": false,
            "BookingService": false,
            "FormalizationService": false,
            "CancelingService": true,
            "RequestToCancelService": false,
            "AcceptedOrDeclined": true,
            "ExpiringReserve": false,
            "ExpiringReserveTime": null,
            "NewTrip": true,
            "NewTripTime": null
        }

        try {
            const res = await fetch(url, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${AccessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formdata)
            });
            const data = await res.json();
            if (data.status === "error") {
                console.log("error", data);
            }

            if (data.status === "success") {
                console.log(data);
            }
        } catch (error) {

            console.log(error);

        }

    }

    useEffect(() => {
        getInformation()
    }, [])
    return (
        <div className="flex flex-col gap-[10px] h-full">
            <div className="mt-[5px] flex items-center justify-between pb-[10px] border-0 border-b border-solid border-[#D9D9D9]">
                <span className="font-medium">Email</span>
                <button
                    onClick={() => { close() }}>
                    <CloseImg className='*:fill-[#BDBFC7] w-[18px] h-[18px]' />
                </button>
            </div>
            <SimpleBar className='max-h-[calc(100vh-360px)]'>
                <div className="grow h-full flex flex-col gap-[10px]">
                    <div className="flex flex-col gap-[6px] rounded-[23px] p-[13px] bg-[#ECEEF1]">
                        <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                            <span className="text-[12px] font-medium text-[#9B9FAD]">Почта</span>
                            <input value={email} onInput={(e) => { setEmail(e.currentTarget.value) }} type="text" className="w-full bg-[transparent] text-[12px] font-medium text-right" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-[6px] rounded-[23px] p-[13px] bg-[#ECEEF1]">
                        <Checkbox
                            items={EmailServices}
                            onChange={(id: number) => { dispatch(setEmailServices(id)) }}
                        />
                    </div>

                    <div className="flex flex-col gap-[6px] rounded-[23px] p-[13px] bg-[#ECEEF1]">
                        <Checkbox
                            items={EmailReserve}
                            onChange={(id: number) => { dispatch(setEmailReserve(id)) }}
                        />

                        <InputSelect
                            data={EmailReserveTime}
                            activeId={EmailReserveTime.find(item => item.isSelected)?.id}
                            change={(id: number) => { dispatch(setEmailReserveTime(id)) }}
                            title='До истечения'
                        />
                    </div>

                    <div className="flex flex-col gap-[6px] rounded-[23px] p-[13px] bg-[#ECEEF1]">
                        <Checkbox
                            items={EmailJorneys}
                            onChange={(id: number) => { dispatch(setEmailJorneys(id)) }}
                        />

                        <InputSelect
                            data={EmailJorneysTime}
                            activeId={EmailJorneysTime.find(item => item.isSelected)?.id}
                            change={(id: number) => { dispatch(setEmailJorneysTime(id)) }}
                            title='До поездки'
                        />
                    </div>

                </div>
            </SimpleBar>
            <button
                onClick={() => {setInformation()}}
                className="w-[255px] rounded-[18px] bg-black py-[15px]">
                <p className="text-primary">Сохранить</p>
            </button>
        </div>
    );
};

export default Mail;