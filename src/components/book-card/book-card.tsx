import React, {useContext} from 'react';
import './book-card.styles.scss';
import {BookCardType} from './book-card.interface';
import {ReadingListContext} from '../../contexts/reading-list/reading-list.context';
import BookImageFallback from '../../assets/book_fallback.jpg';

const BookCard: React.FC<BookCardType> = ({id, volumeInfo}) => {
    const { addItem, removeItem, isRead } = useContext(ReadingListContext);
    const { title, authors = [], description, imageLinks, publishedDate, publisher } = volumeInfo;
    const imageLink = imageLinks && imageLinks.hasOwnProperty('smallThumbnail') ? imageLinks['smallThumbnail'] : BookImageFallback;
    const itemToAdd = { id, title, authors };

    return (
        <article className="book book-card">
            <div className="text-center book-media">
                <figure>
                    <img src={`${imageLink}`} alt="title" className="img-fluid"/>
                </figure>
                {isRead(id)
                    ? (<button className="btn btn-outline-accent btn-remove-favorite" onClick={() => removeItem(id)} title="Remove from reading list">Remove</button>)
                    : (<button className="btn btn-accent btn-add-favorite" onClick={() => addItem(itemToAdd)} title="Add to reading list">Add</button>)
                }
            </div>
            <div className="book-info">
                <h3 className="book-title">{title}</h3>
                <div className="book-meta">{authors.length > 0 && <span>Author: </span>}
                    {authors.map((author, idx) => (
                        (<span key={idx} className="meta">{author}</span>)
                    ))}
                </div>
                <div className="small book-meta book-publish-info">{publisher ? <span className="meta">Publisher: {publisher}</span> : ''} {publishedDate ? <span className="meta">Published date: {publishedDate}</span>: ''}</div>
                <div className="book-description">{description}</div>
            </div>
        </article>
    );
};

export default BookCard;
