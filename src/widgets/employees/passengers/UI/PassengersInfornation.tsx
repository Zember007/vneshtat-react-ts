
import { useSelector } from 'react-redux';
import { FilterUsers } from '../../UI';
import { RootState } from '@/app/config/store';


const PassengersInfornation = ({ selectedPassengerId, close }: { selectedPassengerId: number | null, close:Function }) => {

    
    const Passengers = useSelector((state: RootState) => state.employees.Passengers);
    const selectedPassenger = Passengers.find(item => item.id === selectedPassengerId);
    

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
                        <FilterUsers selectId={selectedPassengerId} passenger={true} close={close} />
                    )
            }
        </div>
    );
};

export { PassengersInfornation };