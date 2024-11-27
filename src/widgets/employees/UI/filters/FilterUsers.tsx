import AccessImg from '@/assets/icons/access.svg?react'
import PeriodImg from '@/assets/icons/period.svg?react'
import UserImg from '@/assets/icons/user.svg?react'
import TravelPolicyImg from '@/assets/icons/travel-policy.svg?react'
import DocumentImg from '@/assets/icons/document.svg?react'
import CloseImg from '@/assets/icons/cross.svg?react'
import AddCartImg from '@/assets/icons/add_cart.svg?react'
import clsx from "clsx";

import FilterAccess from "./FilterAccess";
import FilterCarts from "./FilterCarts";
import FilterDocument from "./FilterDocument";
import FilterPeriod from "./FilterPeriod";
import FilterTravel from "./FilterTravel";
import FilterUser from "./FilterUser";
import { setActiveFilter } from '../../model/index.store'
import { RootState } from '@/app/config/store'
import { useSelector, useDispatch } from 'react-redux'

const FilterUsers = ({ close, passenger, selectId }: { close: Function; passenger?: boolean; selectId:number | null }) => {

    const dispatch = useDispatch();

    const activeFilter = useSelector((state: RootState) => state.employees.activeFilter);

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
        },

        {
            Img: AccessImg,
            code: 'access',
            no_passanger: true
        },
        {
            Img: TravelPolicyImg,
            code: 'travel-policy',
            disabled: true
        },
        {
            Img: PeriodImg,
            code: 'period',
            no_passanger: true
        },
    ]

    

    return (
        <>
            <div className="flex gap-[10px]">
                {
                    filterNav.map((item,index) => (
                        <button onClick={() => { dispatch(setActiveFilter(item.code)) }} className={clsx('w-[35px] h-[35px] transition-all duration-300 flex items-center justify-center rounded-[11px] bg-[#ECEEF1]', activeFilter == item.code && '!bg-[#121212]', ((passenger && item.no_passanger) || item.disabled) && 'pointer-events-none')}>
                            <item.Img key={index} className={clsx('w-[19px] h-[19px] *:duration-300 *:transition-all', activeFilter === item.code && '*:fill-[#FAFAFA]', ((passenger && item.no_passanger) || item.disabled) ? '*:fill-[#8C909C]' : activeFilter !== item.code ? '*:fill-[#121212]' : '')} />
                        </button>
                    ))
                }
            </div>
            <div className="flex items-center justify-between border-b-[#E5E7EA] border-solid border-0 border-b pb-[10px]">
                <span className="font-medium ">
                    {activeFilter === 'user' ? 'Личные данные' :
                        activeFilter === 'document' ? 'Документы' :
                            activeFilter === 'ad-cart' ? 'Мильные карты' :
                                activeFilter === 'period' ? 'Периоды отсутствия' :
                                    activeFilter === 'access' ? 'Доступ' :
                                        ''}
                </span>
                {activeFilter !== 'travel-policy' && <button onClick={() => { close() }}>
                    <CloseImg className="*:fill-[#BDBFC7] h-[18px] w-[18px]" />
                </button>}
            </div>
            <div className={clsx("flex flex-col gap-[10px] grow h-full scroll overflow-y-auto max-h-[calc(100vh-342px)]")}>
                {activeFilter === 'user' ?
                    (
                        <FilterUser selectId={selectId} passenger={passenger}/>
                    ) : activeFilter === 'document' ?
                        (
                            <FilterDocument selectId={selectId} passenger={passenger}/>
                        ) : activeFilter === 'ad-cart' ?
                            (
                                <FilterCarts />
                            ) : activeFilter === 'access' ?
                                (
                                    <FilterAccess selectId={selectId}/>
                                ) : activeFilter === 'travel-policy' ?
                                    (
                                        <FilterTravel />
                                    ) :
                                    (
                                        <FilterPeriod />
                                    )
                }

            </div>
        </>
    );
};

export { FilterUsers };