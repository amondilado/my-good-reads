export interface BookType {
    id: string,
    title?: string,
    authors?: Array<string>,
    publisher?: string,
    publishedDate?: Date,
    coverUrl?: string,
    description?: string,
    isRead: boolean
}

export interface BooksContextInitialStateType {
    fetching: boolean,
    books: BookType[],
    readBooks: BookType[],
    count: number
}