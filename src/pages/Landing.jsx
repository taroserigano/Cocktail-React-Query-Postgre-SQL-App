import { useState, useMemo, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import CocktailList from "../components/CocktailList";
import SearchForm from "../components/SearchForm";
import FilterBar from "../components/FilterBar";
import { COCKTAIL_API_URL } from "../config";
const cocktailSearchUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const API_URL = COCKTAIL_API_URL;

import { useQuery } from "@tanstack/react-query";

const searchCocktailsQuery = (searchTerm) => {
  return {
    queryKey: ["search", searchTerm || "all"],
    queryFn: async () => {
      try {
        const searchQuery = searchTerm || "a";
        const dbUrl = searchTerm ? `${API_URL}?search=${searchTerm}` : API_URL;

        // Fetch from both sources in parallel for better performance
        const [dbResponse, apiResponse] = await Promise.allSettled([
          axios.get(dbUrl),
          axios.get(`${cocktailSearchUrl}${searchQuery}`),
        ]);

        // Process database results
        const dbDrinks =
          dbResponse.status === "fulfilled"
            ? (dbResponse.value.data.data || []).map((cocktail) => ({
                id: cocktail.id,
                name: cocktail.name,
                image: cocktail.image,
                info: cocktail.alcoholic,
                glass: cocktail.glass,
                category: cocktail.category,
                source: "db",
              }))
            : [];

        // Process API results
        const apiDrinks =
          apiResponse.status === "fulfilled"
            ? (apiResponse.value.data.drinks || []).map((drink) => ({
                idDrink: drink.idDrink,
                strDrink: drink.strDrink,
                strDrinkThumb: drink.strDrinkThumb,
                strAlcoholic: drink.strAlcoholic,
                strGlass: drink.strGlass,
                strCategory: drink.strCategory,
              }))
            : [];

        // Merge both arrays - API drinks first, then custom cocktails
        return [...apiDrinks, ...dbDrinks];
      } catch (error) {
        console.error("Error fetching cocktails:", error);
        return [];
      }
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const url = new URL(request.url);

    const searchTerm = url.searchParams.get("search") || "";
    await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm));
    return { searchTerm };
  };

import CocktailListSkeleton from "../components/CocktailListSkeleton";

const Landing = () => {
  const { searchTerm } = useLoaderData();
  const { data: drinks, isLoading } = useQuery(
    searchCocktailsQuery(searchTerm)
  );
  const [filters, setFilters] = useState({
    alcoholic: "all",
    category: "all",
    favorites: false,
  });
  const [favoritesSet, setFavoritesSet] = useState(() => {
    const favArray = JSON.parse(
      localStorage.getItem("favoriteCocktails") || "[]"
    );
    return new Set(favArray);
  });

  // Update favorites when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const favArray = JSON.parse(
        localStorage.getItem("favoriteCocktails") || "[]"
      );
      setFavoritesSet(new Set(favArray));
    };

    // Listen for storage events from other tabs
    window.addEventListener("storage", handleStorageChange);

    // Poll for changes in same tab (since storage event doesn't fire in same tab)
    const interval = setInterval(handleStorageChange, 500);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Apply filters to drinks - memoized for performance
  const filteredDrinks = useMemo(() => {
    if (!drinks) return [];

    return drinks.filter((drink) => {
      // Get the alcoholic status - handle both API and DB cocktails
      const alcoholicStatus = drink.strAlcoholic || drink.info;
      const category = drink.strCategory || drink.category;
      const drinkId = drink.idDrink || drink.id;

      // Filter by favorites
      if (filters.favorites && !favoritesSet.has(drinkId)) {
        return false;
      }

      // Filter by alcoholic type
      if (
        filters.alcoholic !== "all" &&
        alcoholicStatus !== filters.alcoholic
      ) {
        return false;
      }

      // Filter by category
      if (filters.category !== "all" && category !== filters.category) {
        return false;
      }

      return true;
    });
  }, [drinks, filters, favoritesSet]);

  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <FilterBar onFilterChange={handleFilterChange} />
      {isLoading ? (
        <CocktailListSkeleton />
      ) : (
        <CocktailList drinks={filteredDrinks} favorites={favoritesSet} />
      )}
    </>
  );
};
export default Landing;
