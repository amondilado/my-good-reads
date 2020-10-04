export interface IBook {
    id: string,
    title?: string,
    authors?: Array<string>,
    publisher?: string,
    publishedDate?: string,
    coverUrl?: string,
    description?: string,
    isRead: boolean
}

export interface IBooksContextInitialState {
    fetching: boolean,
    books: IBook[],
    readBooks: IBook[],
    count: number
}