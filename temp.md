 // TODO
import React, {createContext, useReducer} from "react";

interface AppContextType {
    books: Array<object>,
        favorites: Array<object>,
        favoritesCount: number
}

interface Favorite {
    id: string,
        title: string,
        authors: Array<string>,
        publishedDate: string
}

const initialState = {
    books: [],
    favorites: [],
    favoritesCount: 0
};

const AppContext = createContext<AppContextType | undefined>(initialState);

const reducer = (state: AppContextType, action: Actions) => {
    switch (action.type) {
        case "UPDATE_BOOK_RESULTS":
            return {
                books: [...state.books, action.payload],
            };
        case "ADD_FAVORITE":
            return {
                favorites: state.books.filter(book => book.id !== action.payload),
            };
        case "REMOVE_FAVORITE":
            return {
                favorites: state.books.filter(book => book.id !== action.payload),
            };
        default:
            throw new Error();
    }
};
// Create a provider for components to consume and subscribe to changes
type Props = {
    children: React.ReactNode;
}
export const AppContextProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <AppContext.Provider value={[state, dispatch]}>{children}</AppContext.Provider>;
};