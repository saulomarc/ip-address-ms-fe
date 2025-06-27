

export interface TableHeader {
    name: string,
    sortable: boolean,
    label: string,
    checkbox?: boolean,
    selectField?: string
}

export interface TableContents {
    [key: string]: any
}

export interface TableData {
    data: TableContents[],
    current_page: number,
    last_page: number, 
    lastIndex?: number,
    length?: number
}