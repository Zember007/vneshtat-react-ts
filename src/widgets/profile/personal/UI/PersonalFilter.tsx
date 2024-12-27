/* import { useState } from "react"; */
import UserImg from '@/assets/icons/user.svg?react'
import DocumentImg from '@/assets/icons/document.svg?react'
import CloseImg from '@/assets/icons/cross.svg?react'
import AddCartImg from '@/assets/icons/add_cart.svg?react'
import clsx from "clsx";
import FilterUser from "@/widgets/employees/UI/filters/FilterUser";
import FilterDocument from "@/widgets/employees/UI/filters/FilterDocument";
import FilterCarts from "@/widgets/employees/UI/filters/FilterCarts";
import SimpleBar from "simplebar-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/config/store";
import { setActivePersonalFilter } from "../../model/profile.store";


const PersonalFilter = ({ close }: { close: Function }) => {
    const filterNav = [
        {
            Img: UserImg,
            code: 'user'
        },
        {
            Img: DocumentImg,
            code: 'document'
        },
        {
            Img: AddCartImg,
            code: 'ad-cart'
        }
    ]

    const dispatch = useDispatch()

    const activePersonalFilter = useSelector((state: RootState) => state.profile.activePersonalFilter);

    const EmployeeId = localStorage.getItem('EmployeeId')


    return (
        <>
            <div className="flex gap-[10px]">
                {
                    filterNav.map((item, index) => (
                        <button onClick={() => { dispatch(setActivePersonalFilter(item.code)) }} className={clsx('w-[35px] h-[35px] transition-all duration-300 flex items-center justify-center rounded-[11px] bg-[#ECEEF1]', activePersonalFilter == item.code && '!bg-[#121212]')}>
                            <item.Img key={index} className={clsx('w-[19px] h-[19px] *:duration-300 *:transition-all', activePersonalFilter === item.code ? '*:fill-[#FAFAFA]' : '*:fill-[#121212]')} />
                        </button>
                    ))
                }
            </div>
            <div className="flex items-center justify-between border-b-[#E5E7EA] border-solid border-0 border-b pb-[10px]">
                <span className="font-medium ">
                    {activePersonalFilter === 'user' ? 'Личные данные' :
                        activePersonalFilter === 'document' ? 'Документы' :
                            activePersonalFilter === 'ad-cart' ? 'Мильные карты' :
                                ''}
                </span>
                <button onClick={() => { close() }}>
                    <CloseImg className="*:fill-[#BDBFC7] h-[18px] w-[18px]" />
                </button>
            </div>
            <SimpleBar className="max-h-[calc(100vh-342px)]">
                <div className={clsx("flex flex-col gap-[10px] grow h-full ")}>
                    {activePersonalFilter === 'user' ?
                        (
                            <FilterUser selectId={Number(EmployeeId)} passenger={false} profile={true} />
                        ) : activePersonalFilter === 'document' ?
                            (
                                <FilterDocument selectId={Number(EmployeeId)} passenger={false} profile={true} />
                            ) :
                            (
                                <FilterCarts />
                            )
                    }

                </div>
            </SimpleBar>
        </>
    );
};

export { PersonalFilter };