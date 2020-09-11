import React, { useEffect, useState, useContext, Dispatch} from "react";
import { getBooksByType } from "./book-search.service";
import {BookType} from '../book-card/book-card.interface';
import BookCard from '../book-card/book-card';

// interface DispatchProps {
//     booksSetter: Dispatch<BookType[]>
// }
// const BookSearch: React.FC<DispatchProps> = ({booksSetter}) => {
const BookSearch: React.FC = () => {
    const [searchResults, updateSearchResults] = useState<BookType[]>([]);
    const [bookType, updateBookType] = useState<string>("");
    const [bookTypeToSearch, updateBookTypeToSearch] = useState("");

    async function requestBooks() {
        if (bookTypeToSearch) {
            // dispatch({ type: 'request' });
            const allBooks = await getBooksByType(bookTypeToSearch);
            // dispatch({ type: 'SET_BOOKS', payload: allBooks.items});
            // await booksSetter(allBooks.items);
            updateSearchResults(allBooks.items);
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
                                    updateBookTypeToSearch(bookType);
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
                                <div className="text-center text-muted empty">
                                    <p>
                                        Try searching for a topic, for example
                                        <button className="btn btn-ghost" onClick={() => {updateBookType("Javascript")}}>
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
