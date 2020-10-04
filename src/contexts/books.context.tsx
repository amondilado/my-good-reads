import React, {useReducer, createContext, Dispatch} from 'react';
import {updateBooks, updateReadBooks} from './book.context.utils';
import {BooksContextInitialStateType, BookType} from '../types';

const INITIAL_STATE = {
    fetching: false,
    books: [],
    readBooks: [],
    count: 0
};

type Action =
| { type: 'BOOKS_FETCHING' }
| { type: 'BOOKS_FETCHED', payload: BookType[] }
| { type: 'ADD', payload: BookType }
| { type: 'REMOVE', payload: string };

const BooksContext = createContext<{
        state: BooksContextInitialStateType,
        dispatch: Dispatch<any>
    }>({
    state: INITIAL_STATE,
    dispatch: () => null
});

let booksReducer = (state: BooksContextInitialStateType, action: Action): BooksContextInitialStateType | any => {
    switch (action.type) {
        case "BOOKS_FETCHING":
            console.log('BOOKS_FETCHING');
            return { ...state, fetching: true };
        case "BOOKS_FETCHED":
            console.log('BOOKS_FETCHED');
            const readbooks = updateReadBooks(action.payload);
            return { fetching: false, books: action.payload, readBooks: readbooks, count: readbooks.length };
        case "ADD":
            console.log('ADD');
            return {
                ...state,
                books: updateBooks(state.books, action.payload.id),
                count: state.count++,
                readBooks: [...state.readBooks, action.payload]
            };
        case "REMOVE":
            console.log('REMOVE');
            return {
                ...state,
                books: updateBooks(state.books, action.payload),
                count: state.count--,
                readBooks: state.readBooks.filter(book => book.id !== action.payload)
            };
        default:
            return;
    }
};

const BooksProvider: React.FC = ({children}) => {
    const [state, dispatch] = useReducer(booksReducer, INITIAL_STATE);

    return (
        <BooksContext.Provider value={{ state, dispatch }}>
            {children}
        </BooksContext.Provider>
    );
};
export { BooksContext, BooksProvider };