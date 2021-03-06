import React from 'react';
import './styles/App.scss';
import BookSearch from './components/book-search/BookSearch';
import ReadingList from './components/reading-list/reading-list.component';

function App() {
    return (
        <div>
            <header className="header">
                <div className="header--content">
                    <h1>My Good Reads</h1>
                </div>
            </header>
            <main className="main-content">
                <BookSearch />
                <div className="sidebar">
                    <ReadingList />
                </div>
            </main>
            <footer className="text-center small text-muted footer">My good reads - Made with &hearts; by Marina Kampisiou</footer>
        </div>
    );
}

export default App;
