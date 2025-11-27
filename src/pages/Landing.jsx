import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import CocktailList from '../components/CocktailList';
import SearchForm from '../components/SearchForm';
import FilterBar from '../components/FilterBar';
import { COCKTAIL_API_URL } from '../config';
const cocktailSearchUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const API_URL = COCKTAIL_API_URL;

import { useQuery } from '@tanstack/react-query';

const searchCocktailsQuery = (searchTerm) => {
  return {
    queryKey: ['search', searchTerm || 'all'],
    queryFn: async () => {
      try {
        // Fetch from your database - always fetch all
        const dbResponse = await axios.get(API_URL);
        const dbDrinks = dbResponse.data.data || [];

        // Transform your database cocktails to match the component format
        const transformedDbDrinks = dbDrinks.map(cocktail => ({
          id: cocktail.id,
          name: cocktail.name,
          image: cocktail.image,
          info: cocktail.alcoholic,
          glass: cocktail.glass,
          source: 'db'
        }));

        // Fetch from CocktailDB API - use 'a' as default if no search term
        const searchQuery = searchTerm || 'a';
        const apiResponse = await axios.get(`${cocktailSearchUrl}${searchQuery}`);
        const apiDrinks = (apiResponse.data.drinks || []).map(drink => ({
          idDrink: drink.idDrink,
          strDrink: drink.strDrink,
          strDrinkThumb: drink.strDrinkThumb,
          strAlcoholic: drink.strAlcoholic,
          strGlass: drink.strGlass,
        }));

        // Merge both arrays - API drinks first, then custom cocktails
        return [...apiDrinks, ...transformedDbDrinks];
      } catch (error) {
        console.error('Error fetching cocktails:', error);
        // If backend is down, try just API results
        try {
          const searchQuery = searchTerm || 'a';
          const apiResponse = await axios.get(`${cocktailSearchUrl}${searchQuery}`);
          return apiResponse.data.drinks || [];
        } catch (apiError) {
          return [];
        }
      }
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const url = new URL(request.url);

    const searchTerm = url.searchParams.get('search') || '';
    await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm));
    return { searchTerm };
  };

import CocktailListSkeleton from '../components/CocktailListSkeleton';

const Landing = () => {
  const { searchTerm } = useLoaderData();
  const { data: drinks, isLoading } = useQuery(searchCocktailsQuery(searchTerm));
  const [filters, setFilters] = useState({
    alcoholic: 'all',
    category: 'all',
    favorites: false,
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Apply filters to drinks
  const filteredDrinks = drinks?.filter(drink => {
    // Get the alcoholic status - handle both API and DB cocktails
    const alcoholicStatus = drink.strAlcoholic || drink.info;
    const category = drink.strCategory || drink.category;
    const drinkId = drink.idDrink || drink.id;

    // Filter by favorites
    if (filters.favorites) {
      const favorites = JSON.parse(localStorage.getItem('favoriteCocktails') || '[]');
      if (!favorites.includes(drinkId)) {
        return false;
      }
    }

    // Filter by alcoholic type
    if (filters.alcoholic !== 'all' && alcoholicStatus !== filters.alcoholic) {
      return false;
    }

    // Filter by category
    if (filters.category !== 'all' && category !== filters.category) {
      return false;
    }

    return true;
  });

  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <FilterBar onFilterChange={handleFilterChange} />
      {isLoading ? <CocktailListSkeleton /> : <CocktailList drinks={filteredDrinks} />}
    </>
  );
};
export default Landing;
