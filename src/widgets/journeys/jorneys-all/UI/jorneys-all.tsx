import Layout from "@/app/layouts/layout";
import { SearchInput, Switch, TagFilter } from "@/shared/UI";
import { Tag } from "@/shared/UI/tag-filter/tag-filter.props";
import { useState } from "react";
import JorneyCart from "./JorneyCart";
import 'mapbox-gl/dist/mapbox-gl.css';
import Filter from "./Filter";


const JorneysAll = () => {

    const [search, setSearch] = useState<string | null>(null)
    const [activeFilter, setActiveFilter] = useState<boolean>(false)
    const [tags, setTags] = useState<Tag>({ tags: [        
        {value: 'Ближайшие', code: 'early', id: 0},
        {value: "По дате создания", code: 'date', id: 1},
        {value: 'По статусу', code: 'Status', id: 2},
    ], selectedTags: [] });

    return (
        <>
            <Layout
                component={
                    <>

                        <div className="p-[20px] rounded-[26px] bg-primary flex flex-col gap-[20px]">
                            <SearchInput value={search} change={setSearch} placeholder="Название поездки, город, рейс, отель" />
                            <div className="flex gap-[10px]">
                                <Switch
                                    firstChild={<span className="text-[12px] font-medium">Активные</span>}
                                    secondChild={<span className="text-[12px] font-medium">Завершённые</span>}
                                    isSelected={activeFilter}
                                    setter={setActiveFilter}
                                />
                                <TagFilter tags={tags} setter={setTags} extraClass={"max-h-[35px]"} />
                            </div>
                        </div>
                        <div className="h-full grow p-[20px] rounded-[26px] bg-primary flex flex-col gap-[15px]">
                            <JorneyCart />
                        </div>

                    </>
                }

                information={
                    <>
                        <Filter />
                    </>
                }
            />

        </>
    );
};

export { JorneysAll };