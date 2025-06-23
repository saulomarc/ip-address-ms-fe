export interface Filters {
    [key: string]: []
}

export interface FilterValues {
    [key: string]: string | number | null
}

export interface FilterHeader {
    field: string,
    name: string,
    type: string,
    label: string,
}