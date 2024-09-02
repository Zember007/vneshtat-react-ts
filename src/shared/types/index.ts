export type ActiveOperation = "filter" | "decor" | "route" | "passengers" | "radar" | "add"

export type SeatState = "cheap" | "irrevocable" | "free" | "selected"

export type UserStatus = "in_queue" | "in_progress" | "completed";

export interface Seat {
    order: number,
    isBooked: boolean,
    state: SeatState
}
export interface Range {
    max: number,
    min: number
}

export interface Passenger {
    id: number,
    name: string,
    surname: string,
    password: string,
    internationalPw: string,
    deleteCountdown: null | number
}

export interface FilterData<T> {
    data: T;
    isChanged: boolean;
}

export interface TicketOption {
    id: number,
    title: string,
    count: number,
    fromPrice: string
    isSelected: boolean
}

export interface City {
    CityId: number;
    Code: string;
    CountryId: number;
    ExpressCode: string | null;
    Guid: string;
    IsActive: number;
    Location: string;
    NameEn: string;
    NameRu: string;
    PopularityIndex: number;
    RegionId: number;
    SysCode: string;
    Updated: string;
    nameEn: string;
    nameRu: string;
}
