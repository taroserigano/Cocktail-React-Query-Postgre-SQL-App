# Mixmaster Backend API

Backend server for managing cocktails with full CRUD operations.

## Server URL
`http://localhost:5000`

## API Endpoints

### Get all cocktails
```bash
GET /api/cocktails
# With search
GET /api/cocktails?search=margarita
# With category filter
GET /api/cocktails?category=Ordinary Drink
```

### Get single cocktail
```bash
GET /api/cocktails/:id
```

### Create a cocktail
```bash
POST /api/cocktails
Content-Type: application/json

{
  "name": "Vampiro",
  "category": "Ordinary Drink",
  "alcoholic": "Alcoholic",
  "glass": "Old-Fashioned glass",
  "instructions": "Vampiros may be made in a tall glass or an old fashioned glass. Bartenders may first 'rim' the glass with Kosher Salt...",
  "image": "https://example.com/vampiro.jpg",
  "ingredients": [
    { "name": "Tequila", "measure": "2 oz" },
    { "name": "Tomato Juice", "measure": "3 oz" },
    { "name": "Orange Juice", "measure": "1 oz" },
    { "name": "Lime Juice", "measure": "1 oz" },
    { "name": "Sugar Syrup", "measure": "1 tsp" },
    { "name": "Salt", "measure": "to taste" }
  ]
}
```

### Update a cocktail
```bash
PUT /api/cocktails/:id
Content-Type: application/json

{
  "name": "Updated Vampiro",
  "category": "Ordinary Drink",
  ...
}
```

### Delete a cocktail
```bash
DELETE /api/cocktails/:id
```

### Get categories
```bash
GET /api/cocktails/categories
```

## Example: Create Vampiro Cocktail

```bash
curl -X POST http://localhost:5000/api/cocktails \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Vampiro",
    "category": "Ordinary Drink",
    "alcoholic": "Alcoholic",
    "glass": "Old-Fashioned glass",
    "instructions": "Vampiros may be made in a tall glass or an old fashioned glass. Bartenders may first \"rim\" the glass with Kosher Salt, which is done by placing a layer of Kosher Salt on a chopping board, moistening the glass'\'' rim with lime juice or water, and then placing the upside down glass rim onto the Kosher Salt, so that the salt sticks to the moistened rim. The second step is to fill half the glass with ice and add one or two shooter glasses full of high quality Tequila. The next stage is to add the flavouring elements. This is done by squeezing a fresh lime into the glass, adding a few grains of salt, adding citrus-flavoured soda pop, until the glass is 4/5 full, and then adding spicy Viuda de Sanchez (or orange juice, lime juice and pico de gallo). The final step is to stir the ingredients so that the flavours are properly blended.",
    "image": "https://www.thecocktaildb.com/images/media/drink/yfhn371504374246.jpg",
    "ingredients": [
      { "name": "Tequila", "measure": "2 oz" },
      { "name": "Tomato Juice", "measure": "3 oz" },
      { "name": "Orange Juice", "measure": "1 oz" },
      { "name": "Lime Juice", "measure": "1 oz" },
      { "name": "Sugar Syrup", "measure": "1 tsp" },
      { "name": "Salt", "measure": "to taste" }
    ]
  }'
```

## Setup Commands

```bash
# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Start server
npm run dev

# Open Prisma Studio (Database GUI)
npx prisma studio
```
