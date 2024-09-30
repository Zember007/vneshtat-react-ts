
import { sections } from '../../utils';
import { FilterSections } from '../../UI';


const SectionsInfornation = ({ selectedSectionId }: { selectedSectionId: number | null }) => {
    const selectedSections = sections.find(item => item.id === selectedSectionId);

    return (
        <div className="p-[20px] flex flex-col gap-[10px] ">
            {
                selectedSections && (
                    <FilterSections />
                )
            }
        </div>
    );
};

export { SectionsInfornation };