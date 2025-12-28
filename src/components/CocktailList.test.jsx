import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CocktailList from './CocktailList';

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('CocktailList', () => {
  const mockFavorites = new Set(['11007', '11008']);

  describe('Empty State', () => {
    it('renders empty message when no drinks provided', () => {
      renderWithRouter(<CocktailList drinks={[]} favorites={mockFavorites} />);
      expect(screen.getByText('No matching cocktails found...')).toBeInTheDocument();
    });

    it('renders empty message when drinks is null', () => {
      renderWithRouter(<CocktailList drinks={null} favorites={mockFavorites} />);
      expect(screen.getByText('No matching cocktails found...')).toBeInTheDocument();
    });

    it('renders empty message when drinks is not an array', () => {
      renderWithRouter(<CocktailList drinks={undefined} favorites={mockFavorites} />);
      expect(screen.getByText('No matching cocktails found...')).toBeInTheDocument();
    });
  });

  describe('API Cocktails Formatting', () => {
    const apiCocktails = [
      {
        idDrink: '11007',
        strDrink: 'Margarita',
        strDrinkThumb: 'https://example.com/margarita.jpg',
        strAlcoholic: 'Alcoholic',
        strGlass: 'Cocktail glass',
      },
      {
        idDrink: '11008',
        strDrink: 'Mojito',
        strDrinkThumb: 'https://example.com/mojito.jpg',
        strAlcoholic: 'Alcoholic',
        strGlass: 'Highball glass',
      },
    ];

    it('renders API cocktails correctly', () => {
      renderWithRouter(<CocktailList drinks={apiCocktails} favorites={mockFavorites} />);
      
      expect(screen.getByText('Margarita')).toBeInTheDocument();
      expect(screen.getByText('Mojito')).toBeInTheDocument();
      expect(screen.getByText('Cocktail glass')).toBeInTheDocument();
      expect(screen.getByText('Highball glass')).toBeInTheDocument();
    });

    it('formats API cocktails with correct source property', () => {
      renderWithRouter(<CocktailList drinks={apiCocktails} favorites={mockFavorites} />);
      
      // Check that links point to API routes
      const links = screen.getAllByRole('link');
      const apiLinks = links.filter(link => link.getAttribute('href')?.includes('/cocktail/'));
      expect(apiLinks.length).toBeGreaterThan(0);
    });
  });

  describe('Database Cocktails Formatting', () => {
    const dbCocktails = [
      {
        id: '1',
        name: 'Custom Margarita',
        image: 'https://example.com/custom-margarita.jpg',
        info: 'Alcoholic',
        glass: 'Martini glass',
      },
      {
        id: '2',
        name: 'Custom Mojito',
        image: 'https://example.com/custom-mojito.jpg',
        info: 'Alcoholic',
        glass: 'Collins glass',
      },
    ];

    it('renders DB cocktails correctly', () => {
      renderWithRouter(<CocktailList drinks={dbCocktails} favorites={new Set(['1'])} />);
      
      expect(screen.getByText('Custom Margarita')).toBeInTheDocument();
      expect(screen.getByText('Custom Mojito')).toBeInTheDocument();
      expect(screen.getByText('Martini glass')).toBeInTheDocument();
      expect(screen.getByText('Collins glass')).toBeInTheDocument();
    });

    it('formats DB cocktails with correct source property', () => {
      renderWithRouter(<CocktailList drinks={dbCocktails} favorites={new Set()} />);
      
      // Check that links point to DB routes
      const links = screen.getAllByRole('link');
      const dbLinks = links.filter(link => link.getAttribute('href')?.includes('/my-cocktails/'));
      expect(dbLinks.length).toBeGreaterThan(0);
    });
  });

  describe('Mixed Cocktails', () => {
    const mixedCocktails = [
      {
        idDrink: '11007',
        strDrink: 'API Margarita',
        strDrinkThumb: 'https://example.com/api-margarita.jpg',
        strAlcoholic: 'Alcoholic',
        strGlass: 'Cocktail glass',
      },
      {
        id: '1',
        name: 'DB Margarita',
        image: 'https://example.com/db-margarita.jpg',
        info: 'Alcoholic',
        glass: 'Martini glass',
      },
    ];

    it('renders both API and DB cocktails together', () => {
      renderWithRouter(<CocktailList drinks={mixedCocktails} favorites={mockFavorites} />);
      
      expect(screen.getByText('API Margarita')).toBeInTheDocument();
      expect(screen.getByText('DB Margarita')).toBeInTheDocument();
    });

    it('applies correct routing for each cocktail type', () => {
      renderWithRouter(<CocktailList drinks={mixedCocktails} favorites={mockFavorites} />);
      
      const links = screen.getAllByRole('link');
      const apiLinks = links.filter(link => link.getAttribute('href')?.includes('/cocktail/'));
      const dbLinks = links.filter(link => link.getAttribute('href')?.includes('/my-cocktails/'));
      
      expect(apiLinks.length).toBeGreaterThan(0);
      expect(dbLinks.length).toBeGreaterThan(0);
    });
  });

  describe('Favorites Handling', () => {
    const cocktails = [
      {
        idDrink: '11007',
        strDrink: 'Favorite Drink',
        strDrinkThumb: 'https://example.com/fav.jpg',
        strAlcoholic: 'Alcoholic',
        strGlass: 'Cocktail glass',
      },
      {
        idDrink: '11009',
        strDrink: 'Non-Favorite Drink',
        strDrinkThumb: 'https://example.com/nonfav.jpg',
        strAlcoholic: 'Alcoholic',
        strGlass: 'Highball glass',
      },
    ];

    it('passes favorite status correctly to cards', () => {
      const favorites = new Set(['11007']);
      renderWithRouter(<CocktailList drinks={cocktails} favorites={favorites} />);
      
      // Both cocktails should render
      expect(screen.getByText('Favorite Drink')).toBeInTheDocument();
      expect(screen.getByText('Non-Favorite Drink')).toBeInTheDocument();
      
      // Check favorite buttons exist
      const favoriteButtons = screen.getAllByRole('button');
      expect(favoriteButtons.length).toBeGreaterThan(0);
    });
  });

  describe('useMemo Optimization', () => {
    it('renders correct number of cocktails', () => {
      const cocktails = [
        {
          idDrink: '1',
          strDrink: 'Drink 1',
          strDrinkThumb: 'https://example.com/1.jpg',
          strAlcoholic: 'Alcoholic',
          strGlass: 'Glass 1',
        },
        {
          idDrink: '2',
          strDrink: 'Drink 2',
          strDrinkThumb: 'https://example.com/2.jpg',
          strAlcoholic: 'Non alcoholic',
          strGlass: 'Glass 2',
        },
        {
          id: '3',
          name: 'Drink 3',
          image: 'https://example.com/3.jpg',
          info: 'Alcoholic',
          glass: 'Glass 3',
        },
      ];

      renderWithRouter(<CocktailList drinks={cocktails} favorites={new Set()} />);
      
      expect(screen.getByText('Drink 1')).toBeInTheDocument();
      expect(screen.getByText('Drink 2')).toBeInTheDocument();
      expect(screen.getByText('Drink 3')).toBeInTheDocument();
      
      // Should render 3 cocktails (6 links: 2 per card)
      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(6);
    });
  });

  describe('Grid Layout', () => {
    it('renders within a wrapper component', () => {
      const cocktails = [
        {
          idDrink: '11007',
          strDrink: 'Test Drink',
          strDrinkThumb: 'https://example.com/test.jpg',
          strAlcoholic: 'Alcoholic',
          strGlass: 'Test glass',
        },
      ];

      const { container } = renderWithRouter(
        <CocktailList drinks={cocktails} favorites={new Set()} />
      );
      
      // Check that wrapper exists (styled component)
      expect(container.firstChild).toBeTruthy();
    });
  });
});
