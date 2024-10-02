import { structure } from '../../utils';
import { FilterStructure } from '../../UI';

const StructureInfornation = ({ selectedStructureId, close }: { selectedStructureId: number | null, close:Function }) => {

    const selectedStructure = structure.find(item => item.id === selectedStructureId);

    return (
        <div className="p-[20px] flex flex-col gap-[10px] h-full">


            {
                !selectedStructure ? (
                    <div className="grow flex items-center justify-center">
                        <span className='text-[#787B86]'>
                        Если вам не хватает параметров в карточке сотрудника, вы можете создать их сами. К примеру, табельный номер или должность. Параметры появятся в разделе Личные данные.
                        </span>
                    </div>
                )
                    :
                    (
                        <FilterStructure close={close}/>
                    )
            }
        </div>
    );
};

export { StructureInfornation };