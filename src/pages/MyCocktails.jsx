import { useState } from 'react';
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
    return redirect('/');
  } catch (error) {
    console.error('Error creating cocktail:', error.response?.data || error.message);
    toast.error(error.response?.data?.error || 'Failed to create cocktail');
    return { error: error.response?.data?.error || error.message };
  }
};

const MyCocktails = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageData, setImageData] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image too large. Please use an image under 2MB.');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setImagePreview(base64String);
      setImageData(base64String);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageData('');
    document.getElementById('imageUpload').value = '';
  };

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4>Create New Cocktail</h4>
          
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
              Ingredients *
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
              Cocktail Image
            </label>
            <div className='image-upload-container'>
              <input
                type='file'
                id='imageUpload'
                accept='image/*'
                onChange={handleImageUpload}
                className='file-input'
              />
              <label htmlFor='imageUpload' className='upload-btn'>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="17 8 12 3 7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Upload Image
              </label>
              <span className='upload-hint'>or enter URL below</span>
            </div>
            
            {imagePreview && (
              <div className='image-preview'>
                <img src={imagePreview} alt='Preview' />
                <button type='button' onClick={removeImage} className='remove-btn'>
                  ✕
                </button>
              </div>
            )}
            
            <input
              type='text'
              name='image'
              id='image'
              className='form-input'
              placeholder='Or paste image URL here'
              value={imageData}
              onChange={(e) => {
                setImageData(e.target.value);
                setImagePreview(e.target.value);
              }}
            />
            <small>Upload an image (max 2MB) or paste a URL</small>
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
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 10rem);

  .form {
    max-width: 600px;
    width: 90vw;
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(30px);
    padding: 3rem;
    border-radius: var(--borderRadiusXL);
    border: 2px solid rgba(168, 85, 247, 0.3);
    box-shadow: 0 0 60px rgba(168, 85, 247, 0.3),
                0 8px 32px rgba(0, 0, 0, 0.5);
    position: relative;
    overflow: hidden;
  }

  .form::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--neon-purple), var(--primary-500), var(--accent-500), var(--neon-blue));
    background-size: 300% auto;
    animation: shimmer 4s linear infinite;
  }

  h4 {
    text-align: center;
    margin-bottom: 2rem;
  }

  .form-row {
    margin-bottom: 1rem;
  }

  .form-label {
    display: block;
    font-size: var(--smallText);
    margin-bottom: 0.5rem;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
  }

  .form-input,
  .form-textarea {
    width: 100%;
    padding: 0.375rem 0.75rem;
    border-radius: var(--borderRadius);
    background: var(--backgroundColor);
    border: 1px solid var(--grey-200);
  }

  .form-input,
  .form-textarea {
    height: 35px;
  }

  .form-textarea {
    height: auto;
    resize: vertical;
  }
  
  .btn-block {
    height: auto;
    padding: 0.75rem 1.5rem;
  }

  small {
    display: block;
    margin-top: 0.25rem;
    color: var(--grey-500);
    font-size: 0.75rem;
  }

  .image-upload-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .file-input {
    display: none;
  }

  .upload-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1.25rem;
    background: linear-gradient(135deg, var(--primary-600) 0%, var(--accent-600) 100%);
    border: 2px solid rgba(168, 85, 247, 0.4);
    border-radius: var(--borderRadius);
    color: var(--white);
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .upload-btn:hover {
    box-shadow: 0 0 30px rgba(168, 85, 247, 0.6);
    transform: translateY(-2px);
  }

  .upload-hint {
    color: var(--grey-500);
    font-size: 0.85rem;
    font-style: italic;
  }

  .image-preview {
    position: relative;
    width: 100%;
    max-width: 300px;
    margin: 1rem 0;
    border-radius: var(--borderRadius);
    overflow: hidden;
    border: 2px solid rgba(168, 85, 247, 0.3);
  }

  .image-preview img {
    width: 100%;
    height: auto;
    display: block;
  }

  .remove-btn {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: rgba(239, 68, 68, 0.9);
    border: 2px solid var(--white);
    color: var(--white);
    font-size: 1.2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  .remove-btn:hover {
    background: rgba(220, 38, 38, 1);
    transform: scale(1.1);
  }

  .button-row {
    display: grid;
    gap: 1rem;
    margin-top: 0.5rem;
  }

  @media (min-width: 768px) {
    .button-row {
      grid-template-columns: 1fr 1fr;
    }
  }
`;

export default MyCocktails;
