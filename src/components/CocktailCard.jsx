import { Link, useOutletContext } from 'react-router-dom';
import Wrapper from '../assets/wrappers/CocktailCard';
const CocktailCard = ({ image, name, id, info, glass, source }) => {
  // Route to different pages based on source (API vs DB)
  const detailPath = source === 'db' ? `/my-cocktails/${id}` : `/cocktail/${id}`;
  
  return (
    <Wrapper>
      <div className='img-container'>
        <img src={image} alt={name} className='img' />
      </div>
      <div className='footer'>
        <h4>{name}</h4>
        <h5>{glass}</h5>
        <p>{info}</p>
        <Link to={detailPath} className='btn'>
          details
        </Link>
      </div>
    </Wrapper>
  );
};
export default CocktailCard;
