import {Dispatch, SetStateAction} from "react";

export interface TagFilterProps {
    tags: Tag,
    setter: Dispatch<SetStateAction<Tag>>
    extraClass?: string
    childClass?: string
}

export interface Tag {
    tags: TagItem[],
    selectedTags: TagItem[]
}

export interface TagItem {
    id: number
    value: string
    code: string
}