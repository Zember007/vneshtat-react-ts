import CloseImg from '@/assets/icons/close.svg?react'
import RouteImg from '@/assets/icons/route.svg?react'
import WarnImg from '@/assets/icons/warn.svg?react'
import PlaneImg from '@/assets/icons/plane.svg?react'
import BedImg from '@/assets/icons/bed.svg?react'
import TrainImg from '@/assets/icons/train.svg?react'
import BusImg from '@/assets/icons/bus.svg?react'
import { useState } from 'react'
import Summary from './Filters/Summary'
import Route from './Filters/Route'
import Jorneys from './Filters/Jorneys'


const StatisticsFilter = ({ close }: { close: Function }) => {

    const filters = [
        { icon: WarnImg, code: 'warn' },
        { icon: RouteImg, code: 'route' },
        { icon: PlaneImg, code: 'plane' },
        { icon: TrainImg, code: 'train' },
        { icon: BusImg, code: 'bus' },
        { icon: BedImg, code: 'bed' },
    ]

    const [selectFilter, setSelectFilter] = useState<string>('warn')

    return (
        <>
            <div className="flex gap-[10px]">
                {filters.map(item => (
                    <button
                        onClick={() => { setSelectFilter(item.code) }}
                        className={`flex items-center justify-center w-[35px] h-[35px] rounded-[11px] ${item.code === selectFilter ? 'bg-[#121212]' : 'bg-[#ECEEF1]'}`}>
                        <item.icon className={`w-[19px] h-[19px] ${item.code === selectFilter ? '*:fill-[#FAFAFA]' : '*:fill-[#121212]'}`} />
                    </button>
                ))}
            </div>

            <div className="mt-[5px] flex items-center justify-between pb-[10px] border-0 border-b border-solid border-[#D9D9D9]">
                <span className="font-medium">Сводка</span>
                <button
                    onClick={() => { close() }}>
                    <CloseImg className='*:fill-[#BDBFC7] w-[18px] h-[18px]' />
                </button>
            </div>

            <div className="flex flex-col gap-[15px] grow h-full overflow-y-auto scroll max-h-[calc(100vh-330px)]">
                {selectFilter === 'warn' && <Summary />}
                {selectFilter === 'route' && <Route />}
                {selectFilter === 'plane' && <Jorneys />}
            </div>
        </>
    );
};

export { StatisticsFilter };