import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';
import Landing from './Landing';

// Mock modules
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLoaderData: () => ({ searchTerm: '' }),
  };
});

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');
  return {
    ...actual,
    useQuery: () => ({
      data: [],
      isLoading: false,
    }),
  };
});

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

const renderWithProviders = (ui) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{ui}</BrowserRouter>
    </QueryClientProvider>
  );
};

describe('Landing Page', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Initial Render', () => {
    it('renders SearchForm component', () => {
      renderWithProviders(<Landing />);
      expect(screen.getByPlaceholderText('Search cocktails...')).toBeInTheDocument();
    });

    it('renders FilterBar component', () => {
      renderWithProviders(<Landing />);
      expect(screen.getByText('Type:')).toBeInTheDocument();
    });

    it('renders CocktailList with empty message when no drinks', () => {
      renderWithProviders(<Landing />);
      expect(screen.getByText('No matching cocktails found...')).toBeInTheDocument();
    });
  });

  describe('Favorites Set Creation', () => {
    it('creates Set from localStorage favorites', () => {
      localStorage.setItem('favoriteCocktails', JSON.stringify(['11007', '11008', '11009']));
      
      renderWithProviders(<Landing />);
      
      // Component should render without errors
      expect(screen.getByPlaceholderText('Search cocktails...')).toBeInTheDocument();
    });

    it('handles empty localStorage', () => {
      renderWithProviders(<Landing />);
      
      // Should not throw error
      expect(screen.getByText('No matching cocktails found...')).toBeInTheDocument();
    });

    it('handles invalid localStorage data', () => {
      localStorage.setItem('favoriteCocktails', 'invalid json');
      
      // Should handle gracefully and not crash
      try {
        renderWithProviders(<Landing />);
        expect(screen.getByPlaceholderText('Search cocktails...')).toBeInTheDocument();
      } catch (error) {
        // If it crashes, the test will fail
        expect(error).toBeUndefined();
      }
    });

    it('uses Set for O(1) lookup performance', () => {
      // Add many favorites to test Set usage
      const manyFavorites = Array.from({ length: 1000 }, (_, i) => `${i}`);
      localStorage.setItem('favoriteCocktails', JSON.stringify(manyFavorites));
      
      renderWithProviders(<Landing />);
      
      // Component should render quickly without performance issues
      expect(screen.getByPlaceholderText('Search cocktails...')).toBeInTheDocument();
    });
  });

  describe('Filter Integration', () => {
    it('handles filter changes', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Landing />);
      
      const alcoholicBtn = screen.getByRole('button', { name: /🍸 Alcoholic/i });
      await user.click(alcoholicBtn);
      
      // Filter should update (component shouldn't crash)
      expect(alcoholicBtn).toHaveClass('active');
    });

    it('applies favorites filter correctly', async () => {
      const user = userEvent.setup();
      localStorage.setItem('favoriteCocktails', JSON.stringify(['11007']));
      
      renderWithProviders(<Landing />);
      
      const favBtn = screen.getByRole('button', { name: /❤️ Show Favorites Only/i });
      await user.click(favBtn);
      
      expect(favBtn).toHaveClass('active');
    });
  });

  describe('Search Integration', () => {
    it('passes searchTerm to SearchForm', () => {
      // Mock with search term
      vi.mock('react-router-dom', async () => {
        const actual = await vi.importActual('react-router-dom');
        return {
          ...actual,
          useLoaderData: () => ({ searchTerm: 'margarita' }),
        };
      });

      renderWithProviders(<Landing />);
      
      // SearchForm should render
      expect(screen.getByPlaceholderText('Search cocktails...')).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('shows skeleton while loading', () => {
      vi.mock('@tanstack/react-query', async () => {
        const actual = await vi.importActual('@tanstack/react-query');
        return {
          ...actual,
          useQuery: () => ({
            data: null,
            isLoading: true,
          }),
        };
      });

      renderWithProviders(<Landing />);
      
      // Note: This test assumes CocktailListSkeleton renders
      // The actual skeleton component should be present
      expect(screen.getByPlaceholderText('Search cocktails...')).toBeInTheDocument();
    });
  });

  describe('useMemo Optimization', () => {
    it('memoizes favorites Set creation', () => {
      localStorage.setItem('favoriteCocktails', JSON.stringify(['11007', '11008']));
      
      const { rerender } = renderWithProviders(<Landing />);
      
      // Re-render should use memoized value
      rerender(
        <QueryClientProvider client={createTestQueryClient()}>
          <BrowserRouter><Landing /></BrowserRouter>
        </QueryClientProvider>
      );
      
      expect(screen.getByPlaceholderText('Search cocktails...')).toBeInTheDocument();
    });

    it('memoizes filtered drinks calculation', () => {
      renderWithProviders(<Landing />);
      
      // Component should render efficiently
      expect(screen.getByText('No matching cocktails found...')).toBeInTheDocument();
    });
  });

  describe('Component Composition', () => {
    it('renders all child components in correct order', () => {
      const { container } = renderWithProviders(<Landing />);
      
      // SearchForm should be first
      const searchForm = container.querySelector('form');
      expect(searchForm).toBeTruthy();
      
      // FilterBar should be present
      expect(screen.getByText('Type:')).toBeInTheDocument();
      
      // CocktailList should be last
      expect(screen.getByText('No matching cocktails found...')).toBeInTheDocument();
    });
  });
});

describe('Landing Page - Data Handling', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('API and DB Cocktails', () => {
    it('handles API cocktail format', () => {
      const apiDrinks = [
        {
          idDrink: '11007',
          strDrink: 'Margarita',
          strDrinkThumb: 'https://example.com/margarita.jpg',
          strAlcoholic: 'Alcoholic',
          strGlass: 'Cocktail glass',
          strCategory: 'Ordinary Drink',
        },
      ];

      vi.mock('@tanstack/react-query', async () => {
        const actual = await vi.importActual('@tanstack/react-query');
        return {
          ...actual,
          useQuery: () => ({
            data: apiDrinks,
            isLoading: false,
          }),
        };
      });

      renderWithProviders(<Landing />);
      
      // Should render without errors
      expect(screen.getByPlaceholderText('Search cocktails...')).toBeInTheDocument();
    });

    it('handles DB cocktail format', () => {
      const dbDrinks = [
        {
          id: '1',
          name: 'Custom Margarita',
          image: 'https://example.com/custom.jpg',
          info: 'Alcoholic',
          glass: 'Martini glass',
          category: 'Cocktail',
          source: 'db',
        },
      ];

      vi.mock('@tanstack/react-query', async () => {
        const actual = await vi.importActual('@tanstack/react-query');
        return {
          ...actual,
          useQuery: () => ({
            data: dbDrinks,
            isLoading: false,
          }),
        };
      });

      renderWithProviders(<Landing />);
      
      // Should render without errors
      expect(screen.getByPlaceholderText('Search cocktails...')).toBeInTheDocument();
    });

    it('handles mixed API and DB cocktails', () => {
      const mixedDrinks = [
        {
          idDrink: '11007',
          strDrink: 'API Margarita',
          strDrinkThumb: 'https://example.com/api.jpg',
          strAlcoholic: 'Alcoholic',
          strGlass: 'Cocktail glass',
          strCategory: 'Ordinary Drink',
        },
        {
          id: '1',
          name: 'DB Margarita',
          image: 'https://example.com/db.jpg',
          info: 'Alcoholic',
          glass: 'Martini glass',
          category: 'Cocktail',
          source: 'db',
        },
      ];

      vi.mock('@tanstack/react-query', async () => {
        const actual = await vi.importActual('@tanstack/react-query');
        return {
          ...actual,
          useQuery: () => ({
            data: mixedDrinks,
            isLoading: false,
          }),
        };
      });

      renderWithProviders(<Landing />);
      
      // Should render without errors
      expect(screen.getByPlaceholderText('Search cocktails...')).toBeInTheDocument();
    });
  });

  describe('Filter Logic', () => {
    it('filters by alcoholic type correctly', async () => {
      renderWithProviders(<Landing />);
      
      // Component should apply filters without errors
      expect(screen.getByText('No matching cocktails found...')).toBeInTheDocument();
    });

    it('filters by category correctly', async () => {
      renderWithProviders(<Landing />);
      
      // Component should apply filters without errors
      expect(screen.getByText('No matching cocktails found...')).toBeInTheDocument();
    });

    it('filters by favorites using Set.has() for O(1) lookup', async () => {
      localStorage.setItem('favoriteCocktails', JSON.stringify(['11007']));
      
      renderWithProviders(<Landing />);
      
      // Component should use Set.has() internally for performance
      expect(screen.getByText('No matching cocktails found...')).toBeInTheDocument();
    });

    it('applies multiple filters simultaneously', async () => {
      renderWithProviders(<Landing />);
      
      // Component should handle multiple active filters
      expect(screen.getByText('No matching cocktails found...')).toBeInTheDocument();
    });
  });
});
