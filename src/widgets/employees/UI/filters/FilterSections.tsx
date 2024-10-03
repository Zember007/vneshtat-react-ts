import UserImg from '@/assets/icons/user.svg?react'
import TravelPolicyImg from '@/assets/icons/travel-policy.svg?react'
import InputSelect from '@/widgets/jobs/UI/InputSelect';
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import FilterTravel from "./FilterTravel";
import { setDeputy } from "../../model/index.store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/config/store";
import TrashImg from '@/assets/icons/trash.svg?react'
import PlusImg from '@/assets/icons/plus.svg?react'

const FilterSections = () => {

    const dispatch = useDispatch();

    const deputy = useSelector((state: RootState) => state.employees.deputy);

    const filterNav = [
        {
            Img: UserImg,
            code: 'user'
        },
        {
            Img: TravelPolicyImg,
            code: 'travel-policy'
        }
    ]

    const [activeFilter, setActiveFilter] = useState<string>('user')

    const box = useRef<HTMLDivElement | null>(null)

    const [maxHeight, setMaxHeight] = useState<string>()


    useEffect(() => {

        setMaxHeight(box.current?.offsetHeight + 'px')

    }, [box])

    return (
        <>
            <div className="flex gap-[10px]">
                {
                    filterNav.map(item => (
                        <button onClick={() => { setActiveFilter(item.code) }} className={clsx('w-[35px] h-[35px] transition-all duration-300 flex items-center justify-center rounded-[11px] bg-[#ECEEF1]', activeFilter == item.code && '!bg-[#121212]')}>
                            <item.Img className={clsx('w-[19px] h-[19px] *:duration-300 *:transition-all', activeFilter === item.code && '*:fill-[#FAFAFA]', activeFilter !== item.code && '*:fill-[#121212]')} />
                        </button>
                    ))
                }
            </div>
            <div className="flex items-center justify-between border-b-[#E5E7EA] border-solid border-0 border-b pb-[10px]"></div>
            <div ref={box} className="flex flex-col gap-[10px] grow h-full overflow-y-auto scroll" style={{ 'maxHeight': maxHeight }}>
                {activeFilter === 'user' ?
                    (
                        <>
                            <span className='mt-[5px] font-medium'>Название</span>
                            <div className="flex flex-col gap-[6px] rounded-[23px] p-[13px] bg-[#ECEEF1]">
                                <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                                    <input value={'Администрация'} type="text" className="w-full bg-[transparent] text-[12px] font-medium" />
                                </div>
                            </div>
                            <span className='mt-[5px] font-medium'>Руководитель отдела</span>
                            <div className="flex flex-col gap-[6px] rounded-[23px] p-[13px] bg-[#ECEEF1]">
                                <InputSelect data={deputy} change={(id: number) => dispatch(setDeputy({ id, oneChoise: true }))} />
                            </div>
                            <span className='mt-[5px] font-medium'>Сотрудники отдела</span>
                            <div className="flex flex-col gap-[6px] rounded-[23px] p-[13px] bg-[#ECEEF1]">
                                <div className=" group flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                                    <span className="max-w-full bg-[transparent] text-[12px] font-medium truncate">Соколовская Анастасия Александрова</span>
                                    <button className='trasition-all opacity-0 group-hover:opacity-100'>
                                        <TrashImg />
                                    </button>
                                </div>
                            </div>

                            <button className='rounded-[23px] border border-solid border-[#E5E7EA] p-[13px] flex justify-between items-center'>
                                <span className='text-[#787B86] text-[12px] font-normal'>Добавить сотрудника</span>
                                <PlusImg className='w-[14px] h-auto'/>
                            </button>
                        </>
                    ) :
                    (
                        <FilterTravel />
                    )
                }

            </div >
        </>
    );
};

export { FilterSections };