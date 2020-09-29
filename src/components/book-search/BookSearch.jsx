import React, {useEffect, useState, useContext} from "react";
import {getBooksByType} from "./book-search.service";
import {debounce} from '../../shared/fetchUrl/fetchUrl';
import BookList from '../book-list/book-list';
import {BooksContext} from '../../contexts/books.context';

const BookSearch = () => {
    const { dispatch } = useContext(BooksContext);
    const [bookType, updateBookType] = useState("");
    const [bookTypeToSearch, updateBookTypeToSearch] = useState("");

    async function requestBooks() {
        if (bookTypeToSearch) {
            const searchRes = await getBooksByType(bookTypeToSearch);
            console.log('searchRes', searchRes);
            dispatch({ type: "BOOKS_FETCHED", payload: searchRes });
        }
    }

    useEffect(() => {
        async function getAllBooks() {
            await requestBooks();
        }
        dispatch({ type: "BOOKS_FETCHING" });
        debounce(getAllBooks, 500)();
    }, [bookTypeToSearch]);

    // Update bookTypeToSearch when bookType is update
    useEffect(() => {
        updateBookTypeToSearch(bookType);
    }, [bookType]);

    return (
            <>
                <div className="book--container">
                    <div className="full-width search-params">
                        <div>
                            <form autoComplete="off">
                                <input
                                    className="full-width"
                                    autoFocus
                                    name="gsearch"
                                    type="search"
                                    value={bookType}
                                    placeholder="Search for books to add to your reading list..."
                                    onChange={e => {
                                        updateBookType(e.target.value);
                                    }}
                                    data-testid="book-search-input"
                                />
                            </form>

                            {!bookType ? (
                                <div className="text-center text-muted empty" data-testid="book-search-empty">
                                    <p>
                                        Try searching for a topic, for example
                                        <button className="btn btn-ghost" onClick={() => {
                                            updateBookType("Javascript");
                                        }}>
                                            "Javascript"
                                        </button>
                                    </p>
                                </div>
                              )
                              : (<BookList />)
                            }
                        </div>
                    </div>
                </div>
            </>
    );
};

export default BookSearch;
