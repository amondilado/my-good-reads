import React, {ReactNode} from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import BookList from './book-list';

import {mockBookContext_initialState, mockBookContext_fetchingData, mockBookContext_withData, renderWithContext} from '../../__mockData__';

const node = <BookList />;

describe('BookList',  () => {
    afterEach(cleanup);

    test('renders "no results" message on empty state', async () => {
        renderWithContext(node, mockBookContext_initialState);
        const element = screen.getByTestId('book-list-empty');
        expect(element).toBeInTheDocument();
        expect(screen.getByText(/^No results found/i)).toBeInTheDocument();
    });
    test('renders "fetching" message while data is being fetched', async () => {
        renderWithContext(node, mockBookContext_fetchingData);
        const element = screen.queryByTestId('book-list-empty');
        expect(element).not.toBeInTheDocument();
        expect(screen.getByText(/^fetching/i)).toBeInTheDocument();
    });
    test('renders book list', async () => {
        renderWithContext(node, mockBookContext_withData);
        const notFoundEl = screen.queryByTestId('book-list-empty');
        const mockBooks = mockBookContext_withData.state.books;

        expect(notFoundEl).not.toBeInTheDocument();
        expect(screen.queryByText(/^No results found/i)).not.toBeInTheDocument();
        expect(screen.getByText(/Search results/i)).toBeInTheDocument();
        expect(screen.queryByText(mockBooks[0].title)).toBeInTheDocument();
        expect(screen.queryByText(mockBooks[1].title)).toBeInTheDocument();
    });

});