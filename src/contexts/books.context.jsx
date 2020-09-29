import React, {useReducer} from 'react';
import {updateBooks} from './book.context.utils';

let booksReducer = (state, action) => {
    switch (action.type) {
        case "BOOKS_FETCHING":
            console.log('BOOKS_FETCHING');
            return { ...state, fetching: true };
        case "BOOKS_FETCHED":
            console.log('BOOKS_FETCHED');
            return { ...state, fetching: false, books: action.payload };
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

const INITIAL_STATE = {
    fetching: false,
    books: [],
    readBooks: [],
    count: 0
};

const BooksContext = React.createContext(INITIAL_STATE);
function BooksProvider(props) {
    const [state, dispatch] = useReducer(booksReducer, INITIAL_STATE);

    return (
        <BooksContext.Provider value={{ state, dispatch }}>
            {props.children}
        </BooksContext.Provider>
    );
}
export { BooksContext, BooksProvider };