// Sample data for mocking tests
import {BooksContext, INITIAL_STATE} from "./contexts/books.context";
import React, {ReactNode} from "react";
import {render} from "@testing-library/react";

export const mockBookResults = [{
    "id": "UAYvDwAAQBAJ",
    "title": "Eloquent JavaScript",
    "authors": [
        "Marijn Haverbeke"
    ],
    "publisher": "No Starch Press",
    "publishedDate": "2011-01-15T00:00:00.000Z",
    "coverUrl": "http://books.google.com/books/content?id=UAYvDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "description": "Eloquent JavaScript dives into this flourishing language and teaches you to write code that&#39;s beautiful and effective.",
    "isRead": false
}, {
    "id": "2weL0iAfrEMC",
    "title": "JavaScript: The Definitive Guide",
    "authors": [
        "David Flanagan"
    ],
    "publisher": "\"O'Reilly Media, Inc.\"",
    "publishedDate": "2006-08-17T00:00:00.000Z",
    "coverUrl": "http://books.google.com/books/content?id=2weL0iAfrEMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "description": "For example, to match the word “<b>JavaScript</b>” on a line by itself, you can use the <br>\nregular expression /^<b>JavaScript</b>$/. If you want to search for “Java” used as a word <br>\nby itself (not as a prefix, as it is in “<b>JavaScript</b>”), you can try the pattern /\\sJava\\s/,&nbsp;...",
    "isRead": true
}];

export const mockBookContext_initialState = {
    state: INITIAL_STATE,
    dispatch: jest.fn(),
};

export const mockBookContext_fetchingData = {
    state: {
        fetching: true,
        books: [],
        readBooks: [],
        count: 0
    },
    dispatch: jest.fn(),
};

export const mockBookContext_withData = {
    state: {
        fetching: false,
        books: mockBookResults,
        readBooks: [mockBookResults[1]],
        count: 1
    },
    dispatch: jest.fn(),
};

export const renderWithContext = function(node: ReactNode, mockContext: any) {
    return render(
        <BooksContext.Provider value={mockContext}>
            {node}
        </BooksContext.Provider>
    )
};