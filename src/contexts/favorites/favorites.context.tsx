import React, {createContext, useState, useEffect, Dispatch} from 'react';
import { addItemToFavorites } from './favorites.utils';
import {FavoriteBookType} from './favorites.interface';

// const FavoritesContext = createContext({
//     favorites: [],
//     // favoritesCount: 0,
//     addItem: () => {},
//     // removeItem: () => {},
//     // isFavorite: () => {}
// });

export const FavoritesContext = createContext<{
    favorites: FavoriteBookType[];
    addItem: (item: FavoriteBookType) => FavoriteBookType | void;
}>({
    favorites: [],
    addItem: () => {},
});

const FavoritesProvider: React.FC = ({children}) => {
    const [favorites, setFavorites] = useState<FavoriteBookType[]>([]);
    // const [favoritesCount, setFavoritesCount] = useState(0);

    const addItem = (item: FavoriteBookType) => {
        // setFavorites(addItemToFavorites(favorites, item));
        console.log('to addItem', item);
        setFavorites([...favorites, item]);
    };
    // const removeItem = item => setFavorites(removeItemFromCart(favorites, item));

    // useEffect(() => {
    //     setFavoritesCount(getCartItemsCount(favorites));
    // }, [favorites]);

    return (
        <FavoritesContext.Provider value={{
            favorites,
            // favoritesCount,
            addItem,
            // removeItem,
            // isFavorite
        }}>
            {children}
        </FavoritesContext.Provider>
    )
};

export default FavoritesProvider;