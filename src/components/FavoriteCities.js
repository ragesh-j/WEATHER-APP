import React from 'react';

const FavoriteCities = ({ favorites, onRemove, onSelect }) => {
  return (
    <div className="favorite-cities">
      <h3>Favorite Cities</h3>
      <ul>
        {favorites.map((fav) => (
          <li key={fav.id}>
            {fav.city}
            <button onClick={() => onSelect(fav.city)}>Show Weather</button>
            <button onClick={() => onRemove(fav.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteCities;