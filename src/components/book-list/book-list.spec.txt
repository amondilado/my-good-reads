import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import BookList from './book-list';
import {mockBookResults, mockBookResults_empty} from '../../testing-mockdata';

test('renders BookList', async () => {
    render(<BookList bookResults={mockBookResults} />);
    const notFoundEl = screen.queryByTestId('book-list-empty');
    expect(notFoundEl).not.toBeInTheDocument();

    const bookTitle = screen.getByText('The Lagos Consulate 1851 - 1861');
    expect(bookTitle).toBeInTheDocument();
});
test('renders BookList empty state', async () => {
    render(<BookList bookResults={mockBookResults_empty} />);
    const element = screen.getByTestId('book-list-empty');
    expect(element).toBeInTheDocument();
});