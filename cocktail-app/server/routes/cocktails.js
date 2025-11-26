import express from 'express';
import {
  getAllCocktails,
  getCocktailById,
  createCocktail,
  updateCocktail,
  deleteCocktail,
  getCategories,
} from '../controllers/cocktailController.js';

const router = express.Router();

router.get('/', getAllCocktails);
router.get('/categories', getCategories);
router.get('/:id', getCocktailById);
router.post('/', createCocktail);
router.put('/:id', updateCocktail);
router.delete('/:id', deleteCocktail);

export default router;
