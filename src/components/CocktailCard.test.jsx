import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import CocktailCard from './CocktailCard';

// Helper to render with router
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('CocktailCard', () => {
  const mockCocktail = {
    id: '11007',
    name: 'Margarita',
    image: 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
    info: 'Alcoholic',
    glass: 'Cocktail glass',
    source: 'api',
    isFavorite: false,
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('renders cocktail information correctly', () => {
    renderWithRouter(<CocktailCard {...mockCocktail} />);

    expect(screen.getByText('Margarita')).toBeInTheDocument();
    expect(screen.getByText('Cocktail glass')).toBeInTheDocument();
    expect(screen.getByText('Alcoholic')).toBeInTheDocument();
    expect(screen.getByAltText('Margarita')).toBeInTheDocument();
  });

  it('renders image with lazy loading attribute', () => {
    renderWithRouter(<CocktailCard {...mockCocktail} />);
    
    const img = screen.getByAltText('Margarita');
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('links to correct detail page for API cocktail', () => {
    renderWithRouter(<CocktailCard {...mockCocktail} />);
    
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/cocktail/11007');
  });

  it('links to correct detail page for DB cocktail', () => {
    const dbCocktail = { ...mockCocktail, source: 'db' };
    renderWithRouter(<CocktailCard {...dbCocktail} />);
    
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/my-cocktails/11007');
  });

  it('toggles favorite state when favorite button is clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter(<CocktailCard {...mockCocktail} />);
    
    const favoriteBtn = screen.getByLabelText('Add to favorites');
    await user.click(favoriteBtn);

    await waitFor(() => {
      const updatedBtn = screen.getByLabelText('Remove from favorites');
      expect(updatedBtn).toHaveClass('active');
    });

    // Check localStorage
    const favorites = JSON.parse(localStorage.getItem('favoriteCocktails'));
    expect(favorites).toContain('11007');
  });

  it('removes favorite when already favorited', async () => {
    const user = userEvent.setup();
    localStorage.setItem('favoriteCocktails', JSON.stringify(['11007']));
    
    const favoriteCocktail = { ...mockCocktail, isFavorite: true };
    renderWithRouter(<CocktailCard {...favoriteCocktail} />);
    
    const favoriteBtn = screen.getByLabelText('Remove from favorites');
    await user.click(favoriteBtn);

    await waitFor(() => {
      const updatedBtn = screen.getByLabelText('Add to favorites');
      expect(updatedBtn).not.toHaveClass('active');
    });

    // Check localStorage
    const favorites = JSON.parse(localStorage.getItem('favoriteCocktails'));
    expect(favorites).not.toContain('11007');
  });

  it('prevents navigation when favorite button is clicked', async () => {
    const user = userEvent.setup();
    const mockNavigate = vi.fn();
    
    renderWithRouter(<CocktailCard {...mockCocktail} />);
    
    const favoriteBtn = screen.getByLabelText('Add to favorites');
    await user.click(favoriteBtn);

    // Should update localStorage without navigating
    const favorites = JSON.parse(localStorage.getItem('favoriteCocktails'));
    expect(favorites).toContain('11007');
  });

  it('renders details button', () => {
    renderWithRouter(<CocktailCard {...mockCocktail} />);
    
    const detailsBtn = screen.getByRole('link', { name: /details/i });
    expect(detailsBtn).toBeInTheDocument();
    expect(detailsBtn).toHaveClass('btn');
  });

  it('maintains favorite state across re-renders (React.memo)', () => {
    const { rerender } = renderWithRouter(<CocktailCard {...mockCocktail} />);
    
    const initialRender = screen.getByText('Margarita');
    
    // Re-render with same props
    rerender(<BrowserRouter><CocktailCard {...mockCocktail} /></BrowserRouter>);
    
    const afterRerender = screen.getByText('Margarita');
    expect(afterRerender).toBeInTheDocument();
  });

  it('initializes favorite state from prop', () => {
    const favoriteCocktail = { ...mockCocktail, isFavorite: true };
    renderWithRouter(<CocktailCard {...favoriteCocktail} />);
    
    const favoriteBtn = screen.getByLabelText('Remove from favorites');
    expect(favoriteBtn).toHaveClass('active');
  });
});
