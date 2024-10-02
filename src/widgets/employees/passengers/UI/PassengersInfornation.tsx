
import { passengers } from '../../utils';
import { FilterUsers } from '../../UI';


const PassengersInfornation = ({ selectedPassengerId, close }: { selectedPassengerId: number | null, close:Function }) => {
    const selectedPassenger = passengers.find(item => item.id === selectedPassengerId);





    return (
        <div className="p-[20px] flex flex-col gap-[10px] h-full">
            {
                !selectedPassenger ? (
                    <div className="grow flex items-center justify-center">
                        <span className='text-[#787B86]'>
                            Здесь можно добавить пассажиров, которые не являются вашими сотрудниками и не имеют аккаунта. Это упростит создание групповых поездок.
                        </span>
                    </div>
                )
                    :
                    (
                        <FilterUsers disabled={true} close={close}/>
                    )
            }
        </div>
    );
};

export { PassengersInfornation };