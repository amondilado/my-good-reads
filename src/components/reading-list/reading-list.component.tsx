import React, {useContext} from "react";
import {FavoritesContext} from "../../contexts/favorites/favorites.context";
import "./reading-list.styles.scss";

const FavoriteBooks: React.FC = () => {
    const { favorites, favoritesCount, removeItem } = useContext(FavoritesContext);

    return (
        <div className={"small reading-list-container" + (!favoritesCount ? " _isEmpty" : "")}>
            <h2 className="flex-justify-center">My reading list
                <span className="flex-center reading-list-count">{favoritesCount}</span>
            </h2>

            {favoritesCount ? (
                <ul className="reading-list-content">
                {favorites.map(item =>
                  (<li className="flex-justify-center reading-list-item" key={item.id}>{item.title} <button className="btn btn-remove-favorite" onClick={() => removeItem(item.id)}>
                      <span className="sr-only">Remove from reading list</span> &times;
                  </button></li>)
                )}
            </ul>) : (<p className="text-muted text-center">Your reading list is empty.</p>)}
        </div>
    )
}

export default FavoriteBooks;