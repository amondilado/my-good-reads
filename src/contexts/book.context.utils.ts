import {BookType} from '../types';

export const updateBooks = (books: BookType[], id: string) => {
    return books.map(book => book.id === id
        ? {...book, isRead: !book.isRead}
        : book)
};

export const updateReadBooks = (books: BookType[]) => {
  return books.filter(book => {
      return book.isRead
  })
};