export interface UserSession {
    id: number,
    session_id: string,
    logged_on: Date,
    logged_out: Date,
    user_name: string,
    [key: string]: any
}

export interface ActivityLog {
    id: number,
    log_name: string,
    description: string,
    properties: Properties,
    created_at: Date,
    updated_at: Date,
    session_id: string,
    [key: string]: any
}

export interface Properties {
    new?: {},
    old?: {},
}

export interface PaginationLink {
    url: string | null,
    label: string,
    active: boolean
}

export interface UserSessionData {
    current_page: number,
    data: UserSession[],
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