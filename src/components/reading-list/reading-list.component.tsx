import React, {useContext} from "react";
import {BooksContext} from "../../contexts/books.context";
import "./reading-list.styles.scss";
import {dateFormat} from '../../shared/utils';

const ReadingList = () => {
    const {state, dispatch} = useContext(BooksContext);
    const {count, readBooks} = state;

    return (
        <div className="small reading-list-container">
            <h2 className="flex-justify-center">My reading list
                <span className="flex-center reading-list-count" data-testid="reading-list-count">{count}</span>
            </h2>

            {readBooks.length > 0 ? (
                <ul className="reading-list-content" data-testid="reading-list">
                {readBooks.map(item =>
                    (<li className="flex-justify-center reading-list-item" key={item.id}>
                        <div>
                            <div>{item.title}{ item.publishedDate && <span className="small">, {dateFormat(item.publishedDate)}</span> }</div>
                            { item.hasOwnProperty('authors') && item.authors && item.authors.map((author, idx) => (
                                (<span key={idx} className="small">{author}</span>)
                            ))}
                        </div>
                        <button className="btn btn-remove-favorite" onClick={() => dispatch({type: 'REMOVE', payload: item.id})} type="button">
                            <span className="sr-only">Remove from reading list</span> &times;
                        </button>
                    </li>
                ))}
            </ul>) : (<p className="text-muted text-center" data-testid="reading-list-empty">Your reading list is empty.</p>)}
        </div>
    )
}

export default ReadingList;