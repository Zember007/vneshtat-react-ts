import { useState } from 'react';
import ReportCart from './ReportCart'
import InputDate from '../../UI/InputDate'


const Report = () => {


    const reports = [
        {
            date: new Date(),
            receipt: 2889250.20,
            writingOff: 2889250.20,
            data: [
                {
                    time: new Date(),
                    act: '7463-3105: Авиабилет; 4251595714561; Москва (Внуково) - Санкт-Петербург (Пулково); Эконом; 07.06.2023; Sokolov Aleksey',
                    receipt: 1489250.20,
                    writingOff: 1489250.20
                },
                {
                    time: new Date(),
                    act: '7463-3105: Авиабилет; 4251595714561; Москва (Внуково) - Санкт-Петербург (Пулково); Эконом; 07.06.2023; Sokolov Aleksey',
                    receipt: 1489250.20,
                    writingOff: 1489250.20
                },
                {
                    time: new Date(),
                    act: '7463-3105: Авиабилет; 4251595714561; Москва (Внуково) - Санкт-Петербург (Пулково); Эконом; 07.06.2023; Sokolov Aleksey',
                    receipt: 1489250.20,
                    writingOff: 1489250.20
                }
            ]
        },
        {
            date: new Date(),
            receipt: 2889250.20,
            writingOff: 2889250.20,
            data: [
                {
                    time: new Date(),
                    act: '7463-3105: Авиабилет; 4251595714561; Москва (Внуково) - Санкт-Петербург (Пулково); Эконом; 07.06.2023; Sokolov Aleksey',
                    receipt: 1489250.20,
                    writingOff: 1489250.20
                },
                {
                    time: new Date(),
                    act: '7463-3105: Авиабилет; 4251595714561; Москва (Внуково) - Санкт-Петербург (Пулково); Эконом; 07.06.2023; Sokolov Aleksey',
                    receipt: 1489250.20,
                    writingOff: 1489250.20
                },
                {
                    time: new Date(),
                    act: '7463-3105: Авиабилет; 4251595714561; Москва (Внуково) - Санкт-Петербург (Пулково); Эконом; 07.06.2023; Sokolov Aleksey',
                    receipt: 1489250.20,
                    writingOff: 1489250.20
                }
            ]
        },
        {
            date: new Date(),
            receipt: 2889250.20,
            writingOff: 2889250.20,
            data: [
                {
                    time: new Date(),
                    act: '7463-3105: Авиабилет; 4251595714561; Москва (Внуково) - Санкт-Петербург (Пулково); Эконом; 07.06.2023; Sokolov Aleksey',
                    receipt: 1489250.20,
                    writingOff: 1489250.20
                },
                {
                    time: new Date(),
                    act: '7463-3105: Авиабилет; 4251595714561; Москва (Внуково) - Санкт-Петербург (Пулково); Эконом; 07.06.2023; Sokolov Aleksey',
                    receipt: 1489250.20,
                    writingOff: 1489250.20
                },
                {
                    time: new Date(),
                    act: '7463-3105: Авиабилет; 4251595714561; Москва (Внуково) - Санкт-Петербург (Пулково); Эконом; 07.06.2023; Sokolov Aleksey',
                    receipt: 1489250.20,
                    writingOff: 1489250.20
                }
            ]
        }
    ]


    const [dateBefore, setDateBefore] = useState<string>('')
    const [dateFrom, setDateFrom] = useState<string>('')




    return (
        <>
            <div className="flex items-center justify-between gap-[20px] rounded-[26px] p-[20px] bg-[#FAFAFA]">

                <div className="flex gap-[10px]">
                    <InputDate class='!w-[210px]' change={setDateFrom} value={dateFrom} placeholder='Дата от' />
                    <InputDate class='!w-[210px]' change={setDateBefore} value={dateBefore} placeholder='Дата до' />
                </div>

                <button className="h-10 px-10 py-2 flex items-center justify-center rounded-[14px] bg-[#292933]">
                    <p className="text-[17px] text-primary">Сформировать</p>
                </button>

            </div>
            <div className="flex flex-col gap-[20px] rounded-[26px] px-[30px] py-[25px] bg-[#FAFAFA] h-full">

                <div className="reports__title">Отчёт</div>

                <div className="flex flex-col gap-[10px] h-full max-h-full overflow-y-auto scroll">
                    {reports.map(item => (
                        <ReportCart date={item.date} receipt={item.receipt} writingOff={item.writingOff} data={item.data} />
                    ))}
                </div>
            </div>


        </>
    );
};

export { Report };