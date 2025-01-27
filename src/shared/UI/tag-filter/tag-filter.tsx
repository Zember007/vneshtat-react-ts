import clsx from 'clsx';
import CrossImg from "@/assets/icons/cross.svg?react";
import {TagItem, TagFilterProps} from './tag-filter.props';

const TagFilter = ({extraClass, childClass, tags, setter, ...rest}: TagFilterProps) => {
    const addTag = (tagToAdd: TagItem) => {
        if (!tags.selectedTags.includes(tagToAdd)) {
            const updatedTags = {
                ...tags,
                selectedTags: [...tags.selectedTags, tagToAdd]
            };
            setter(updatedTags);
        }
    };

    const removeTag = (tagToRemove: number) => {
        const updatedTags = {
            ...tags,
            selectedTags: tags.selectedTags.filter(tag => tag.id !== tagToRemove)
        };
        setter(updatedTags);
    };

    return (
        <div className={clsx(`flex gap-2.5`, extraClass)} {...rest}>
            {tags.tags.map((tag) => {
                const isSelected = tags.selectedTags.includes(tag);
                return (
                    <div
                        key={tag.id}
                        className={clsx(
                            `flex items-center py-2 ${isSelected ? "px-2.5" : "px-[18px]"} gap-0.5 rounded-primary cursor-pointer ${childClass}`,
                            {
                                "bg-black": isSelected,
                                "border border-solid border-[#e5e7ea]": !isSelected
                            },
                        )}
                        onClick={() => isSelected ? removeTag(tag.id) : addTag(tag)}
                    >
                        {isSelected && <CrossImg className="w-4 h-4"/>}
                        <p className={clsx("text-sm whitespace-nowrap cursor-pointer", {
                            "text-primary": isSelected
                        })}>{tag.value}</p>
                    </div>
                );
            })}
        </div>
    );
};

export {TagFilter};
