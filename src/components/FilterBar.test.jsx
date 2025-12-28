import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterBar from './FilterBar';

describe('FilterBar', () => {
  const mockOnFilterChange = vi.fn();

  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  describe('Initial Render', () => {
    it('renders all filter sections', () => {
      render(<FilterBar onFilterChange={mockOnFilterChange} />);
      
      expect(screen.getByText('Type:')).toBeInTheDocument();
      expect(screen.getByText('Category:')).toBeInTheDocument();
    });

    it('renders all alcoholic type filters', () => {
      render(<FilterBar onFilterChange={mockOnFilterChange} />);
      
      expect(screen.getByRole('button', { name: /^All$/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /🍸 Alcoholic/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /🥤 Non-Alcoholic/i })).toBeInTheDocument();
    });

    it('renders all category filters', () => {
      render(<FilterBar onFilterChange={mockOnFilterChange} />);
      
      const categoryButtons = screen.getAllByRole('button');
      const categoryLabels = ['All', 'Ordinary Drink', 'Cocktail', 'Shot', 'Coffee / Tea', 'Beer'];
      
      categoryLabels.forEach(label => {
        const button = categoryButtons.find(btn => btn.textContent.includes(label));
        expect(button).toBeTruthy();
      });
    });

    it('renders favorites toggle', () => {
      render(<FilterBar onFilterChange={mockOnFilterChange} />);
      
      expect(screen.getByRole('button', { name: /❤️ Show Favorites Only/i })).toBeInTheDocument();
    });

    it('has "All" as default active filter for type', () => {
      render(<FilterBar onFilterChange={mockOnFilterChange} />);
      
      const allButton = screen.getByRole('button', { name: /^All$/i });
      expect(allButton).toHaveClass('active');
    });

    it('has "All" as default active filter for category', () => {
      render(<FilterBar onFilterChange={mockOnFilterChange} />);
      
      const buttons = screen.getAllByRole('button');
      const categoryAllButton = buttons.find(btn => 
        btn.textContent === 'All' && btn.classList.contains('active')
      );
      expect(categoryAllButton).toBeTruthy();
    });

    it('favorites filter is not active by default', () => {
      render(<FilterBar onFilterChange={mockOnFilterChange} />);
      
      const favButton = screen.getByRole('button', { name: /❤️ Show Favorites Only/i });
      expect(favButton).not.toHaveClass('active');
    });
  });

  describe('Alcoholic Type Filters', () => {
    it('calls onFilterChange when "Alcoholic" is clicked', async () => {
      const user = userEvent.setup();
      render(<FilterBar onFilterChange={mockOnFilterChange} />);
      
      const alcoholicBtn = screen.getByRole('button', { name: /🍸 Alcoholic/i });
      await user.click(alcoholicBtn);
      
      expect(mockOnFilterChange).toHaveBeenCalledWith({
        alcoholic: 'Alcoholic',
        category: 'all',
        favorites: false,
      });
    });

    it('calls onFilterChange when "Non-Alcoholic" is clicked', async () => {
      const user = userEvent.setup();
      render(<FilterBar onFilterChange={mockOnFilterChange} />);
      
      const nonAlcoholicBtn = screen.getByRole('button', { name: /🥤 Non-Alcoholic/i });
      await user.click(nonAlcoholicBtn);
      
      expect(mockOnFilterChange).toHaveBeenCalledWith({
        alcoholic: 'Non alcoholic',
        category: 'all',
        favorites: false,
      });
    });

    it('updates active class when filter changes', async () => {
      const user = userEvent.setup();
      render(<FilterBar onFilterChange={mockOnFilterChange} />);
      
      const alcoholicBtn = screen.getByRole('button', { name: /🍸 Alcoholic/i });
      const allBtn = screen.getByRole('button', { name: /^All$/i });
      
      // Initially "All" is active
      expect(allBtn).toHaveClass('active');
      expect(alcoholicBtn).not.toHaveClass('active');
      
      // Click "Alcoholic"
      await user.click(alcoholicBtn);
      
      // Now "Alcoholic" should be active
      expect(alcoholicBtn).toHaveClass('active');
      expect(allBtn).not.toHaveClass('active');
    });

    it('allows switching back to "All"', async () => {
      const user = userEvent.setup();
      render(<FilterBar onFilterChange={mockOnFilterChange} />);
      
      const alcoholicBtn = screen.getByRole('button', { name: /🍸 Alcoholic/i });
      const allBtn = screen.getByRole('button', { name: /^All$/i });
      
      await user.click(alcoholicBtn);
      await user.click(allBtn);
      
      expect(mockOnFilterChange).toHaveBeenLastCalledWith({
        alcoholic: 'all',
        category: 'all',
        favorites: false,
      });
      
      expect(allBtn).toHaveClass('active');
    });
  });

  describe('Category Filters', () => {
    it('calls onFilterChange when "Cocktail" category is clicked', async () => {
      const user = userEvent.setup();
      render(<FilterBar onFilterChange={mockOnFilterChange} />);
      
      const cocktailBtn = screen.getByRole('button', { name: /Cocktail/i });
      await user.click(cocktailBtn);
      
      expect(mockOnFilterChange).toHaveBeenCalledWith({
        alcoholic: 'all',
        category: 'Cocktail',
        favorites: false,
      });
    });

    it('calls onFilterChange when "Shot" category is clicked', async () => {
      const user = userEvent.setup();
      render(<FilterBar onFilterChange={mockOnFilterChange} />);
      
      const shotBtn = screen.getByRole('button', { name: /Shot/i });
      await user.click(shotBtn);
      
      expect(mockOnFilterChange).toHaveBeenCalledWith({
        alcoholic: 'all',
        category: 'Shot',
        favorites: false,
      });
    });

    it('updates active class when category changes', async () => {
      const user = userEvent.setup();
      render(<FilterBar onFilterChange={mockOnFilterChange} />);
      
      const cocktailBtn = screen.getByRole('button', { name: /Cocktail/i });
      await user.click(cocktailBtn);
      
      expect(cocktailBtn).toHaveClass('active');
    });
  });

  describe('Favorites Filter', () => {
    it('toggles favorites filter on click', async () => {
      const user = userEvent.setup();
      render(<FilterBar onFilterChange={mockOnFilterChange} />);
      
      const favBtn = screen.getByRole('button', { name: /❤️ Show Favorites Only/i });
      
      // Click to enable
      await user.click(favBtn);
      
      expect(mockOnFilterChange).toHaveBeenCalledWith({
        alcoholic: 'all',
        category: 'all',
        favorites: true,
      });
      
      expect(favBtn).toHaveClass('active');
    });

    it('toggles favorites filter off on second click', async () => {
      const user = userEvent.setup();
      render(<FilterBar onFilterChange={mockOnFilterChange} />);
      
      const favBtn = screen.getByRole('button', { name: /❤️ Show Favorites Only/i });
      
      // Click twice
      await user.click(favBtn);
      await user.click(favBtn);
      
      expect(mockOnFilterChange).toHaveBeenLastCalledWith({
        alcoholic: 'all',
        category: 'all',
        favorites: false,
      });
      
      expect(favBtn).not.toHaveClass('active');
    });
  });

  describe('Combined Filters', () => {
    it('maintains other filters when changing alcoholic type', async () => {
      const user = userEvent.setup();
      render(<FilterBar onFilterChange={mockOnFilterChange} />);
      
      // Set category first
      const cocktailBtn = screen.getByRole('button', { name: /Cocktail/i });
      await user.click(cocktailBtn);
      
      // Then change alcoholic type
      const alcoholicBtn = screen.getByRole('button', { name: /🍸 Alcoholic/i });
      await user.click(alcoholicBtn);
      
      expect(mockOnFilterChange).toHaveBeenLastCalledWith({
        alcoholic: 'Alcoholic',
        category: 'Cocktail',
        favorites: false,
      });
    });

    it('maintains other filters when toggling favorites', async () => {
      const user = userEvent.setup();
      render(<FilterBar onFilterChange={mockOnFilterChange} />);
      
      // Set filters
      const alcoholicBtn = screen.getByRole('button', { name: /🍸 Alcoholic/i });
      const shotBtn = screen.getByRole('button', { name: /Shot/i });
      await user.click(alcoholicBtn);
      await user.click(shotBtn);
      
      // Toggle favorites
      const favBtn = screen.getByRole('button', { name: /❤️ Show Favorites Only/i });
      await user.click(favBtn);
      
      expect(mockOnFilterChange).toHaveBeenLastCalledWith({
        alcoholic: 'Alcoholic',
        category: 'Shot',
        favorites: true,
      });
    });

    it('allows complex filter combinations', async () => {
      const user = userEvent.setup();
      render(<FilterBar onFilterChange={mockOnFilterChange} />);
      
      // Set multiple filters
      const nonAlcoholicBtn = screen.getByRole('button', { name: /🥤 Non-Alcoholic/i });
      const coffeeBtn = screen.getByRole('button', { name: /Coffee \/ Tea/i });
      const favBtn = screen.getByRole('button', { name: /❤️ Show Favorites Only/i });
      
      await user.click(nonAlcoholicBtn);
      await user.click(coffeeBtn);
      await user.click(favBtn);
      
      expect(mockOnFilterChange).toHaveBeenLastCalledWith({
        alcoholic: 'Non alcoholic',
        category: 'Coffee / Tea',
        favorites: true,
      });
    });
  });

  describe('Callback Invocation', () => {
    it('calls onFilterChange exactly once per click', async () => {
      const user = userEvent.setup();
      render(<FilterBar onFilterChange={mockOnFilterChange} />);
      
      const alcoholicBtn = screen.getByRole('button', { name: /🍸 Alcoholic/i });
      await user.click(alcoholicBtn);
      
      expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
    });

    it('calls onFilterChange with correct filter object structure', async () => {
      const user = userEvent.setup();
      render(<FilterBar onFilterChange={mockOnFilterChange} />);
      
      const alcoholicBtn = screen.getByRole('button', { name: /🍸 Alcoholic/i });
      await user.click(alcoholicBtn);
      
      const callArg = mockOnFilterChange.mock.calls[0][0];
      expect(callArg).toHaveProperty('alcoholic');
      expect(callArg).toHaveProperty('category');
      expect(callArg).toHaveProperty('favorites');
    });
  });
});
