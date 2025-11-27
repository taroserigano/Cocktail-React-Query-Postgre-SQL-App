import { NavLink, useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Navbar';
import axios from 'axios';

const CocktailIcon = () => (
  <svg 
    width="32" 
    height="32" 
    viewBox="0 0 64 64" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="cocktail-icon"
  >
    <defs>
      <linearGradient id="cocktailGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--neon-purple)" />
        <stop offset="50%" stopColor="var(--primary-500)" />
        <stop offset="100%" stopColor="var(--accent-500)" />
      </linearGradient>
    </defs>
    {/* Martini glass */}
    <path 
      d="M32 20 L12 44 L52 44 L32 20 Z" 
      stroke="url(#cocktailGradient)" 
      strokeWidth="2.5" 
      fill="rgba(168, 85, 247, 0.2)"
    />
    {/* Glass stem */}
    <line 
      x1="32" 
      y1="44" 
      x2="32" 
      y2="56" 
      stroke="url(#cocktailGradient)" 
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Glass base */}
    <line 
      x1="26" 
      y1="56" 
      x2="38" 
      y2="56" 
      stroke="url(#cocktailGradient)" 
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Olive/garnish */}
    <circle 
      cx="28" 
      cy="32" 
      r="3" 
      fill="var(--neon-green)" 
      opacity="0.8"
    />
    {/* Olive stick */}
    <line 
      x1="28" 
      y1="26" 
      x2="28" 
      y2="35" 
      stroke="var(--neon-green)" 
      strokeWidth="1.5"
      opacity="0.6"
    />
    {/* Liquid sparkle */}
    <circle 
      cx="36" 
      cy="36" 
      r="1.5" 
      fill="var(--neon-blue)" 
      opacity="0.9"
    />
    <circle 
      cx="24" 
      cy="38" 
      r="1" 
      fill="var(--neon-blue)" 
      opacity="0.7"
    />
  </svg>
);

const Navbar = () => {
  const navigate = useNavigate();
  
  const handleRandomCocktail = async () => {
    try {
      const { data } = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      if (data.drinks && data.drinks[0]) {
        navigate(`/cocktail/${data.drinks[0].idDrink}`);
      }
    } catch (error) {
      console.error('Error fetching random cocktail:', error);
    }
  };
  
  return (
    <Wrapper>
      <div className='nav-center'>
        <span className='logo'>
          <CocktailIcon />
          MixMaster
        </span>
        <div className='nav-links'>
          <NavLink to='/' className='nav-link'>
            Home
          </NavLink>
          <NavLink to='/my-cocktails' className='nav-link'>
            My Cocktails
          </NavLink>
          <NavLink to='/about' className='nav-link'>
            About
          </NavLink>
          <NavLink to='/newsletter' className='nav-link'>
            Newsletter
          </NavLink>
          <button onClick={handleRandomCocktail} className='nav-link random-btn'>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 4L20 6L18 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18 16L20 18L18 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 12H14C16.2091 12 18 10.2091 18 8V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 12H10C12.2091 12 14 13.7909 14 16V18C14 18 16 18 18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Random
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
