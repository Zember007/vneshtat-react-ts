
// import { useEffect, useRef, useState } from "react";
import TrashIcon from '@/assets/icons/trash.svg?react'
import ImgContract from '@/assets/img/company/contract.webp'
import { getAccessToken } from '@/shared/utils';
import {  useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface File extends Blob {
    readonly lastModified: number;
    readonly name: string;
}

const Contract = ({ status, setStatus }: { status?: string, setStatus: Function }) => {

    const EmployeeId = localStorage.getItem('EmployeeId')
    const AccessToken = getAccessToken()

    const DownloadContract = async () => {
        const url_ = new URL(import.meta.env.VITE_API_URL + '/company/company_profile/get_company_treaty');
        url_.searchParams.append('EmployeeId', EmployeeId || '');

        try {
            const res = await fetch(url_, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${AccessToken}`
                }
            });
            const blob = await res.blob()
            console.log(blob);

            const url = window.URL.createObjectURL(blob)

            const a = document.createElement('a')
            a.href = url
            a.download = 'Contract.pdf'
            document.body.appendChild(a)

            a.click()
            a.remove()

            window.URL.revokeObjectURL(url)
        } catch (error) {

            console.log(error);

        }

    }

    const FileInput = useRef<HTMLInputElement>(null)
    const FileInputEdit = useRef<HTMLInputElement>(null)

    const [uploadFile, setUploadFile] = useState<File | null>(null)


    const sendContract = async (method:string = 'POST') => {

        const file = uploadFile

        const formdata = new FormData()

        formdata.append('EmployeeId', EmployeeId || '')
        formdata.append('TreatyFile', file || '')

        const url = method === 'PATCH' ? '/edit_company_treaty' : '/create_company_treaty'

        try {
            const res = await fetch(import.meta.env.VITE_API_URL + '/company/company_profile'+url, {
                method: method,
                headers: {
                    Authorization: `Bearer ${AccessToken}`
                },
                body: formdata
            });
            const data = await res.json();
            if (data.status === "error") {
                console.log("error", data);
            }

            if (data.status === "success") {

                setStatus('in_progress')

            }
        } catch (error) {

            console.log(error);

        }


    }
    return (
        <>

            {!status &&
                <>
                    {!uploadFile &&
                        <div className="flex flex-col gap-[15px] items-center justify-center grow">
                            <img src={ImgContract} alt="contract" className="mb-[20px] max-w-[160px] mb-[20px]" />

                            <div className="flex gap-[10px]">
                                <button
                                    onClick={() => { DownloadContract() }}
                                    className='w-full bg-[#292933] px-[30px] py-[14px] rounded-[16px] text-primary text-[18px] font-medium whitespace-nowrap'>Скачать договор</button>
                                <button
                                    onClick={() => { FileInput.current?.click() }}
                                    className='w-full bg-[#292933] px-[30px] py-[14px] rounded-[16px] text-primary text-[18px] font-medium whitespace-nowrap'>Загрузить договор</button>
                                <input type="file" ref={FileInput} className='hidden'
                                    onChange={(e) => { e.target.files && setUploadFile(e.target.files[0]) }}

                                />

                            </div>

                            <p className="text-center text-[18px]">
                                Договор успешно сформирован. <br />
                                Вы можете скачать его и подписать <br />
                                (а ЭЦП мы поддерживаем?). <br />
                            </p>

                        </div>
                    }

                    {uploadFile &&
                        <>
                            <div className="flex flex-col gap-[10px] items-center grow justify-center">
                                <span className='text-[18px] font-medium text-[#9B9FAD]'>Загруженный файл</span>
                                <div className="p-[14px] rounded-[15px] gap-[25px] flex items-center border border-solid border-[#ECEEF1]">
                                    <span className='text-[18px] font-medium'>{uploadFile.name}</span>
                                    <button
                                        onClick={() => { setUploadFile(null) }}>
                                        <TrashIcon className='w-[18px] h-[18px]' />
                                    </button>
                                </div>
                            </div>
                            <div className="pt-[20px]  border-[#ECEEF1] border-0 border-t border-solid">
                                <div className='flex gap-[10px]'>
                                    <button onClick={() => { setUploadFile(null) }} className='w-full bg-[#ECEEF1] px-[60px] py-[15px] rounded-[16px] text-[18px] font-medium text-[#787B86]'>Назад</button>
                                    <button onClick={() => { sendContract() }} className='w-full bg-[#292933] px-[60px] py-[15px] rounded-[16px] text-primary text-[18px] font-medium'>Отправить</button>
                                </div>
                            </div>
                        </>
                    }
                </>
            }

            {(status === 'in_progress' || status === 'on_review') &&
                <div className='flex flex-col gap-[15px] items-center justify-center grow'>
                    <span className='text-[30px] font-medium'>Договор отправлен!</span>
                    <p className='text-[18px] max-w-[355px] text-center'>
                        Мы проверим его и если всё в порядке, модератор оповестит вас в <Link to={'/messages'} className='text-[#007BFB]'>Мессенджере</Link>.
                    </p>
                    <button
                    onClick={() => setStatus('')}
                    className='py-[14px] px-[30px]  rounded-[14px] bg-[#ECEEF1] '>
                        <span className='text-[#787B86] font-medium mt-[10px]'>Отмена</span>
                    </button>
                </div>
            }

            {status === 'declined' &&
                <div className='flex flex-col gap-[15px] items-center justify-center grow'>
                    <span className='text-[30px] font-medium'>Договор был отклонен</span>
                    <p className='text-[18px] max-w-[355px] text-center'>
                        Наш менеджер обнаружил ошибку
                        в подписанном договоре.
                        Подробнее читайте в  <Link to={'/messages'} className='text-[#007BFB]'>Мессенджере</Link>.
                    </p>
                    <button
                    onClick={() => setStatus('')}
                    className='py-[14px] px-[30px] rounded-[14px] bg-[#ECEEF1]'>
                        <span className='text-[#007BFB] font-medium mt-[10px]'>Вернуться к подписанию</span>
                    </button>
                </div>
            }

            {status === 'accepted' &&
                <div className="flex flex-col gap-[15px] items-center justify-center grow">
                    <img src={ImgContract} alt="contract" className="mb-[20px] max-w-[160px] mb-[20px]" />

                    <div className="flex flex-col gap-[10px] items-center">
                        <span className='text-[30px] font-medium'>Договор подписан!</span>
                        <p className='text-[18px] max-w-[355px] text-center'>
                            Мы очень рады сотрудничеству, теперь вы можете выбрать подходящий тариф.
                        </p>
                    </div>

                    <div className="flex gap-[10px]">
                        <button
                            onClick={() => { DownloadContract() }}
                            className='w-full bg-[#292933] px-[30px] py-[14px] rounded-[16px] text-primary text-[18px] font-medium whitespace-nowrap'>Скачать договор</button>
                        <button
                            onClick={() => { FileInputEdit.current?.click() }}
                            className='w-full bg-[#292933] px-[30px] py-[14px] rounded-[16px] text-primary text-[18px] font-medium whitespace-nowrap'>Изменить данные</button>
                        <input type="file" ref={FileInputEdit} className='hidden'
                            onChange={(e) => { e.target.files && setUploadFile(e.target.files[0]); sendContract('PATCH') }}

                        />

                    </div>

                    <button className='text-[14px] font-medium text-[#9B9FAD] text-center'>
                        Прекратить сотрудничество
                    </button>

                </div>
            }

        </>
    );
};

export default Contract;