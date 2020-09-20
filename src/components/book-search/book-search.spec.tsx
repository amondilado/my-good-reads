import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import BookSearch from './BookSearch';

describe('BookSearch', () => {
    test('renders initial state correctly', () => {
        render(<BookSearch />);
        const inputNode = screen.getByTestId('book-search-input');
        expect(inputNode.nodeValue).toBeNull();
        expect(screen.getByText(/Javascript/i)).toBeInTheDocument();
    });

    test('renders BookList on some input', async() => {
        render(<BookSearch />);
        const inputNode = screen.getByTestId('book-search-input');

        expect(screen.getByTestId('book-search-empty')).toBeInTheDocument();

        fireEvent.change(inputNode, {target: { value: 'Javascript' }});

        expect(screen.queryByTestId('book-search-empty')).not.toBeInTheDocument();
        expect(screen.queryByText('Search results')).toBeInTheDocument();
    })

    test('doesn\'t render BookList on empty input', async() => {
        render(<BookSearch />);
        const inputNode = screen.getByTestId('book-search-input');

        expect(screen.getByTestId('book-search-empty')).toBeInTheDocument();

        // Test on some value
        fireEvent.change(inputNode, {target: { value: 'Javascript' }});

        expect(screen.queryByTestId('book-search-empty')).not.toBeInTheDocument();
        expect(screen.queryByText('Search results')).toBeInTheDocument();

        // Test on empty value
        fireEvent.change(inputNode, {target: { value: '' }});

        expect(screen.queryByTestId('book-search-empty')).toBeTruthy();
        expect(screen.queryByText('Search results')).toBeFalsy();
    })
})