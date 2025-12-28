import { Form, redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { COCKTAIL_API_URL } from '../config';

const API_URL = COCKTAIL_API_URL;

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  
  // Parse ingredients from comma-separated string
  const ingredientsArray = data.ingredients
    .split(',')
    .map(ing => ing.trim())
    .filter(ing => ing)
    .map(ing => ({ name: ing, measure: '' }));

  const cocktailData = {
    name: data.name,
    category: data.category,
    alcoholic: data.alcoholic,
    glass: data.glass,
    instructions: data.instructions,
    image: data.image || 'https://www.thecocktaildb.com/images/media/drink/default.jpg',
    ingredients: ingredientsArray,
  };

  try {
    console.log('Creating cocktail:', cocktailData);
    const response = await axios.post(API_URL, cocktailData);
    console.log('Cocktail created successfully:', response.data);
    toast.success('Cocktail created successfully!');
    return redirect('/my-cocktails');
  } catch (error) {
    console.error('Error creating cocktail:', error.response?.data || error.message);
    toast.error(error.response?.data?.error || 'Failed to create cocktail');
    return { error: error.response?.data?.error || error.message };
  }
};

const CreateCocktail = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <div className='form-container'>
        <Form method='post' className='form'>
          <h2>Create New Cocktail</h2>
          
          <div className='form-row'>
            <label htmlFor='name' className='form-label'>
              Cocktail Name *
            </label>
            <input
              type='text'
              name='name'
              id='name'
              className='form-input'
              placeholder='Margarita'
              required
            />
          </div>

          <div className='form-row'>
            <label htmlFor='category' className='form-label'>
              Category *
            </label>
            <input
              type='text'
              name='category'
              id='category'
              className='form-input'
              placeholder='Ordinary Drink, Cocktail, etc.'
              required
            />
          </div>

          <div className='form-row'>
            <label htmlFor='alcoholic' className='form-label'>
              Alcoholic *
            </label>
            <select
              name='alcoholic'
              id='alcoholic'
              className='form-input'
              required
            >
              <option value=''>Select...</option>
              <option value='Alcoholic'>Alcoholic</option>
              <option value='Non alcoholic'>Non Alcoholic</option>
            </select>
          </div>

          <div className='form-row'>
            <label htmlFor='glass' className='form-label'>
              Glass Type *
            </label>
            <input
              type='text'
              name='glass'
              id='glass'
              className='form-input'
              placeholder='Cocktail glass, Highball glass, etc.'
              required
            />
          </div>

          <div className='form-row'>
            <label htmlFor='ingredients' className='form-label'>
              Ingredients (comma-separated) *
            </label>
            <input
              type='text'
              name='ingredients'
              id='ingredients'
              className='form-input'
              placeholder='Tequila, Lime Juice, Triple Sec, Salt'
              required
            />
            <small>Enter ingredient names separated by commas</small>
          </div>

          <div className='form-row'>
            <label htmlFor='image' className='form-label'>
              Image URL
            </label>
            <input
              type='url'
              name='image'
              id='image'
              className='form-input'
              placeholder='https://example.com/image.jpg'
            />
          </div>

          <div className='form-row'>
            <label htmlFor='instructions' className='form-label'>
              Instructions *
            </label>
            <textarea
              name='instructions'
              id='instructions'
              className='form-textarea'
              rows='6'
              placeholder='Describe how to make this cocktail...'
              required
            />
          </div>

          <div className='button-row'>
            <button type='submit' className='btn btn-block'>
              Create Cocktail
            </button>
            <button
              type='button'
              className='btn btn-block btn-hipster'
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </Form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .form {
    background: var(--white);
    padding: 2rem 2.5rem;
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-2);
  }

  h2 {
    text-align: center;
    margin-bottom: 2rem;
    color: var(--primary-500);
  }

  .form-row {
    margin-bottom: 1.5rem;
  }

  .form-label {
    display: block;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    color: var(--grey-700);
    font-weight: 500;
  }

  .form-input,
  .form-textarea {
    width: 100%;
    padding: 0.75rem;
    border-radius: var(--borderRadius);
    background: var(--backgroundColor);
    border: 1px solid var(--grey-200);
    font-size: 1rem;
  }

  .form-textarea {
    resize: vertical;
    font-family: inherit;
  }

  small {
    display: block;
    margin-top: 0.25rem;
    color: var(--grey-500);
    font-size: 0.75rem;
  }

  .button-row {
    display: grid;
    gap: 1rem;
    margin-top: 2rem;
  }

  @media (min-width: 768px) {
    .button-row {
      grid-template-columns: 1fr 1fr;
    }
  }

  .btn-hipster {
    background: var(--grey-500);
  }

  .btn-hipster:hover {
    background: var(--grey-700);
  }
`;

export default CreateCocktail;
