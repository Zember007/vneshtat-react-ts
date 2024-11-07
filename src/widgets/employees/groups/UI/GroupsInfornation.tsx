
import {  useSelector } from 'react-redux';
import { FilterGroups } from '../../UI';
import { RootState } from '@/app/config/store';


const GroupsInfornation = ({ selectedGroupsId }: { selectedGroupsId: number | null }) => {

    const groups = useSelector((state: RootState) => state.employees.GroupsInformation);

    const selectedGroups = groups.find(item => item.id === selectedGroupsId);

    return (
        <div className="p-[20px] flex flex-col gap-[10px] h-full">


            {
                !selectedGroups ? (
                    <div className="grow flex items-center justify-center">
                        <span className='text-[#787B86]'>
                            Здесь можно создать группы пассажиров, которые не являются вашими сотрудниками и не имеют аккаунта. Это упростит создание групповых поездок.
                        </span>
                    </div>
                )
                    :
                    (
                        <FilterGroups selectedGroupId={selectedGroupsId} />
                    )
            }
        </div>
    );
};

export { GroupsInfornation };