import React from 'react';
import BookCard from '../book-card/book-card';
import {BookResultsType} from '../book-card/book-card.interface';

const BookList: React.FC<BookResultsType> = ({bookResults}) => {
    const hasResults = bookResults.length > 0;
    if (hasResults) {
        return (
            <div className="book-list">
                <h2>Search results</h2>
                {bookResults.map(bookItem =>
                    (<BookCard key={bookItem.id} id={bookItem.id} volumeInfo={bookItem.volumeInfo}/>)
                )}
            </div>
        );
    } else {
        return (<h2>Search results</h2>)
    }
};
export default BookList;