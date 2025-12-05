import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Wrapper from '../assets/wrappers/CocktailPage';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

const API_URL = 'http://localhost:5000/api/cocktails';

export const loader = async ({ params }) => {
  try {
    const { data } = await axios.get(`${API_URL}/${params.id}`);
    return { cocktail: data.data };
  } catch (error) {
    throw new Response('Cocktail not found', { status: 404 });
  }
};

const MyCocktail = () => {
  const { cocktail: initialCocktail } = useLoaderData();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [cocktail, setCocktail] = useState(initialCocktail);
  const [editingField, setEditingField] = useState(null);
  const [editedData, setEditedData] = useState({
    name: cocktail.name,
    category: cocktail.category,
    alcoholic: cocktail.alcoholic,
    glass: cocktail.glass,
    instructions: cocktail.instructions,
    ingredients: cocktail.ingredients.map(ing => ing.ingredient.name).join(', '),
  });
  const [hasChanges, setHasChanges] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this cocktail?')) {
      return;
    }
    
    try {
      await axios.delete(`${API_URL}/${cocktail.id}`);
      // Invalidate all search queries to refresh the cocktail list
      queryClient.invalidateQueries({ queryKey: ['search'] });
      toast.success('Cocktail deleted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error deleting cocktail:', error);
      toast.error('Failed to delete cocktail');
    }
  };

  const handleDoubleClick = (field) => {
    setEditingField(field);
  };

  const handleBlur = (field) => {
    setEditingField(null);
  };

  const handleSave = async () => {
    try {
      const ingredientsArray = editedData.ingredients
        .split(',')
        .map(ing => ing.trim())
        .filter(ing => ing)
        .map(ing => ({ name: ing, measure: '' }));

      const updateData = {
        name: editedData.name,
        category: editedData.category,
        alcoholic: editedData.alcoholic,
        glass: editedData.glass,
        instructions: editedData.instructions,
        image: cocktail.image,
        ingredients: ingredientsArray,
      };

      const { data } = await axios.put(`${API_URL}/${cocktail.id}`, updateData);
      setCocktail(data.data);
      setEditedData({
        name: data.data.name,
        category: data.data.category,
        alcoholic: data.data.alcoholic,
        glass: data.data.glass,
        instructions: data.data.instructions,
        ingredients: data.data.ingredients.map(ing => ing.ingredient.name).join(', '),
      });
      setHasChanges(false);
      toast.success('Cocktail updated successfully!');
    } catch (error) {
      console.error('Error updating cocktail:', error);
      toast.error('Failed to update cocktail');
    }
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
      setEditedData(prev => ({
        ...prev,
        [field]: cocktail[field] || cocktail.ingredients.map(ing => ing.ingredient.name).join(', '),
      }));
      setHasChanges(false);
    }
  };

  return (
    <StyledWrapper>
      <Wrapper>
        <header>
          <button onClick={() => navigate('/my-cocktails')} className='btn'>
            back to my cocktails
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
                onBlur={() => handleBlur('name')}
                onKeyDown={(e) => handleKeyDown(e, 'name')}
                autoFocus
              />
            ) : (
              editedData.name
            )}
          </h3>
          <div className='action-buttons'>
            <button 
              onClick={handleSave} 
              className={`btn ${hasChanges ? 'btn-success' : ''}`}
              disabled={!hasChanges}
            >
              save
            </button>
            <button onClick={handleDelete} className='btn btn-hipster'>
              delete
            </button>
          </div>
        </header>
        <div className='drink'>
          <img src={cocktail.image} alt={cocktail.name} className='img' />
          <div className='drink-info'>
            {/* Name */}
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
                    onBlur={() => handleBlur('name-detail')}
                    onKeyDown={(e) => handleKeyDown(e, 'name-detail')}
                    autoFocus
                  />
                ) : (
                  editedData.name
                )}
              </span>
            </p>

            {/* Category */}
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
                    onBlur={() => handleBlur('category')}
                    onKeyDown={(e) => handleKeyDown(e, 'category')}
                    autoFocus
                  />
                ) : (
                  editedData.category
                )}
              </span>
            </p>

            {/* Alcoholic */}
            <p>
              <span className='drink-data'>info :</span>
              <span 
                className={`editable-field ${editingField === 'alcoholic' ? 'editing' : ''}`}
                onDoubleClick={() => handleDoubleClick('alcoholic')}
                title='Double-click to edit'
              >
                {editingField === 'alcoholic' ? (
                  <select
                    className='editable-select'
                    value={editedData.alcoholic}
                    onChange={(e) => handleChange('alcoholic', e.target.value)}
                    onBlur={() => handleBlur('alcoholic')}
                    autoFocus
                  >
                    <option value='Alcoholic'>Alcoholic</option>
                    <option value='Non alcoholic'>Non Alcoholic</option>
                  </select>
                ) : (
                  editedData.alcoholic
                )}
              </span>
            </p>

            {/* Glass */}
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
                    onBlur={() => handleBlur('glass')}
                    onKeyDown={(e) => handleKeyDown(e, 'glass')}
                    autoFocus
                  />
                ) : (
                  editedData.glass
                )}
              </span>
            </p>

            {/* Ingredients */}
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
                    onBlur={() => handleBlur('ingredients')}
                    onKeyDown={(e) => handleKeyDown(e, 'ingredients')}
                    placeholder='Comma-separated ingredients'
                    autoFocus
                  />
                ) : (
                  editedData.ingredients
                )}
              </span>
            </p>

            {/* Instructions */}
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
                    onBlur={() => handleBlur('instructions')}
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

  .action-buttons {
    display: flex;
    gap: 0.5rem;
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

    .action-buttons {
      width: 100%;
    }

    .action-buttons button {
      flex: 1;
    }
  }
`;

export default MyCocktail;
