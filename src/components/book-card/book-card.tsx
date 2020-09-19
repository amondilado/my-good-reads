import React, {useContext} from 'react';
import './book-card.styles.scss';
import {BookCardType} from './book-card.interface';
import {FavoritesContext} from '../../contexts/favorites/favorites.context';

const BookCard: React.FC<BookCardType> = ({id, volumeInfo}) => {
    const { addItem, removeItem, isFavorite } = useContext(FavoritesContext);
    const { title, authors = [], description, imageLinks, publishedDate, publisher } = volumeInfo;
    // TODO set fallback img
    const imageLink = imageLinks && imageLinks.hasOwnProperty('smallThumbnail') ? imageLinks['smallThumbnail'] : '';
    const favoriteItem = { id, title };

    return (
        <article className="book book-card">
            <div className="text-center book-media">
                <figure>
                    <img src={`${imageLink}`} alt="title" className="img-fluid"/>
                </figure>
                {isFavorite(id)
                    ? (<button className="btn btn-outline-accent btn-remove-favorite" onClick={() => removeItem(id)} title="Remove from reading list">Remove</button>)
                    : (<button className="btn btn-accent btn-add-favorite" onClick={() => addItem(favoriteItem)} title="Add to reading list">Add</button>)
                }
            </div>
            <div className="small book-info">
                <h2 className="book-title">{title}</h2>
                <div className="book-authors">by: {authors.map((author, idx) => (
                    (<span key={idx} className="book-author">{author}</span>)
                ))}</div>
                <div>{publisher} {publishedDate}</div>
                <p>{description}</p>
            </div>
        </article>
    );
};

export default BookCard;
