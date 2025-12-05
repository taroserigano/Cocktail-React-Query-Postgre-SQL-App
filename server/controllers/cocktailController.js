import prisma from '../prisma/client.js';

// Get all cocktails
export const getAllCocktails = async (req, res) => {
  try {
    const { search, category } = req.query;
    
    const where = {};
    
    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive',
      };
    }
    
    if (category) {
      where.category = category;
    }

    const cocktails = await prisma.cocktail.findMany({
      where,
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    res.json({ success: true, data: cocktails });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get single cocktail by ID
export const getCocktailById = async (req, res) => {
  try {
    const { id } = req.params;

    const cocktail = await prisma.cocktail.findUnique({
      where: { id },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });

    if (!cocktail) {
      return res.status(404).json({ success: false, error: 'Cocktail not found' });
    }

    res.json({ success: true, data: cocktail });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create a new cocktail
export const createCocktail = async (req, res) => {
  try {
    const { name, category, alcoholic, glass, instructions, image, ingredients } = req.body;

    console.log('Creating cocktail:', { name, category, alcoholic, glass, ingredients });

    // Validate required fields
    if (!name || !category || !alcoholic || !glass || !instructions) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    // Validate ingredients
    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'At least one ingredient is required' 
      });
    }

    // Check if cocktail with this name already exists
    const existingCocktail = await prisma.cocktail.findUnique({
      where: { name: name.trim() }
    });

    if (existingCocktail) {
      return res.status(409).json({ 
        success: false, 
        error: `A cocktail named "${name}" already exists. Please use a different name.` 
      });
    }

    // Create cocktail with ingredients
    const cocktail = await prisma.cocktail.create({
      data: {
        name: name.trim(),
        category,
        alcoholic,
        glass,
        instructions,
        image: image || 'https://www.thecocktaildb.com/images/media/drink/default.jpg',
        ingredients: {
          create: ingredients.map((ing) => ({
            measure: ing.measure || '',
            ingredient: {
              connectOrCreate: {
                where: { name: ing.name },
                create: { name: ing.name },
              },
            },
          })),
        },
      },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });

    console.log('Cocktail created successfully:', cocktail.id);
    res.status(201).json({ success: true, data: cocktail });
  } catch (error) {
    console.error('Error creating cocktail:', error);
    
    // Handle Prisma unique constraint errors
    if (error.code === 'P2002') {
      return res.status(409).json({ 
        success: false, 
        error: 'A cocktail with this name already exists. Please use a different name.' 
      });
    }
    
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a cocktail
export const updateCocktail = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, alcoholic, glass, instructions, image, ingredients } = req.body;

    // Delete existing ingredient relationships
    await prisma.cocktailIngredient.deleteMany({
      where: { cocktailId: id },
    });

    // Update cocktail with new ingredients
    const cocktail = await prisma.cocktail.update({
      where: { id },
      data: {
        name,
        category,
        alcoholic,
        glass,
        instructions,
        image,
        ingredients: {
          create: ingredients?.map((ing) => ({
            measure: ing.measure,
            ingredient: {
              connectOrCreate: {
                where: { name: ing.name },
                create: { name: ing.name },
              },
            },
          })) || [],
        },
      },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });

    res.json({ success: true, data: cocktail });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a cocktail
export const deleteCocktail = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.cocktail.delete({
      where: { id },
    });

    res.json({ success: true, message: 'Cocktail deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all unique categories
export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.cocktail.findMany({
      select: {
        category: true,
      },
      distinct: ['category'],
    });

    res.json({ success: true, data: categories.map(c => c.category) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
