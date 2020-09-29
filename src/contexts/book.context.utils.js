export const updateBooks = (books, id) => {
    return books.map(book => book.id === id
        ? {...book, isRead: !book.isRead}
        : book)
};