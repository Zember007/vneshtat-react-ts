import {Bar, BarChart, Brush, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis} from "recharts";
import GraphImg from "@/assets/icons/graph.svg?react";
import DashboardImg from "@/assets/icons/dashboard.svg?react";
import ArrowLeftImg from "@/assets/icons/arrow-left.svg?react";
import CrossImg from "@/assets/icons/cross.svg?react";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {ShowedGraph} from "./flight-tickets";
import {DayData, generateBoardMonthData, MonthData, months, PriceData} from "../utils";
import {getDayOfWeekMock} from "@/shared/utils";
import {usePagination} from "@/shared/hooks/use-pagination";
import {useSelector} from "react-redux";
import {RootState} from "@/app/config/store";

interface TooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
}

const generateMonthlyData = (month: string, daysData: DayData[]) => {
    return daysData.map(({day, value}) => ({
        name: month,
        day,
        uv: value,
        isMonthCenter: day === Math.ceil(daysData.length / 2),
    }));
};

const data = months.reduce((acc: any[], {month, days}: MonthData) => {
    return [...acc, ...generateMonthlyData(month, days)];
}, []);

const findMinMax = (data: { min: number, max: number, uv: number }[]) => {
    const values = data.map(d => d.uv);
    const min = Math.min(...values);
    const max = Math.max(...values);
    return {min, max};
};

const uniqueMonths = [...new Set(data.map(item => item.name))];
const uniqueData = uniqueMonths.map(month => ({
    name: month,
    uv: data.find(d => d.name === month)?.uv || 0
}));

const CustomTooltip = ({active, payload, label, coordinate}: TooltipProps & {
    coordinate?: { x: number; y: number }
}) => {
    if (active && payload && payload.length && coordinate) {
        const {x, y} = coordinate;
        return (
            <div className="custom-tooltip flex"
                 style={{
                     position: 'absolute',
                     left: `${x}px`,
                     top: `${y - 40}px`,
                     transform: 'translateX(-50%)',
                 }}>
                <p className="whitespace-nowrap">{`${label} ${payload[0].payload.name} - ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

const FlightChart = ({showedGraph, setShowedGraph, activeRate}: {
    showedGraph: ShowedGraph | null,
    setShowedGraph: Dispatch<SetStateAction<ShowedGraph | null>>,
    activeRate: PriceData | null,
}) => {
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(90);
    const [displayedData, setDisplayedData] = useState(data.slice(startIndex, endIndex));
    const {min, max} = findMinMax(data);
    const [activePrice, setActivePrice] = useState<number | null>(null);
    const {flights} = useSelector((state: RootState) => state.flight);
    const {displayedDays} = generateBoardMonthData();
    const {
        currentItems: horizDays,
        nextPage: horizNextPage,
        prevPage: horizPrevPage
    } = usePagination(displayedDays, 7, 1);
    const {currentItems: verticalDays, nextPage, prevPage} = usePagination(displayedDays, 7, 1);

    const handleBrushChange = (newStartIndex: number | undefined) => {
        if (newStartIndex) {
            setStartIndex(newStartIndex);
            setEndIndex(newStartIndex + 90);
        }
    };

    useEffect(() => {
        setDisplayedData(data.slice(startIndex, endIndex));
    }, [startIndex, endIndex]);

    useEffect(() => {
        const timer = setTimeout(() => {
            const svgNode = document.querySelector('g.recharts-layer.recharts-brush');
            if (svgNode) {
                if (svgNode.childNodes[0] instanceof Element) {
                    (svgNode.childNodes[0] as Element).removeAttribute('stroke');
                }
                if (svgNode.childNodes[1] instanceof Element) {
                    (svgNode.childNodes[1] as Element).setAttribute('rx', '13');
                    (svgNode.childNodes[1] as Element).setAttribute('ry', '13');
                }
            }
        }, 0);

        return () => clearTimeout(timer);
    }, [showedGraph]);

    return (
        <div>
            <div
                className={"p-9 m-5 rounded-[23px] bg-secondary relative overflow-y-auto scroll hidden-scroll h-[calc(100vh-355px)]"}>
                <div className={"flex justify-between items-center mb-5 mt-2"}>
                    <h2 className={"font-medium leading-none"}>{showedGraph === "graph" ? "График цен" : "Таблица цен"}</h2>
                    <div className={"flex items-center gap-2.5"}>
                        <button
                            onClick={() => setShowedGraph("graph")}
                            className={`transition p-3 w-9 h-9 flex justify-center items-center rounded-[10px] ${showedGraph === "graph" ? "bg-black" : "bg-primary"} cursor-pointer`}>
                            <GraphImg
                                className={`min-h-[20px] min-w-[20px] ${showedGraph === "graph" ? "white-fill" : "grey-fill"}`}/>
                        </button>
                        <button
                            onClick={() => setShowedGraph("dashboard")}
                            disabled={flights.length < 2}
                            className={`transition p-3 w-9 h-9 flex justify-center items-center rounded-[10px] ${showedGraph === "dashboard" ? "bg-black" : "bg-primary"} cursor-pointer mr-4`}>
                            <DashboardImg
                                className={`min-h-[20px] min-w-[20px] ${showedGraph === "dashboard" ? "white-fill" : "grey-fill"}`}/>
                        </button>
                        <button className={"absolute top-5 right-5"} onClick={() => setShowedGraph(null)}>
                            <CrossImg className={"black-fill min-h-6 min-w-6"}/>
                        </button>
                    </div>
                </div>
                {showedGraph === "graph" ? (
                    <>
                        <ResponsiveContainer width="100%" height={185} style={{position: "relative", zIndex: "30"}}>
                            <BarChart
                                data={data}
                                margin={{top: 20, right: 0, left: 0, bottom: 30}}
                                barCategoryGap={1}>
                                <XAxis
                                    dataKey="day"
                                    tickLine={false}
                                    tickFormatter={(_, index) => {
                                        if (index < displayedData.length && displayedData[index].isMonthCenter) {
                                            const month = displayedData[index].name;
                                            return `${month} - ${displayedData[index].uv}`;
                                        }
                                        return '';
                                    }}
                                    tick={{fontSize: 16, fill: "#787B86"}}
                                    padding={{left: 50}}
                                />
                                <Tooltip content={<CustomTooltip/>}/>
                                <Bar dataKey="uv" fill="#BFBEFC"/>
                                <ReferenceLine
                                    y={max}
                                    stroke="#9761FF"
                                    strokeWidth={2}
                                    label={{
                                        value: max,
                                        position: 'insideBottomLeft',
                                        offset: 5,
                                        fill: '#787B86',
                                        fontSize: 14,
                                    }}
                                />
                                <ReferenceLine
                                    y={min}
                                    stroke="#9761FF"
                                    strokeWidth={2}
                                    label={{
                                        value: min,
                                        position: 'insideBottomLeft',
                                        fill: '#787B86',
                                        fontSize: 14,
                                        offset: 5,
                                    }}
                                />
                                <Brush
                                    y={140}
                                    startIndex={startIndex}
                                    endIndex={endIndex}
                                    onChange={({startIndex}) => handleBrushChange(startIndex)}
                                    dataKey="day"
                                    height={30}
                                    fill={"none"}
                                    travellerWidth={0}
                                    stroke={"#BFBEFC"}
                                    tickFormatter={() => ''}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                        <ResponsiveContainer width="100%" height={80} className={"absolute top-[220px]"}>
                            <LineChart data={uniqueData} margin={{top: 20, right: 100, left: 40}}>
                                <XAxis
                                    dataKey="name"
                                    tickFormatter={(value) => {
                                        return uniqueMonths.includes(value) ? value : '';
                                    }}
                                    tick={{fontSize: 16, fill: "#787B86"}}
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={-2}/>
                                <Line type="linear" dataKey="uv" stroke="#9761FF" dot={false}/>
                            </LineChart>
                        </ResponsiveContainer>
                    </>
                ) : (
                    <div className={"w-full flex gap-[5px]"}>
                        <div className={"flex flex-col gap-[5px]"}>
                            <div className={"relative flex flex-col gap-2.5"}>
                                <p className={"text-center text-[#787B86] leading-none text-xs"}>Туда</p>
                                <div className={"flex items-center gap-[5px]"}>
                                    <button onClick={horizPrevPage} className={"absolute -left-5"}>
                                        <ArrowLeftImg className={"min-h-4 min-w-4 grey-stroke"}/>
                                    </button>
                                    {horizDays.map((date, i) => (
                                        <button key={i}
                                                className={"flex flex-col items-center justify-center rounded-primary bg-[#9761FF] w-full max-w-[140px] min-w-[90px] h-10"}>
                                            <p className={"leading-none text-[10px] text-primary font-medium"}>{date.dayOfWeek}</p>
                                            <p className={"leading-none text-[10px] text-primary font-medium"}>{date.day} {date.month}</p>
                                        </button>
                                    ))}
                                    <button onClick={horizNextPage} className={"flex items-center absolute -right-5"}>
                                        <ArrowLeftImg className={"min-h-4 min-w-4 grey-stroke rotate-180"}/>
                                    </button>
                                </div>
                            </div>
                            <div className="grid-container">
                                {Array.from({length: 49}).map((_, i) => {
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => activePrice === i + 1 ? setActivePrice(null) : setActivePrice(i + 1)}
                                            className={`transition flex flex-col items-center justify-center rounded-primary ${activePrice === i + 1 ? "bg-[#FF866E]" : "bg-[#BFBEFC]"} h-10`}>
                                            <p className={"leading-none text-[10px] text-primary font-medium"}>10 450
                                                ₽</p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <div className={"max-w-[190px] w-full flex flex-row-reverse items-center"}>
                            <p className={"text-center text-[#787B86] leading-none text-xs rotate-90 -translate-x-2"}>Обратно</p>
                            <div
                                className={"min-w-[90px] max-w-[140px] w-full flex flex-col items-center gap-[5px] mt-[62px] relative"}>
                                <button onClick={prevPage} className={"flex justify-center"}>
                                    <ArrowLeftImg className={"min-h-4 min-w-4 grey-stroke absolute -top-5 rotate-90"}/>
                                </button>
                                {verticalDays.map((date, i) => (
                                    <button key={i}
                                            className={"flex flex-col items-center justify-center rounded-primary bg-[#9761FF] w-full max-w-[140px] min-w-[90px] h-10"}>
                                        <p className={"leading-none text-[10px] text-primary font-medium"}>{date.dayOfWeek}</p>
                                        <p className={"leading-none text-[10px] text-primary font-medium"}>{date.day} {date.month}</p>
                                    </button>
                                ))}
                                <button onClick={nextPage} className={"flex justify-center"}>
                                    <ArrowLeftImg className={"min-h-4 min-w-4 grey-stroke -rotate-90"}/>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {activeRate ? (
                    <div className={"mt-8 flex items-center justify-between"}>
                        <div className={"flex items-center gap-2.5"}>
                            <button
                                className={"py-4 px-6 rounded-primary bg-primary max-h-9 flex justify-center items-center"}>
                                <p className={"text-base leading-none"}>{activeRate.startDay} {activeRate.month.slice(0, 3).toLowerCase()}, {getDayOfWeekMock(activeRate.startDay, activeRate.month, 2024)}</p>
                            </button>
                            <button
                                className={"py-4 px-6 rounded-primary bg-primary max-h-9 flex justify-center items-center"}>
                                <p className={"text-base leading-none"}>{activeRate.finishDay} {activeRate.month.slice(0, 3).toLowerCase()}, {getDayOfWeekMock(activeRate.startDay, activeRate.month, 2024)}</p>
                            </button>
                            <span className={"h-[25px] bg-[#C0C7D1] w-[1px] rounded-[1px]"}/>
                            <button
                                className={"py-4 px-6 rounded-primary bg-primary max-h-9 flex justify-center items-center"}>
                                <h6 className={"text-base font-medium leading-none"}>{activeRate.value} ₽</h6>
                            </button>
                        </div>
                        <button
                            className={"w-[125px] py-4 px-6 rounded-primary bg-black max-h-9 flex justify-center items-center"}>
                            <p className={"text-base leading-none text-primary"}>Поиск!</p>
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export {FlightChart};
