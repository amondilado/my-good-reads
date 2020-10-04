import React, {useContext} from 'react';
import BookCard from '../book-card/book-card';
import {BooksContext} from "../../contexts/books.context";

const BookList = () => {
    const { state } = useContext(BooksContext);
    const hasResults = state.books.length > 0;
    const header = <h2>Search results</h2>;

    if(state.fetching) {
        return <p>fetching...</p>
    }

    if (hasResults) {
        return (
            <div className="book-list">
                {header}
                {state.books.map(book =>
                    (<BookCard key={book['id']} data={book} />)
                )}
            </div>
        );
    }

    return (
        <div className="book-list" data-testid="book-list-empty">
            {header}
            <p>No results found.</p>
        </div>
    )
};
export default BookList;