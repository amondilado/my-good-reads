import React, {FC, useContext} from 'react';
import './book-card.styles.scss';
import BookImageFallback from '../../assets/book_fallback.jpg';
import {BooksContext} from "../../contexts/books.context";
import {BookType} from '../../types';
import {dateFormat} from '../../shared/utils';

const BookCard: React.FC<{ data: BookType}> = ({data}) => {
    const { id, title, authors = [], description, coverUrl, publishedDate, publisher, isRead } = data;
    const imageLink = coverUrl || BookImageFallback;
    const {dispatch} = useContext(BooksContext);

    return (
        <article className="book book-card">
            <div className="text-center book-media">
                <figure>
                    <img src={`${imageLink}`} alt="title" className="img-fluid"/>
                </figure>
                {isRead
                    ? (<button className="btn btn-outline-accent btn-remove-favorite" onClick={() => dispatch({type: 'REMOVE', payload: id})} title="Remove from reading list">Remove {isRead ? "true" : "false"}</button>)
                    : (<button className="btn btn-accent btn-add-favorite" onClick={() => dispatch({type: 'ADD', payload: data})} title="Add to reading list">Add {isRead ? "true" : "false"}</button>)
                }
            </div>
            <div className="book-info">
                <h3 className="book-title">{title}</h3>
                <div className="book-meta">{authors.length > 0 && <span>Author: </span>}
                    {authors.map((author, idx) => (
                        (<span key={idx} className="meta">{author}</span>)
                    ))}
                </div>
                <div className="small book-meta book-publish-info">{publisher ? <span className="meta">Publisher: {publisher}</span> : ''} {publishedDate ? <span className="meta">Published date: {dateFormat(publishedDate)}</span>: ''}</div>
                <div className="book-description">{description}</div>
            </div>
        </article>
    );
};

export default BookCard;
