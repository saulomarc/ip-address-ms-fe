export interface IPAddress {
    id?: number,
    ip_address: string,
    label: string,
    comment?: string | null,
    [key: string]: any
}

export interface PaginationLink {
    url: string | null,
    label: string,
    active: boolean
}

export interface IpAddressData {
    current_page: number,
    data: IPAddress[],
    first_page_url: string,
    from: number,
    last_page: number,
    last_page_url: string,
    links: PaginationLink[],
    next_page_url: string | null,
    path: string,
    per_page: number,
    prev_page_url: string | null,
    to: number,
    total: number
}