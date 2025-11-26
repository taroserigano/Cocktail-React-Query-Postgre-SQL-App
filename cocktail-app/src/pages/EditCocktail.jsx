import { useState } from 'react';
import { useLoaderData, useNavigate, Form, redirect } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const API_URL = 'http://localhost:5000/api/cocktails';

export const loader = async ({ params }) => {
  try {
    const { data } = await axios.get(`${API_URL}/${params.id}`);
    return { cocktail: data.data };
  } catch (error) {
    return redirect('/');
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  
  // Parse ingredients from comma-separated string
  const ingredientsArray = data.ingredients
    .split(',')
    .map(ing => ing.trim())
    .filter(ing => ing)
    .map(ing => ({ name: ing, measure: '' }));

  const updateData = {
    name: data.name,
    category: data.category,
    alcoholic: data.alcoholic,
    glass: data.glass,
    instructions: data.instructions,
    image: data.image,
    ingredients: ingredientsArray,
  };

  try {
    await axios.put(`${API_URL}/${params.id}`, updateData);
    return redirect('/');
  } catch (error) {
    return { error: error.message };
  }
};

const EditCocktail = () => {
  const { cocktail } = useLoaderData();
  const navigate = useNavigate();
  
  const ingredientsList = cocktail.ingredients
    .map(ing => ing.ingredient.name)
    .join(', ');

  return (
    <Wrapper>
      <div className='form-container'>
        <Form method='post' className='form'>
          <h2>Edit Cocktail</h2>
          
          <div className='form-row'>
            <label htmlFor='name' className='form-label'>
              Name
            </label>
            <input
              type='text'
              name='name'
              id='name'
              className='form-input'
              defaultValue={cocktail.name}
              required
            />
          </div>

          <div className='form-row'>
            <label htmlFor='category' className='form-label'>
              Category
            </label>
            <input
              type='text'
              name='category'
              id='category'
              className='form-input'
              defaultValue={cocktail.category}
              required
            />
          </div>

          <div className='form-row'>
            <label htmlFor='alcoholic' className='form-label'>
              Alcoholic
            </label>
            <select
              name='alcoholic'
              id='alcoholic'
              className='form-input'
              defaultValue={cocktail.alcoholic}
              required
            >
              <option value='Alcoholic'>Alcoholic</option>
              <option value='Non alcoholic'>Non Alcoholic</option>
            </select>
          </div>

          <div className='form-row'>
            <label htmlFor='glass' className='form-label'>
              Glass Type
            </label>
            <input
              type='text'
              name='glass'
              id='glass'
              className='form-input'
              defaultValue={cocktail.glass}
              required
            />
          </div>

          <div className='form-row'>
            <label htmlFor='ingredients' className='form-label'>
              Ingredients (comma-separated)
            </label>
            <input
              type='text'
              name='ingredients'
              id='ingredients'
              className='form-input'
              defaultValue={ingredientsList}
              placeholder='Tequila, Lime Juice, Salt'
              required
            />
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
              defaultValue={cocktail.image}
            />
          </div>

          <div className='form-row'>
            <label htmlFor='instructions' className='form-label'>
              Instructions
            </label>
            <textarea
              name='instructions'
              id='instructions'
              className='form-textarea'
              rows='6'
              defaultValue={cocktail.instructions}
              required
            />
          </div>

          <div className='button-row'>
            <button type='submit' className='btn btn-block'>
              Save Changes
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

export default EditCocktail;
