import React, {createContext, useState, useEffect} from 'react';
import {addItemToFavorites, isItemInFavorites, removeItemFromFavorites} from './favorites.utils';
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
    favoritesCount: number;
    addItem: (item: FavoriteBookType) => FavoriteBookType | void;
    removeItem: (id: string) => FavoriteBookType | void;
    isFavorite: (id: string) => boolean;
}>({
    favorites: [],
    favoritesCount: 0,
    addItem: () => {},
    removeItem: () => {},
    isFavorite: () => false
});

const FavoritesProvider: React.FC = ({children}) => {
    const [favorites, setFavorites] = useState<FavoriteBookType[]>([]);
    const [favoritesCount, setFavoritesCount] = useState(0);

    const addItem = (item: FavoriteBookType) => {
        setFavorites(addItemToFavorites(favorites, item) || favorites);
    };
    const isFavorite = (id: string) => {
        return isItemInFavorites(favorites, id);
    };
    const removeItem = (id: string) => setFavorites(removeItemFromFavorites(favorites, id) || favorites);

    useEffect(() => {
        setFavoritesCount(favorites.length);
    }, [favorites]);

    return (
        <FavoritesContext.Provider value={{
            favorites,
            favoritesCount,
            addItem,
            isFavorite,
            removeItem,
        }}>
            {children}
        </FavoritesContext.Provider>
    )
};

export default FavoritesProvider;