import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import {mockBookCardProps, mockReadingListItem} from '../../testing-mockdata';
import {ReadingListContext} from '../../contexts/reading-list/reading-list.context';
import BookCard from './book-card';
import {ReadingListItemType} from '../../contexts/reading-list/reading-list.interface';

type ReadingListContextType = {
    readingList: ReadingListItemType[];
    readingListCount: number;
    addItem: jest.Mock<any, any>;
    removeItem: jest.Mock<any, any>;
    isRead: (id: string) => boolean;
};

const mockAddItem = jest.fn((mockReadingListItem: ReadingListItemType) => {});
const mockRemoveItem = jest.fn((id: string) => {});

const initialState = {
    readingList: [],
    readingListCount: 0,
    addItem: mockAddItem,
    removeItem: mockRemoveItem,
    isRead: () => false
};

function renderBookCard(value: ReadingListContextType) {
    return render(
        <ReadingListContext.Provider value={value}>
            <BookCard {...mockBookCardProps} />
        </ReadingListContext.Provider>
    );
}

afterEach(cleanup);

describe('BookCard', () => {
    test('renders BookCard with title', async () => {
        render(<BookCard {...mockBookCardProps} />);
        const articleEl = screen.queryByRole('article');
        expect(articleEl).toBeInTheDocument();

        const bookTitle = screen.getByText(/The Lagos Consulate 1851 - 1861/i);
        expect(bookTitle).toBeInTheDocument();
    });

    test("remove from reading list button rendering and click event", async() => {
        const mockReadingListProvider = {
            readingList: [],
            readingListCount: 0,
            addItem: mockAddItem,
            removeItem: mockRemoveItem,
            isRead: () => true
        };
        renderBookCard(mockReadingListProvider);
        const buttonRemove = screen.getByRole('button');

        expect(buttonRemove).toBeInTheDocument();
        expect(buttonRemove).toHaveTextContent(/Remove/i);
        fireEvent.click(buttonRemove);
        expect(mockReadingListProvider.removeItem).toHaveBeenCalledTimes(1);
        expect(mockReadingListProvider.removeItem).toHaveBeenCalledWith('fq_oDwAAQBAJ');
    });

    test("add to reading list button rendering and click event", async() => {
        renderBookCard(initialState);
        const buttonAdd = screen.getByRole('button');

        expect(buttonAdd).toBeInTheDocument();
        expect(buttonAdd).toHaveTextContent(/Add/i);

        fireEvent.click(buttonAdd);
        expect(initialState.addItem).toHaveBeenCalledTimes(1);
        expect(initialState.addItem).toHaveBeenCalledWith(mockReadingListItem);
    });
})