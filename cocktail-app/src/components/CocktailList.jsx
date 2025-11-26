import Wrapper from '../assets/wrappers/CocktailList';
import CocktailCard from './CocktailCard';
const CocktailList = ({ drinks }) => {
  if (!drinks || !Array.isArray(drinks)) {
    return (
      <h4 style={{ textAlign: 'center' }}>No matching cocktails found...</h4>
    );
  }
  const formattedDrinks = drinks.map((item) => {
    // Check if it's an API cocktail (has idDrink) or DB cocktail (has id)
    if (item.idDrink) {
      // API cocktail format
      const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = item;
      return {
        id: idDrink,
        name: strDrink,
        image: strDrinkThumb,
        info: strAlcoholic,
        glass: strGlass,
        source: 'api'
      };
    } else {
      // DB cocktail format - already in correct format
      return {
        id: item.id,
        name: item.name,
        image: item.image,
        info: item.info,
        glass: item.glass,
        source: 'db'
      };
    }
  });
  return (
    <Wrapper>
      {formattedDrinks.map((item) => {
        return <CocktailCard key={item.id} {...item} />;
      })}
    </Wrapper>
  );
};
export default CocktailList;
