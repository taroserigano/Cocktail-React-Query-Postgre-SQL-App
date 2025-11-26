#!/bin/bash

# Mixmaster API Test Script
# Tests all CRUD operations

BASE_URL="http://localhost:5000/api"

echo "🧪 Testing Mixmaster API CRUD Operations"
echo "=========================================="
echo ""

# Test 1: Health Check
echo "1️⃣  Testing Health Check..."
curl -s $BASE_URL/health | grep -q "ok" && echo "✅ Health check passed" || echo "❌ Health check failed"
echo ""

# Test 2: Create Cocktail
echo "2️⃣  Creating 'Vampiro' cocktail..."
CREATE_RESPONSE=$(curl -s -X POST $BASE_URL/cocktails \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Vampiro",
    "category": "Ordinary Drink",
    "alcoholic": "Alcoholic",
    "glass": "Old-Fashioned glass",
    "instructions": "Mix tequila with tomato juice and citrus juices. Rim glass with salt.",
    "image": "https://www.thecocktaildb.com/images/media/drink/yfhn371504374246.jpg",
    "ingredients": [
      { "name": "Tequila", "measure": "2 oz" },
      { "name": "Tomato Juice", "measure": "3 oz" },
      { "name": "Orange Juice", "measure": "1 oz" },
      { "name": "Lime Juice", "measure": "1 oz" },
      { "name": "Sugar Syrup", "measure": "1 tsp" },
      { "name": "Salt", "measure": "to taste" }
    ]
  }')

COCKTAIL_ID=$(echo $CREATE_RESPONSE | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -n "$COCKTAIL_ID" ]; then
  echo "✅ Cocktail created successfully"
  echo "   ID: $COCKTAIL_ID"
else
  echo "❌ Failed to create cocktail"
  exit 1
fi
echo ""

# Test 3: Get All Cocktails
echo "3️⃣  Getting all cocktails..."
ALL_COCKTAILS=$(curl -s $BASE_URL/cocktails)
COUNT=$(echo $ALL_COCKTAILS | grep -o '"name":"Vampiro"' | wc -l)

if [ $COUNT -gt 0 ]; then
  echo "✅ Retrieved all cocktails (found Vampiro)"
else
  echo "❌ Failed to retrieve cocktails"
fi
echo ""

# Test 4: Get Single Cocktail
echo "4️⃣  Getting single cocktail by ID..."
SINGLE=$(curl -s $BASE_URL/cocktails/$COCKTAIL_ID | grep -o '"name":"Vampiro"')

if [ -n "$SINGLE" ]; then
  echo "✅ Retrieved single cocktail successfully"
else
  echo "❌ Failed to retrieve single cocktail"
fi
echo ""

# Test 5: Update Cocktail
echo "5️⃣  Updating cocktail name to 'Vampiro Especial'..."
UPDATE_RESPONSE=$(curl -s -X PUT $BASE_URL/cocktails/$COCKTAIL_ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Vampiro Especial",
    "category": "Cocktail",
    "alcoholic": "Alcoholic",
    "glass": "Highball glass",
    "instructions": "Updated instructions: Mix all ingredients with ice.",
    "image": "https://www.thecocktaildb.com/images/media/drink/yfhn371504374246.jpg",
    "ingredients": [
      { "name": "Tequila", "measure": "3 oz" },
      { "name": "Tomato Juice", "measure": "4 oz" }
    ]
  }')

UPDATED_NAME=$(echo $UPDATE_RESPONSE | grep -o '"name":"Vampiro Especial"')

if [ -n "$UPDATED_NAME" ]; then
  echo "✅ Cocktail updated successfully"
else
  echo "❌ Failed to update cocktail"
fi
echo ""

# Test 6: Search by name
echo "6️⃣  Searching for 'Vampiro'..."
SEARCH_RESULT=$(curl -s "$BASE_URL/cocktails?search=Vampiro" | grep -o '"name":"Vampiro Especial"')

if [ -n "$SEARCH_RESULT" ]; then
  echo "✅ Search functionality working"
else
  echo "❌ Search failed"
fi
echo ""

# Test 7: Delete Cocktail
echo "7️⃣  Deleting cocktail..."
DELETE_RESPONSE=$(curl -s -X DELETE $BASE_URL/cocktails/$COCKTAIL_ID | grep -o '"success":true')

if [ -n "$DELETE_RESPONSE" ]; then
  echo "✅ Cocktail deleted successfully"
else
  echo "❌ Failed to delete cocktail"
fi
echo ""

# Test 8: Verify Deletion
echo "8️⃣  Verifying deletion..."
VERIFY=$(curl -s $BASE_URL/cocktails/$COCKTAIL_ID | grep -o '"error":"Cocktail not found"')

if [ -n "$VERIFY" ]; then
  echo "✅ Verified - cocktail no longer exists"
else
  echo "❌ Verification failed - cocktail still exists"
fi
echo ""

echo "=========================================="
echo "🎉 All CRUD operations completed!"
echo "=========================================="
