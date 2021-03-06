import React, {useEffect, useState} from "react";
import {getBooksByType} from "./book-search.service";
import {BookCardType} from '../book-card/book-card.interface';
import {debounce} from '../../shared/fetchUrl/fetchUrl';
import BookList from '../book-list/book-list';

const BookSearch: React.FC = () => {
    const [searchResults, updateSearchResults] = useState<BookCardType[]>([]);
    const [bookType, updateBookType] = useState<string>("");
    const [bookTypeToSearch, updateBookTypeToSearch] = useState("");

    async function requestBooks() {
        if (bookTypeToSearch) {
            const allBooks = await getBooksByType(bookTypeToSearch);
            if(typeof allBooks !== 'undefined' && allBooks.hasOwnProperty('items')) {
                updateSearchResults(allBooks.items);
            }
        }
    }

    useEffect(() => {
        async function getAllBooks() {
            await requestBooks();
        }
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
                              : (<BookList bookResults={searchResults} />)
                            }
                        </div>
                    </div>
                </div>
            </>
    );
};

export default BookSearch;
