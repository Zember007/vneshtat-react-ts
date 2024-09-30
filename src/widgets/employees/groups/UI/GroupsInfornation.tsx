import { groups } from '../../utils';
import { FilterGroups } from '../../UI';


const GroupsInfornation = ({ selectedGroupsId }: { selectedGroupsId: number | null }) => {
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
                        <FilterGroups />
                    )
            }
        </div>
    );
};

export { GroupsInfornation };