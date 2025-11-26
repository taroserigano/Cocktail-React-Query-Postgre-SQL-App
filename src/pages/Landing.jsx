import { useLoaderData } from 'react-router-dom';
import axios from 'axios';
import CocktailList from '../components/CocktailList';
import SearchForm from '../components/SearchForm';
const cocktailSearchUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const API_URL = 'http://localhost:5000/api/cocktails';

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

const Landing = () => {
  const { searchTerm } = useLoaderData();
  const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm));

  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <CocktailList drinks={drinks} />
    </>
  );
};
export default Landing;
