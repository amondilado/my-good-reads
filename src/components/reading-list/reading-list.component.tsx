import React, {useContext} from "react";
import {ReadingListContext} from "../../contexts/reading-list/reading-list.context";
import "./reading-list.styles.scss";

const ReadingList: React.FC = () => {
    const { readingList, readingListCount, removeItem } = useContext(ReadingListContext);

    return (
        <div className="small reading-list-container">
            <h2 className="flex-justify-center">My reading list
                <span className="flex-center reading-list-count" data-testid="reading-list-count">{readingListCount}</span>
            </h2>

            {readingListCount ? (
                <ul className="reading-list-content" data-testid="reading-list">
                {readingList.map(item =>
                    (<li className="flex-justify-center reading-list-item" key={item.id}>
                        <div>
                            <div>{item.title}</div>
                            {item.hasOwnProperty('authors') && item.authors && item.authors.map((author, idx) => (
                                (<span key={idx} className="small">{author}</span>)
                            ))}
                        </div>
                        <button className="btn btn-remove-favorite" onClick={() => removeItem(item.id)} type="button">
                            <span className="sr-only">Remove from reading list</span> &times;
                        </button>
                    </li>
                ))}
            </ul>) : (<p className="text-muted text-center" data-testid="reading-list-empty">Your reading list is empty.</p>)}
        </div>
    )
}

export default ReadingList;