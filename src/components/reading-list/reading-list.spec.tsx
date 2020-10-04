import React from 'react';
import {render, screen, fireEvent, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import ReadingList from './reading-list.component';
import {mockBookResults, mockBookContext_initialState, mockBookContext_withData, renderWithContext} from '../../__mockData__';

const node = <ReadingList />;

describe('ReadingList',  () => {

    afterEach(cleanup);

    test('renders an empty list',async () => {
        renderWithContext(node, mockBookContext_initialState);

        expect(screen.getByTestId('reading-list-count')).toHaveTextContent('0');

        const listEl = screen.queryByTestId('[data-testid="reading-list"]');
        expect(listEl).not.toBeInTheDocument();
    });

    test('renders a list with one item, and REMOVE action is dispatched', async () => {
        renderWithContext(node, mockBookContext_withData);
        expect(screen.getByTestId('reading-list-count')).toHaveTextContent('1');
        expect(screen.getByTestId('reading-list')).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button'));

        expect(mockBookContext_withData.dispatch).toHaveBeenCalledTimes(1);
        expect(mockBookContext_withData.dispatch).toHaveBeenCalledWith({type: 'REMOVE', payload: mockBookResults[1].id});
    });
})
