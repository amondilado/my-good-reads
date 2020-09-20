import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import ReadingList from './reading-list.component';
import {ReadingListContext} from '../../contexts/reading-list/reading-list.context';
import {ReadingListItemType} from '../../contexts/reading-list/reading-list.interface';
import {mockReadingListItem} from '../../testing-mockdata';

type ReadingListContextType = {
    readingList: ReadingListItemType[];
    readingListCount: number;
    addItem: (item: ReadingListItemType) => ReadingListItemType | void;
    removeItem: jest.Mock<any, any>;
    isRead: (id: string) => boolean;
};

const mockRemoveItem = jest.fn((id: string) => {});

const initialState = {
    readingList: [],
    readingListCount: 0,
    addItem: () => {},
    removeItem: mockRemoveItem,
    isRead: () => false
};

function renderReadingList(value: ReadingListContextType) {
    return render(
        <ReadingListContext.Provider value={value}>
            <ReadingList />
        </ReadingListContext.Provider>
    );
}

afterEach(cleanup);
describe('ReadingList', () => {
    test('renders an empty list correctly', async () => {
        render(<ReadingList />);
        expect(screen.getByTestId('reading-list-empty')).toBeInTheDocument();
        expect(screen.getByTestId('reading-list-count')).toHaveTextContent('0');
        expect(screen.queryByTestId('reading-list')).not.toBeInTheDocument();
    });

    test('renders reading list correctly', async () => {
        const mockReadingListProvider = {
            readingList: [mockReadingListItem],
            readingListCount: 1,
            addItem: () => {},
            removeItem: mockRemoveItem,
            isRead: () => false
        };
        renderReadingList(mockReadingListProvider);

        expect(screen.queryByTestId('reading-list-empty')).not.toBeInTheDocument();
        expect(screen.queryByTestId('reading-list')).toBeInTheDocument();
        expect(screen.getByTestId('reading-list-count')).toHaveTextContent('1');

        // test remove handler
        const buttonRemove = screen.getByRole('button');
        expect(buttonRemove).toBeInTheDocument();
    });
})