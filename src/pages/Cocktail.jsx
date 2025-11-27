import { useState } from 'react';
import { useLoaderData, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Wrapper from '../assets/wrappers/CocktailPage';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { COCKTAIL_API_URL } from '../config';

const singleCocktailUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

import { useQuery } from '@tanstack/react-query';

const singleCocktailQuery = (id) => {
  return {
    queryKey: ['cocktail', id],
    queryFn: async () => {
      const { data } = await axios.get(`${singleCocktailUrl}${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;
    await queryClient.ensureQueryData(singleCocktailQuery(id));
    return { id };
  };

const Cocktail = () => {
  const { id } = useLoaderData();
  const navigate = useNavigate();
  const { data } = useQuery(singleCocktailQuery(id));
  
  const [editingField, setEditingField] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  
  if (!data) return <Navigate to='/' />;

  const singleDrink = data.drinks[0];

  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strCategory: category,
    strGlass: glass,
    strInstructions: instructions,
  } = singleDrink;

  const validIngredients = Object.keys(singleDrink)
    .filter(
      (key) => key.startsWith('strIngredient') && singleDrink[key] !== null
    )
    .map((key) => singleDrink[key]);

  // Initialize edited data if empty
  if (Object.keys(editedData).length === 0) {
    setEditedData({
      name,
      category,
      info,
      glass,
      instructions,
      ingredients: validIngredients.join(', '),
    });
  }

  const handleDoubleClick = (field) => {
    setEditingField(field);
  };

  const handleBlur = () => {
    setEditingField(null);
  };

  const handleChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value,
    }));
    setHasChanges(true);
  };

  const handleKeyDown = (e, field) => {
    if (e.key === 'Enter' && field !== 'instructions') {
      e.preventDefault();
      setEditingField(null);
    } else if (e.key === 'Escape') {
      setEditingField(null);
      setEditedData({
        name,
        category,
        info,
        glass,
        instructions,
        ingredients: validIngredients.join(', '),
      });
      setHasChanges(false);
    }
  };

  const handleSave = async () => {
    try {
      const ingredientsArray = editedData.ingredients
        .split(',')
        .map(ing => ing.trim())
        .filter(ing => ing)
        .map(ing => ({ name: ing, measure: '' }));

      const cocktailData = {
        name: editedData.name,
        category: editedData.category,
        alcoholic: editedData.info,
        glass: editedData.glass,
        instructions: editedData.instructions,
        image: image,
        ingredients: ingredientsArray,
      };

      // Save to your database
      await axios.post(COCKTAIL_API_URL, cocktailData);
      
      toast.success('Cocktail saved to your database!');
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving cocktail:', error);
      toast.error('Failed to save cocktail. Make sure the backend server is running.');
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  return (
    <StyledWrapper>
      <Wrapper>
        <header>
          <button onClick={() => navigate(-1)} className='btn'>
            back home
          </button>
          <h3 
            className={editingField === 'name' ? 'editing' : 'editable-title'}
            onDoubleClick={() => handleDoubleClick('name')}
            title='Double-click to edit'
          >
            {editingField === 'name' ? (
              <input
                type='text'
                className='title-input'
                value={editedData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                onBlur={handleBlur}
                onKeyDown={(e) => handleKeyDown(e, 'name')}
                autoFocus
              />
            ) : (
              editedData.name
            )}
          </h3>
          <div className='btn-group'>
            <button onClick={handleShare} className='btn btn-share'>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M8.59 13.51L15.42 17.49" stroke="currentColor" strokeWidth="2"/>
                <path d="M15.41 6.51L8.59 10.49" stroke="currentColor" strokeWidth="2"/>
              </svg>
              share
            </button>
            <button 
              onClick={handleSave} 
              className={`btn ${hasChanges ? 'btn-success' : ''}`}
              disabled={!hasChanges}
            >
              save
            </button>
          </div>
        </header>
        <div className='drink'>
          <img src={image} alt={name} className='img' />
          <div className='drink-info'>
            <p>
              <span className='drink-data'>name :</span>
              <span 
                className={`editable-field ${editingField === 'name-detail' ? 'editing' : ''}`}
                onDoubleClick={() => handleDoubleClick('name-detail')}
                title='Double-click to edit'
              >
                {editingField === 'name-detail' ? (
                  <input
                    type='text'
                    className='editable-input'
                    value={editedData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={(e) => handleKeyDown(e, 'name-detail')}
                    autoFocus
                  />
                ) : (
                  editedData.name
                )}
              </span>
            </p>
            <p>
              <span className='drink-data'>category :</span>
              <span 
                className={`editable-field ${editingField === 'category' ? 'editing' : ''}`}
                onDoubleClick={() => handleDoubleClick('category')}
                title='Double-click to edit'
              >
                {editingField === 'category' ? (
                  <input
                    type='text'
                    className='editable-input'
                    value={editedData.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={(e) => handleKeyDown(e, 'category')}
                    autoFocus
                  />
                ) : (
                  editedData.category
                )}
              </span>
            </p>
            <p>
              <span className='drink-data'>info :</span>
              <span 
                className={`editable-field ${editingField === 'info' ? 'editing' : ''}`}
                onDoubleClick={() => handleDoubleClick('info')}
                title='Double-click to edit'
              >
                {editingField === 'info' ? (
                  <select
                    className='editable-select'
                    value={editedData.info}
                    onChange={(e) => handleChange('info', e.target.value)}
                    onBlur={handleBlur}
                    autoFocus
                  >
                    <option value='Alcoholic'>Alcoholic</option>
                    <option value='Non alcoholic'>Non Alcoholic</option>
                  </select>
                ) : (
                  editedData.info
                )}
              </span>
            </p>
            <p>
              <span className='drink-data'>glass :</span>
              <span 
                className={`editable-field ${editingField === 'glass' ? 'editing' : ''}`}
                onDoubleClick={() => handleDoubleClick('glass')}
                title='Double-click to edit'
              >
                {editingField === 'glass' ? (
                  <input
                    type='text'
                    className='editable-input'
                    value={editedData.glass}
                    onChange={(e) => handleChange('glass', e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={(e) => handleKeyDown(e, 'glass')}
                    autoFocus
                  />
                ) : (
                  editedData.glass
                )}
              </span>
            </p>
            <p>
              <span className='drink-data'>ingredients :</span>
              <span 
                className={`editable-field ${editingField === 'ingredients' ? 'editing' : ''}`}
                onDoubleClick={() => handleDoubleClick('ingredients')}
                title='Double-click to edit'
              >
                {editingField === 'ingredients' ? (
                  <input
                    type='text'
                    className='editable-input wide'
                    value={editedData.ingredients}
                    onChange={(e) => handleChange('ingredients', e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={(e) => handleKeyDown(e, 'ingredients')}
                    placeholder='Comma-separated ingredients'
                    autoFocus
                  />
                ) : (
                  editedData.ingredients
                )}
              </span>
            </p>
            <p className='instructions-container'>
              <span className='drink-data'>instructions :</span>
              <span 
                className={`editable-field ${editingField === 'instructions' ? 'editing' : ''}`}
                onDoubleClick={() => handleDoubleClick('instructions')}
                title='Double-click to edit'
              >
                {editingField === 'instructions' ? (
                  <textarea
                    className='editable-textarea'
                    value={editedData.instructions}
                    onChange={(e) => handleChange('instructions', e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={(e) => handleKeyDown(e, 'instructions')}
                    rows='5'
                    autoFocus
                  />
                ) : (
                  editedData.instructions
                )}
              </span>
            </p>
          </div>
        </div>
      </Wrapper>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .editable-field {
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    transition: all 0.3s ease;
    display: inline-block;
  }

  .editable-field:hover {
    background: rgba(168, 85, 247, 0.15);
    outline: 1px dashed rgba(168, 85, 247, 0.5);
    color: var(--grey-100);
  }

  .editable-title {
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    transition: all 0.3s ease;
  }

  .editable-title:hover {
    background: rgba(168, 85, 247, 0.15);
    outline: 1px dashed rgba(168, 85, 247, 0.5);
  }

  .title-input {
    width: 100%;
    font-size: inherit;
    font-weight: inherit;
    padding: 0.25rem 0.5rem;
    border: 2px solid var(--primary-500);
    border-radius: var(--borderRadius);
    background: var(--grey-50);
  }

  .editable-input,
  .editable-select,
  .editable-textarea {
    padding: 0.5rem;
    border: 2px solid var(--primary-500);
    border-radius: var(--borderRadius);
    font-size: 1rem;
    background: var(--grey-50);
    width: auto;
    min-width: 200px;
  }

  .editable-input.wide {
    width: 100%;
    max-width: 500px;
    display: block;
    margin-top: 0.5rem;
  }

  .editable-textarea {
    width: 100%;
    display: block;
    margin-top: 0.5rem;
    font-family: inherit;
    resize: vertical;
  }

  .editable-select {
    cursor: pointer;
  }

  .instructions-container {
    display: block;
  }

  .instructions-container .editable-field {
    display: block;
    width: 100%;
  }

  .btn-success {
    background: var(--green-dark);
  }

  .btn-success:hover {
    background: var(--green-light);
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .btn-group {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  
  .btn-share {
    background: linear-gradient(135deg, rgba(14, 165, 233, 0.8) 0%, rgba(6, 182, 212, 0.8) 100%);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .btn-share:hover {
    box-shadow: 0 0 40px rgba(14, 165, 233, 0.8);
  }

  @media (max-width: 768px) {
    header {
      flex-direction: column;
      align-items: stretch;
    }
    
    .btn-group {
      flex-direction: column;
    }
  }
`;

export default Cocktail;
