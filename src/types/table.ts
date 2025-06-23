import type { IPAddress } from "./ip_address"

export interface TableHeader {
    name: string,
    sortable: boolean,
    label: string,
    checkbox?: boolean,
    selectField?: string
}

export interface TableData {
    data: IPAddress[],
    current_page: number,
    last_page: number, 
    lastIndex?: number,
    length?: number
}