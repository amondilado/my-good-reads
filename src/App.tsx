import React from 'react';
import './styles/App.scss';
import BookSearch from './components/book-search/BookSearch';
import BookList from './components/book-list/book-list';
import {AppProvider} from './contexts/context';

function App() {
    return (
        <AppProvider>
            <div>
                <header className="header">
                    <div className="header--content">
                        <h1>My Good Reads</h1>
                    </div>
                </header>
                <main>
                    <BookSearch />
                    <BookList />
                </main>
                <aside className="aside-container">
                    {/* Wishlist preview*/}
                    {/* Wishlist */}
                </aside>
            </div>
        </AppProvider>
    );
}

export default App;
