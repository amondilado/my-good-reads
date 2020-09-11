import React, {useContext} from "react";
import {FavoritesContext} from "../../contexts/favorites/favorites.context";
import "./reading-list.styles.scss";

const FavoriteBooks: React.FC = () => {
    const { favorites, favoritesCount, removeItem } = useContext(FavoritesContext);

    return (
        <div className="reading-list-container">
            <h2>My reading list {favoritesCount}</h2>
            {favorites.map(item =>
              (<div className="reading-list-item">{item.title} <button className="btn btn-remove-favorite" onClick={() => removeItem(item.id)}>Remove</button></div>)
            )}
        </div>
    )
}

export default FavoriteBooks;