import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  About,
  HomeLayout,
  Landing,
  Error,
  Newsletter,
  Cocktail,
  SinglePageError,
  EditCocktail,
  MyCocktails,
  MyCocktail,
  CreateCocktail,
} from './pages';

import { loader as landingLoader } from './pages/Landing';
import { loader as singleCocktailLoader } from './pages/Cocktail';
import { action as newsletterAction } from './pages/Newsletter';
import { loader as editCocktailLoader, action as editCocktailAction } from './pages/EditCocktail';
import { action as myCocktailsAction } from './pages/MyCocktails';
import { loader as myCocktailLoader } from './pages/MyCocktail';
import { action as createCocktailAction } from './pages/CreateCocktail';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <SinglePageError />,
        loader: landingLoader(queryClient),
      },
      {
        path: 'cocktail/:id',
        errorElement: <SinglePageError />,
        loader: singleCocktailLoader(queryClient),
        element: <Cocktail />,
      },
      {
        path: 'cocktail/:id/edit',
        errorElement: <SinglePageError />,
        loader: editCocktailLoader,
        action: editCocktailAction,
        element: <EditCocktail />,
      },
      {
        path: 'my-cocktails',
        element: <MyCocktails />,
        action: myCocktailsAction,
        errorElement: <SinglePageError />,
      },
      {
        path: 'my-cocktails/:id',
        element: <MyCocktail />,
        loader: myCocktailLoader,
        errorElement: <SinglePageError />,
      },
      {
        path: 'my-cocktails/:id/edit',
        errorElement: <SinglePageError />,
        loader: editCocktailLoader,
        action: editCocktailAction,
        element: <EditCocktail />,
      },
      {
        path: 'create-cocktail',
        element: <CreateCocktail />,
        action: createCocktailAction,
        errorElement: <SinglePageError />,
      },
      {
        path: 'newsletter',
        element: <Newsletter />,
        action: newsletterAction,
        errorElement: <SinglePageError />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
