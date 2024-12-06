import ArrowImg from '@/assets/icons/arrow-long.svg?react'
import CartImg from '@/assets/icons/cart.svg?react'
import TimeImg from '@/assets/icons/time.svg?react'
import TimerImg from '@/assets/icons/timer.svg?react'
import NotifyImg from '@/assets/icons/notify.svg?react'
import MessageImg from '@/assets/icons/message.svg?react'
import MapImg from '@/assets/icons/map.svg?react'
import { Switch } from '@/shared/UI';
import { useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, ResponsiveContainer } from 'recharts';


const Home = () => {
    const data = [{ date: '15.07', uv: 400 }, { date: '16.07', uv: 100 }, { date: '17.07', uv: 300 }, { date: '18.07', uv: 150 }, { date: '19.07', uv: 50 }, { date: '21.07', uv: 500 }];

    const [jorneys, setJorneys] = useState(false)
    return (
        <div className={"grow h-full flex gap-[15px]"}>
            <div className="w-1/2 h-full flex flex-col gap-[15px]">
                <div className="flex gap-[10px]">
                    <div className="rounded-[26px] bg-primary grow py-[25px] px-[30px]">
                        <span className="text-[#000000] text-[25px] font-medium leading-[1.2]">Добрый день,<br /> Иван!</span>
                    </div>
                    <div className="rounded-[26px] bg-primary min-w-[220px] p-[7px]">
                        <div className="border-[#E5E7EA] rounded-[19px] h-full w-full border border-solid py-[13px] px-[18px] flex flex-col">
                            <span className="text-[#9B9FAD] text-[11px] font-medium">Ваша компания</span>
                            <span className="text-[25px] font-medium leading-[1.2]">Альфа</span>
                        </div>
                    </div>
                </div>
                <div className="grow rounded-[26px] bg-primary p-[20px] flex flex-col gap-[25px]">
                    <div className="flex items-center justify-between">
                        <Switch
                            firstChild={<span className='text-[11px] font-medium'>Ваши поездки</span>}
                            secondChild={<span className='text-[11px] font-medium'>Все поездки</span>}
                            extraActiveChildClass='*:text-[#9B9FAD]'
                            isSelected={jorneys}
                            setter={() => { setJorneys((prev) => !prev) }}
                            extraClass={" !bg-[#FAFAFA] border border-solid border-[#E5E7EA]"}
                            extraChildClass={"px-[18.5px] py-[7.5px] h-full"}
                        />

                        <button className='bg-[#ECEEF1] rounded-[13px] py-[8px] px-[34px]'>
                            <span className='text-[14px] text-[#007BFB]'>Новая поездка</span>
                        </button>
                    </div>

                    <div className="flex flex-col gap-[10px]">
                        <div className="flex gap-[5px]">
                            <div className="grow justify-between rounded-[16px] bg-[#ECEEF1] p-[10px] flex items-start gap-[5px]">
                                <p className='text-[18px] font-medium'>
                                    Инспекция
                                    в Санкт-Петербург
                                </p>
                                <div className="rounded-[10px] bg-[#007BFB] py-[3px] px-[10px] font-medium text-[10px] text-primary">Сейчас</div>
                            </div>
                            <div className="min-w-[170px] rounded-[16px] bg-[#007BFB] px-[10px] flex items-center  justify-center">
                                <span className='text-[18px] font-medium text-primary text-center'>Поездка началась</span>
                            </div>
                            <button className='bg-[#ECEEF1] flex items-center justify-center px-[10px] rounded-[11px]'>
                                <MapImg className='w-[25px] h-[25px]' />
                            </button>
                            <div className="flex flex-col gap-[5px]">
                                <button className='bg-[#ECEEF1] w-[35px] h-[35px] rounded-[11px] flex items-center justify-center'>
                                    <NotifyImg className='w-[19px] h-[19px] *:fill-[#007BFB]' />
                                </button>
                                <button className='bg-[#ECEEF1] w-[35px] h-[35px] rounded-[11px] flex items-center justify-center'>
                                    <MessageImg className='w-[19px] h-[19px] *:fill-[#007BFB]' />
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-[5px]">
                            <div className="grow justify-between rounded-[16px] bg-[#ECEEF1] p-[10px] flex items-start gap-[5px]">
                                <p className='text-[18px] font-medium'>
                                    Инспекция
                                    в Саратов
                                </p>
                                <div className="rounded-[10px] bg-[#007BFB] py-[3px] px-[10px] font-medium text-[10px] text-primary">Завтра</div>
                            </div>
                            <div className="min-w-[170px] rounded-[16px] bg-[#8C909C] px-[10px] flex items-center justify-center">
                                <div className="flex flex-col items-center">
                                    <span className='text-[18px] font-medium text-primary text-center'>1 день 22 часа</span>
                                    <span className='text-[11px] font-medium text-primary text-center'>до начала поездки</span>
                                </div>
                            </div>
                            <button className='bg-[#ECEEF1] flex items-center justify-center px-[10px] rounded-[11px]'>
                                <MapImg className='w-[25px] h-[25px]' />
                            </button>
                            <div className="flex flex-col gap-[5px]">
                                <button className='bg-[#ECEEF1] w-[35px] h-[35px] rounded-[11px] flex items-center justify-center'>
                                    <NotifyImg className='w-[19px] h-[19px] *:fill-[#007BFB]' />
                                </button>
                                <button className='bg-[#ECEEF1] w-[35px] h-[35px] rounded-[11px] flex items-center justify-center'>
                                    <MessageImg className='w-[19px] h-[19px] *:fill-[#007BFB]' />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-1/2 h-full flex flex-col gap-[15px]">
                <div className="flex gap-[10px] justify-end">
                    <div className="flex gap-[10px]">
                        <div className="rounded-[26px] w-[110px] h-[110px] bg-primary p-[8px]">
                            <div className="rounded-[19px] border h-full border-solid border-[#E5E7EA] p-[12px]">
                                <span className="text-[11px] font-medium text-[#9B9FAD]">Обновление</span>
                            </div>
                        </div>
                        <div className="rounded-[26px] w-[110px] h-[110px] bg-primary p-[8px]">
                            <div className="rounded-[19px] border h-full border-solid border-[#E5E7EA] p-[12px]">
                                <span className="text-[11px] font-medium text-[#9B9FAD]">Новости</span>
                            </div>
                        </div>
                        <div className="rounded-[26px] w-[110px] h-[110px] bg-primary p-[8px]">
                            <div className="rounded-[19px] border h-full border-solid border-[#E5E7EA] p-[12px]">
                                <span className="text-[11px] font-medium text-[#9B9FAD]">Рекомендуем</span>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-[26px] w-[110px] h-[110px] border border-solid border-[#E5E7EA] flex items-center justify-center">
                        <button className='w-[36px] h-[36px] rounded-[50%] bg-primary flex items-center justify-center'>
                            <ArrowImg className='h-[18px] w-[18px] rotate-[180deg]' />
                        </button>
                    </div>
                </div>
                <div className="flex gap-[15px]">
                    <div className="grow rounded-[26px] bg-primary px-[25px] py-[20px] flex flex-col gap-[15px]">
                        <span className='text-[18px] font-medium text-[#787B86]'>Финансы</span>
                        <div className="flex flex-col gap-[10px] grow">
                            <div className="bg-[#ECEEF1] rounded-[11px] p-[15px] h-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart margin={{ top: 20, right: 10, left: 10, bottom: 0 }} width={100} height={300} data={data}>
                                        <Line dot={{ fill: '#007BFB' }} type="monotone" dataKey="uv" stroke="#007BFB" />
                                        <CartesianGrid horizontal={false} vertical={true} stroke="#BDBFC7" />
                                        <XAxis interval="preserveStartEnd" includeHidden={true} tickSize={0} tick={{ fill: '#9B9FAD', fontSize: '10' }} dataKey="date" axisLine={false} />
                                    </LineChart>
                                </ResponsiveContainer>

                            </div>
                            <div className="flex flex-col">
                                <span className='text-[18px] font-medium'>28 728 ₽</span>
                                <span className='text-[#9B9FAD] text-[12px] font-medium'>Расходы за неделю</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <div className="bg-[#ECEEF1] rounded-[26px] p-[20px] flex flex-col gap-[30px] grow min-w-[145px]">
                            <CartImg />
                            <div className="flex flex-col *:leading-[1.2]">
                                <span className='text-[#007BFB] text-[18px] font-medium'>5 490 893 ₽</span>
                                <span className='text-[#9B9FAD] text-[11px] font-medium'>Депозит</span>
                            </div>
                        </div>

                        <div className="bg-[#ECEEF1] rounded-[26px] p-[20px] flex flex-col gap-[30px] grow min-w-[145px]">
                            <div className="flex items-center justify-between">
                                <TimeImg />
                                <span className='text-[#9B9FAD] text-[11px] font-medium'>доступно</span>
                            </div>
                            <div className="flex flex-col">
                                <span className='text-[#9B9FAD] text-[18px] font-medium'>100 000 ₽</span>
                                <span className='text-[#9B9FAD] text-[11px] font-medium'>Офердрафт</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-[26px] bg-primary px-[25px] py-[20px] grow flex flex-col gap-[15px]">
                    <span className='text-[18px] font-medium text-[#787B86]'>Ожидают согласования</span>
                    <div className="flex gap-[10px] grow items-center">
                        <div className="flex flex-col gap-[5px] max-w-[130px]">
                            <div className="rounded-[16px] bg-[#ECEEF1] p-[10px] flex flex-col gap-[10px]">

                                <div className="self-end bg-[#007BFB] rounded-[11px] px-[10px] py-[3px] text-[10px] font-medium text-primary">
                                    Послезавтра
                                </div>
                                <p className="text-[#787B86] font-medium">
                                    Инспекция
                                    в Самару
                                </p>


                            </div>
                            <button className="py-[8px] bg-black rounded-[13px] flex items-center justify-center gap-[5px]">
                                <TimerImg className=' w-[18px] h-[18px]' />
                                <span className='text-primary font-medium leading-[1]'>15:47</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Home