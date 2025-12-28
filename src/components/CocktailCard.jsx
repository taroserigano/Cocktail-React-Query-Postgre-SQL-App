import { useState, memo } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/CocktailCard";

const CocktailCard = ({
  image,
  name,
  id,
  info,
  glass,
  source,
  isFavorite: initialIsFavorite,
}) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

  // Route to different pages based on source (API vs DB)
  const detailPath =
    source === "db" ? `/my-cocktails/${id}` : `/cocktail/${id}`;

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const favorites = JSON.parse(
      localStorage.getItem("favoriteCocktails") || "[]"
    );
    let newFavorites;

    if (favorites.includes(id)) {
      newFavorites = favorites.filter((favId) => favId !== id);
    } else {
      newFavorites = [...favorites, id];
    }

    localStorage.setItem("favoriteCocktails", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <Wrapper>
      <Link to={detailPath} className="img-container">
        <img src={image} alt={name} className="img" loading="lazy" />
        <button
          className={`favorite-btn ${isFavorite ? "active" : ""}`}
          onClick={toggleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill={isFavorite ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </button>
      </Link>
      <div className="footer">
        <h4>{name}</h4>
        <h5>{glass}</h5>
        <p>{info}</p>
        <Link to={detailPath} className="btn">
          details
        </Link>
      </div>
    </Wrapper>
  );
};
export default memo(CocktailCard);
