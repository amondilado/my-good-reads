import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
// import assert from 'assert';

import {mockBookCardProps, mockReadingListItemAdd} from '../../testing-mockdata';
import {FavoritesContext} from '../../contexts/favorites/favorites.context';
import BookCard from './book-card';
import {FavoriteBookType} from '../../contexts/favorites/favorites.interface';

type ReadingListContextType = {
    favorites: FavoriteBookType[];
    favoritesCount: number;
    addItem: (item: FavoriteBookType) => FavoriteBookType | void;
    removeItem: (id: string) => FavoriteBookType | void;
    isFavorite: (id: string) => boolean;
};

const mockReadingListProvider = {
    favorites: [],
    favoritesCount: 0,
    addItem: () => {},
    removeItem: () => {},
    isFavorite: () => false
};

function renderBookCard(value: ReadingListContextType) {
    return render(
        <FavoritesContext.Provider value={value}>
            <BookCard {...mockBookCardProps} />
        </FavoritesContext.Provider>
    );
}

afterEach(cleanup);

test('renders BookCard with title', async () => {
    render(<BookCard {...mockBookCardProps} />);
    const articleEl = screen.queryByRole('article');
    expect(articleEl).toBeInTheDocument();

    const bookTitle = screen.getByText('The Lagos Consulate 1851 - 1861');
    expect(bookTitle).toBeInTheDocument();
});

test("renders button remove from reading list correctly", async() => {
    const mockReadingListProvider = {
        favorites: [],
        favoritesCount: 0,
        addItem: () => {},
        removeItem: () => {},
        isFavorite: () => true
    };
    renderBookCard(mockReadingListProvider);
    const buttonRemove = screen.getByRole('button');

    expect(buttonRemove).toBeInTheDocument();
    expect(buttonRemove).toHaveTextContent('Remove');
});

test("click on button add", async() => {
    const mockReadingListProvider = {
        favorites: [],
        favoritesCount: 0,
        addItem: () => {},
        removeItem: () => {},
        isFavorite: () => false
    };
    const isFavorite = jest.fn();
    renderBookCard(mockReadingListProvider);

    // render(<BookCard {...mockBookCardProps}/>);
    const buttonAdd = screen.getByRole('button');

    expect(buttonAdd).toBeInTheDocument();
    expect(buttonAdd).toHaveTextContent(/Add/i);

    fireEvent.mouseDown(buttonAdd, mockReadingListItemAdd);
    // assert((mockReadingListProvider.removeItem).calledOnce, 'Fn was called once');
    // await waitFor(() => screen.getByRole('button'));
    await screen.findByText(/Remove/i);
    // expect(isFavorite).toHaveBeenCalled();
    expect(screen.getByRole('button')).toHaveTextContent('Remove');
    // screen.debug();
});

test("renders button add to reading list correctly", async() => {
    const mockReadingListProvider = {
        favorites: [],
        favoritesCount: 0,
        addItem: () => {},
        removeItem: () => {},
        isFavorite: () => false
    };

    renderBookCard(mockReadingListProvider);
    const buttonAdd = screen.getByRole('button');

    expect(buttonAdd).toBeInTheDocument();
    expect(buttonAdd).toHaveTextContent('Add');
});