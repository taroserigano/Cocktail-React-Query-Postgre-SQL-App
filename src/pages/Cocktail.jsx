import { useState } from 'react';
import { useLoaderData, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Wrapper from '../assets/wrappers/CocktailPage';
import styled from 'styled-components';
import { toast } from 'react-toastify';

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
      await axios.post('http://localhost:5000/api/cocktails', cocktailData);
      
      toast.success('Cocktail saved to your database!');
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving cocktail:', error);
      toast.error('Failed to save cocktail. Make sure the backend server is running.');
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
          <button 
            onClick={handleSave} 
            className={`btn ${hasChanges ? 'btn-success' : ''}`}
            disabled={!hasChanges}
          >
            save
          </button>
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
    transition: background 0.2s;
    display: inline-block;
  }

  .editable-field:hover {
    background: var(--grey-100);
    outline: 1px dashed var(--grey-400);
  }

  .editable-title {
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    transition: background 0.2s;
  }

  .editable-title:hover {
    background: var(--grey-100);
    outline: 1px dashed var(--grey-400);
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

  @media (max-width: 768px) {
    header {
      flex-direction: column;
      align-items: stretch;
    }
  }
`;

export default Cocktail;
