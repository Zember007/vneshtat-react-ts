import { useEffect, useRef, useState } from 'react';
import ReportCart from './ReportCart'
import { InputDate } from "@/shared/UI";


const Report = () => {

    const [dates, setDates] = useState<Date[]>([]);

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




    const handleDateClick = (date: Date) => {
        let updatedDates = dates.filter(d => d !== undefined);

        if (updatedDates.length === 2) {
            updatedDates = [];
            setDates([]);
        }
        if (!dates[0] || updatedDates.length === 0) {
            updatedDates = [date];
        } else {
            updatedDates = [...updatedDates, date].sort((a, b) => a.getTime() - b.getTime());
        }

        setDates(updatedDates);
    }

    const box = useRef<HTMLDivElement | null>(null)

    const [maxHeight, setMaxHeight] = useState<string>()


    useEffect(() => {
        setMaxHeight(box.current?.offsetHeight + 'px')

    }, [box])

    return (
        <>
            <div className="rounded-[26px] p-[20px] bg-[#FAFAFA] min-h-[134px]">

                <div className="flex items-center justify-between gap-[20px] ">
                    <div className="flex gap-[10px]">
                        <InputDate
                            placeholder={"Дата от "}
                            extraClass={"p-[11px] h-[41px] min-w-[210px] !rounded-[13px]"}
                            inputValue={dates}
                            viewValue={dates[0]}
                            isShortDate={true}
                            withIcon={true}
                            calendarOpt={{
                                onClickDay: handleDateClick,
                                allowPartialOptions: true,
                                selectRange: true
                            }}
                            setter={(dates: Date[]) => {
                                setDates(dates);
                            }}
                        />
                        <InputDate
                            placeholder={"Дата до"}
                            extraClass={"p-[11px] h-[41px] min-w-[210px] !rounded-[13px]"}
                            inputValue={dates}
                            viewValue={dates[1]}
                            isShortDate={true}
                            withIcon={true}
                            calendarOpt={{
                                onClickDay: handleDateClick,
                                allowPartialOptions: true,
                                selectRange: true
                            }}
                            setter={(dates: Date[]) => {
                                setDates(dates);
                            }}
                        />
                    </div>

                    <button className="h-10 px-10 py-2 flex items-center justify-center rounded-[14px] bg-[#292933]">
                        <p className="text-[17px] text-primary">Сформировать</p>
                    </button>
                </div>

            </div>
            <div className="flex flex-col gap-[20px] rounded-[26px] px-[30px] py-[25px] bg-[#FAFAFA] h-full">

                <div className="reports__title">Отчёт</div>

                <div ref={box} className={"flex flex-col gap-[10px] h-full overflow-y-auto scroll"} style={{ 'maxHeight': maxHeight }}>
                    {reports.map(item => (
                        <ReportCart date={item.date} receipt={item.receipt} writingOff={item.writingOff} data={item.data} />
                    ))}
                </div>
            </div>


        </>
    );
};

export { Report };