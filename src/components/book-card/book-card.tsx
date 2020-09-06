import React, {useContext} from 'react';
import './book-card.scss';
import {BookType} from './book-card.interface';
import {FavoritesContext} from '../../contexts/favorites/favorites.context';

const BookCard: React.FC<BookType> = ({id, volumeInfo}) => {
    const { addItem, favorites } = useContext(FavoritesContext);
    const { title, authors = [], description, imageLinks, publishedDate, publisher } = volumeInfo;
    const imageLink = imageLinks && imageLinks.hasOwnProperty('smallThumbnail') ? imageLinks['smallThumbnail'] : '';
    const favoriteItem = { id, title, imageLink, authors };

    return (
        <article className="book-card">
            <div className="book-media">
                {/*<img src={`${imageLink}`} alt="title"/> TODO*/}
                <button className="btn btn-add-favorite" onClick={() => addItem(favoriteItem)}>Add: {favorites.length}</button>
            </div>
            <div className="small book-info">
                <h2 className="book-title">{title}</h2>
                <div>by: {authors.map((author, idx) => (
                    (<span key={idx}>{author}</span>)
                ))}</div>
                <div>{publisher} {publishedDate}</div>
                <p>{description}</p>
            </div>
        </article>
    );
};

export default BookCard;
