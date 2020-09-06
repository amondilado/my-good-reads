import React, { useEffect, useState, useContext} from "react";
import { getBooksByType } from "./book-search.service";
import {AppContext} from '../../contexts/context';

const BookSearch = () => {
    const { state, dispatch } = useContext(AppContext);
    const [bookType, updateBookType] = useState("");
    const [bookTypeToSearch, updateBookTypeToSearch] = useState("");

    async function requestBooks() {
        if (bookTypeToSearch) {
            // dispatch({ type: 'request' });
            const allBooks = await getBooksByType(bookTypeToSearch);
            dispatch({ type: 'SET_BOOKS', payload: allBooks.items});
        }
    }

    useEffect(() => {
        async function getAllBooks() {
            await requestBooks();
        }
        getAllBooks();
    }, [bookTypeToSearch]);

    return (
            <>
                <div className="book--container">
                    <div className="search-params">
                        <div>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    updateBookTypeToSearch(bookType)
                                }}
                            >
                                <input
                                    className="full-width"
                                    autoFocus
                                    name="gsearch"
                                    type="search"
                                    value={bookType}
                                    placeholder="Search for books to add to your reading list and press Enter"
                                    onChange={e => updateBookType(e.target.value)}
                                />
                            </form>
                            {!bookType ? (
                                <div className="empty">
                                    <p>
                                        Try searching for a topic, for example
                                        <button className="btn btn-ghost">"Javascript"</button>
                                    </p>
                                </div>
                              ) : (
                                    <p>items fount: {state.items.length}</p>
                                )
                            }
                        </div>
                    </div>
                </div>
            </>
    );
};

export default BookSearch;
