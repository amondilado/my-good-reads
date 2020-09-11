export const addItemToFavorites = (favorites, favoriteToAdd) => {
    const existingCartItem = isItemInFavorites(favorites, favoriteToAdd.id);

    if (existingCartItem) {
        return favorites;
    }

    return [...favorites, favoriteToAdd];
};

export const isItemInFavorites = (favorites, id) => {
    return favorites.find(favorite => favorite.id === id);
};
export const removeItemFromFavorites = (favorites, id) => {
    return favorites.filter(favorite => favorite.id !== id);
};