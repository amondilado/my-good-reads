import React from 'react';
import {render, screen, fireEvent, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import {IBook} from '../../types';
import BookCard from './book-card';
import {BooksContext} from '../../contexts/books.context';
import {mockBookResults, mockBookContext_initialState} from '../../__mockData__';

describe('BookCard',  () => {
    function renderComponentWithProps(props: IBook) {
        return render(
            <BooksContext.Provider value={mockBookContext_initialState}>
                <BookCard data={props} />
            </BooksContext.Provider>
        );
    }

    afterEach(cleanup);

    test('renders with title and Add button',async () => {
        renderComponentWithProps(mockBookResults[0]);
        const el = screen.queryByRole('article');
        expect(el).toBeInTheDocument();

        const btn = screen.queryByRole('button');
        expect(btn).toBeInTheDocument();
        expect(btn).toHaveTextContent(/Add/i);
    });

    test('ADD action dispatch', async () => {
        renderComponentWithProps(mockBookResults[0]);
        const btn = screen.getByRole('button');
        expect(btn).toBeInTheDocument();
        expect(btn).toHaveTextContent(/Add/i);

        fireEvent.click(btn);

        expect(mockBookContext_initialState.dispatch).toHaveBeenCalledTimes(1);
        expect(mockBookContext_initialState.dispatch).toHaveBeenCalledWith({type: 'ADD', payload: mockBookResults[0]});
    });

    test('REMOVE action dispatch', async () => {
        renderComponentWithProps(mockBookResults[1]);
        const btn = screen.getByRole('button');
        expect(btn).toBeInTheDocument();
        expect(btn).toHaveTextContent(/Remove/i);

        fireEvent.click(btn);

        expect(mockBookContext_initialState.dispatch).toHaveBeenCalledTimes(2);
        expect(mockBookContext_initialState.dispatch).toHaveBeenCalledWith({type: 'REMOVE', payload: mockBookResults[1].id});
    });
})
