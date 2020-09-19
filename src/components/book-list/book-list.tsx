import React from 'react';
import BookCard from '../book-card/book-card';
import {BookCardType} from '../book-card/book-card.interface';

type BookResultsType = {
    bookResults: BookCardType[]
};

const BookList: React.FC<BookResultsType> = ({bookResults}) => {
    const hasResults = bookResults.length > 0;
    const header = <h2>Search results</h2>;

    if (hasResults) {
        return (
            <div className="book-list">
                {header}
                {bookResults.map(bookItem =>
                    (<BookCard key={bookItem.id} id={bookItem.id} volumeInfo={bookItem.volumeInfo}/>)
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