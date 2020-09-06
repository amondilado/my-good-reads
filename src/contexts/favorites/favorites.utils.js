export const addItemToFavorites = (favorites, favoriteToAdd) => {
    const existingCartItem = favorites.find(
        favorite => favorite.id === favoriteToAdd.id
    );

    if (existingCartItem) {
        return;
    }

    return [...favorites, favoriteToAdd];
};