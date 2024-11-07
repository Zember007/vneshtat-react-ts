
import { useSelector } from 'react-redux';
import { FilterSections } from '../../UI';
import { RootState } from '@/app/config/store';


const SectionsInfornation = ({ selectedSectionId }: { selectedSectionId: number | null, close:Function }) => {
    
    const Sections = useSelector((state: RootState) => state.employees.Sections);
    const selectedSections = Sections.find(item => item.id === selectedSectionId);

    return (
        <div className="p-[20px] flex flex-col gap-[10px] h-full">
            {
                selectedSections && (
                    <FilterSections selectedSectionId={selectedSectionId}/>
                )
            }
        </div>
    );
};

export { SectionsInfornation };