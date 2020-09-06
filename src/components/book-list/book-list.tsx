import React, {useContext} from 'react';
import './book-list.scss';
import {AppContext} from '../../contexts/context';
import BookCard from '../book-card/book-card';

const BookList: React.FC = () => {
    const state = useContext(AppContext);
    const bookResults = state.state.items;

    return (
        <div className="book-list">
            {bookResults.length > 0 && (<h2>Search results</h2>)}
            {bookResults.map(bookItem => (<BookCard
                key={bookItem.id}
                id={bookItem.id}
                volumeInfo={bookItem.volumeInfo}
            />))}
        </div>
    );
};
export default BookList;