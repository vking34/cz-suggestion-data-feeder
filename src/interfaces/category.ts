export interface PgCategory {
    id: number,
    parent_id: number,
    level: number
}

export interface MgCategory {
    _id: string,
    categories: [string]
}