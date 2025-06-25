export interface User {
    name: string,
    email: string,
    roles?: Role[],
    permissions?: Permission[]
    imageUrl?: string
}

export interface Role {
    id: number,
    name: string, 
    guard_name: string,
    created_at: Date,
    updated_at: Date,
}


export interface Permission {
    id: number,
    name: string, 
    guard_name: string,
    created_at: Date,
    updated_at: Date,
}