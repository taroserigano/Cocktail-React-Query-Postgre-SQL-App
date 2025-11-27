import { useState } from 'react';
import styled from 'styled-components';

const FilterBar = ({ onFilterChange }) => {
  const [activeFilters, setActiveFilters] = useState({
    alcoholic: 'all',
    category: 'all',
    favorites: false,
  });

  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      ...activeFilters,
      [filterType]: value,
    };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <Wrapper>
      <div className="filter-group">
        <label>Type:</label>
        <div className="filter-pills">
          <button
            className={`filter-pill ${activeFilters.alcoholic === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('alcoholic', 'all')}
          >
            All
          </button>
          <button
            className={`filter-pill ${activeFilters.alcoholic === 'Alcoholic' ? 'active' : ''}`}
            onClick={() => handleFilterChange('alcoholic', 'Alcoholic')}
          >
            🍸 Alcoholic
          </button>
          <button
            className={`filter-pill ${activeFilters.alcoholic === 'Non alcoholic' ? 'active' : ''}`}
            onClick={() => handleFilterChange('alcoholic', 'Non alcoholic')}
          >
            🥤 Non-Alcoholic
          </button>
        </div>
      </div>

      <div className="filter-group">
        <label>Show:</label>
        <div className="filter-pills">
          <button
            className={`filter-pill ${activeFilters.favorites ? 'active' : ''}`}
            onClick={() => handleFilterChange('favorites', !activeFilters.favorites)}
          >
            ❤️ Favorites
          </button>
        </div>
      </div>

      <div className="filter-group">
        <label>Category:</label>
        <div className="filter-pills">
          <button
            className={`filter-pill ${activeFilters.category === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('category', 'all')}
          >
            All
          </button>
          <button
            className={`filter-pill ${activeFilters.category === 'Cocktail' ? 'active' : ''}`}
            onClick={() => handleFilterChange('category', 'Cocktail')}
          >
            Cocktail
          </button>
          <button
            className={`filter-pill ${activeFilters.category === 'Ordinary Drink' ? 'active' : ''}`}
            onClick={() => handleFilterChange('category', 'Ordinary Drink')}
          >
            Ordinary
          </button>
          <button
            className={`filter-pill ${activeFilters.category === 'Shot' ? 'active' : ''}`}
            onClick={() => handleFilterChange('category', 'Shot')}
          >
            Shot
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
  
  .filter-group {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  label {
    font-family: 'Orbitron', sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--grey-400);
    margin: 0;
    white-space: nowrap;
  }
  
  .filter-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  
  .filter-pill {
    padding: 0.625rem 1.25rem;
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid rgba(168, 85, 247, 0.2);
    border-radius: var(--borderRadius);
    color: var(--grey-300);
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Space Grotesk', sans-serif;
  }
  
  .filter-pill:hover {
    border-color: rgba(168, 85, 247, 0.5);
    background: rgba(168, 85, 247, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
  }
  
  .filter-pill.active {
    background: linear-gradient(135deg, var(--primary-600) 0%, var(--accent-600) 100%);
    border-color: rgba(168, 85, 247, 0.6);
    color: var(--white);
    box-shadow: 0 0 30px rgba(168, 85, 247, 0.6);
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    
    .filter-pills {
      gap: 0.5rem;
    }
    
    .filter-pill {
      padding: 0.5rem 1rem;
      font-size: 0.8rem;
    }
  }
`;

export default FilterBar;
