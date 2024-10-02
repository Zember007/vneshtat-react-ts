import SectionsImg from '@/assets/icons/sections.svg?react'
import DocumentImg from '@/assets/icons/document.svg?react'
import CloseImg from '@/assets/icons/cross.svg?react'
import clsx from "clsx";
import { useState } from "react";
import InputSelect from '@/widgets/jobs/UI/InputSelect';
import { setRequire } from "../../model/index.store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/config/store";

const FilterStructure = ({close}:{close:Function}) => {

    const dispatch = useDispatch();

    const require = useSelector((state: RootState) => state.employees.require);

    const filterNav = [
        {
            Img: DocumentImg,
            code: 'document'
        },
        {
            Img: SectionsImg,
            code: 'sections'
        },
    ]

    const [activeFilter, setActiveFilter] = useState<string>('document')
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
            <div className="flex items-center justify-between border-b-[#E5E7EA] border-solid border-0 border-b pb-[10px]">
                <span className="font-medium ">
                    {activeFilter === 'document' ? 'Данные параметра' : 'Значения'}
                </span>
                {activeFilter !== 'travel-policy' && <button onClick={() => {close()}}>
                    <CloseImg className="*:fill-[#BDBFC7] h-[18px] w-[18px]" />
                </button>}
            </div>
            <div className="flex flex-col gap-[10px] max-h-full scroll ">
                {activeFilter === 'document' ?
                    (
                        <div className="flex flex-col gap-[6px] rounded-[23px] p-[13px] bg-[#ECEEF1]">
                            <div className="flex items-center justify-between rounded-[13px] py-[8px] px-[10px] bg-[#FAFAFA]">
                                <span className=" text-[12px] font-medium text-[#9B9FAD]">Название</span>
                                <input value={'Должность'} type="text" className="w-full bg-[transparent] text-[12px] font-medium text-right" />
                            </div>

                            <InputSelect data={require} change={(id:number) => {dispatch(setRequire({id, oneChoise: true}))}} title='Название' />
                        </div>
                    ) :
                    (
                        <></>
                    )
                }

            </div>
        </>
    );
};

export { FilterStructure };