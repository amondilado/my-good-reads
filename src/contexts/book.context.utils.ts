import {IBook} from '../types';

export const updateBooks = (books: IBook[], id: string) => {
    return books.map(book => book.id === id
        ? {...book, isRead: !book.isRead}
        : book)
};

export const updateReadBooks = (books: IBook[]) => {
  return books.filter(book => {
      return book.isRead
  })
};