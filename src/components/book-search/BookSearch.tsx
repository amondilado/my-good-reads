import React, {useEffect, useState} from "react";
import {getBooksByType} from "./book-search.service";
import {BookType} from '../book-card/book-card.interface';
import BookCard from '../book-card/book-card';
import {debounce} from '../../shared/fetchUrl/fetchUrl';

const BookSearch: React.FC = () => {
    const [searchResults, updateSearchResults] = useState<BookType[]>([]);
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
                                    placeholder="Search for books to add to your reading list and press Enter"
                                    onChange={e => {
                                        updateBookType(e.target.value);
                                        updateBookTypeToSearch(e.target.value);
                                    }}
                                />
                            </form>

                            {!bookType ? (
                                <div className="text-center text-muted empty">
                                    <p>
                                        Try searching for a topic, for example
                                        <button className="btn btn-ghost" onClick={() => {
                                            updateBookType("Javascript");
                                            updateBookTypeToSearch("Javascript");
                                        }}>
                                            "Javascript"
                                        </button>
                                    </p>
                                </div>
                              )
                              : searchResults.map(book =>
                                    (<BookCard key={book.id} id={book.id} volumeInfo={book.volumeInfo}/>)
                                )
                            }
                        </div>
                    </div>
                </div>
            </>
    );
};

export default BookSearch;
