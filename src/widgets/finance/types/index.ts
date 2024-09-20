
interface Information_list_items {
    title: string;
    code: string;
}

interface Information_list {
    title: string;
    data: string;
    type?: string;
    items?: Array<Information_list_items>;
}

export interface Information {
    list: Array<Information_list>;
    edit: boolean;
}