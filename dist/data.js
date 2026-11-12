// Approximate shelf lives are suggestions for the app's editable expiry dates.
// Users should prefer the date printed on their packaging.
const grocery = (id, name, category, emoji, shelfLife, unit, perishable = true) => ({
  id, name, category, emoji, shelfLife, unit, perishable,
});

export const GROCERY_CATALOG = [
  grocery('avocado', 'Avocado', 'Produce', '🥑', 4, 'pcs'),
  grocery('spinach', 'Spinach', 'Produce', '🥬', 4, 'g'),
  grocery('tomato', 'Tomatoes', 'Produce', '🍅', 6, 'pcs'),
  grocery('banana', 'Bananas', 'Produce', '🍌', 5, 'pcs'),
  grocery('strawberry', 'Strawberries', 'Produce', '🍓', 3, 'g'),
  grocery('blueberry', 'Blueberries', 'Produce', '🫐', 6, 'g'),
  grocery('apple', 'Apples', 'Produce', '🍎', 14, 'pcs'),
  grocery('orange', 'Oranges', 'Produce', '🍊', 14, 'pcs'),
  grocery('lemon', 'Lemons', 'Produce', '🍋', 14, 'pcs'),
  grocery('lime', 'Limes', 'Produce', '🍋', 14, 'pcs'),
  grocery('broccoli', 'Broccoli', 'Produce', '🥦', 5, 'pcs'),
  grocery('carrot', 'Carrots', 'Produce', '🥕', 14, 'pcs'),
  grocery('cucumber', 'Cucumber', 'Produce', '🥒', 7, 'pcs'),
  grocery('bell-pepper', 'Bell peppers', 'Produce', '🫑', 7, 'pcs'),
  grocery('potato', 'Potatoes', 'Produce', '🥔', 21, 'pcs'),
  grocery('sweet-potato', 'Sweet potatoes', 'Produce', '🍠', 21, 'pcs'),
  grocery('onion', 'Onions', 'Produce', '🧅', 30, 'pcs'),
  grocery('garlic', 'Garlic', 'Produce', '🧄', 30, 'pcs'),
  grocery('mushroom', 'Mushrooms', 'Produce', '🍄', 5, 'g'),
  grocery('lettuce', 'Lettuce', 'Produce', '🥬', 5, 'pcs'),
  grocery('zucchini', 'Zucchini', 'Produce', '🥒', 5, 'pcs'),
  grocery('cabbage', 'Cabbage', 'Produce', '🥬', 10, 'pcs'),
  grocery('cauliflower', 'Cauliflower', 'Produce', '🥦', 5, 'pcs'),
  grocery('pumpkin', 'Pumpkin', 'Produce', '🎃', 7, 'g'),
  grocery('ginger', 'Ginger', 'Produce', '🫚', 21, 'g'),
  grocery('basil', 'Fresh basil', 'Produce', '🌿', 4, 'g'),
  grocery('cilantro', 'Fresh cilantro', 'Produce', '🌿', 5, 'g'),
  grocery('parsley', 'Fresh parsley', 'Produce', '🌿', 7, 'g'),
  grocery('pear', 'Pears', 'Produce', '🍐', 6, 'pcs'),
  grocery('grape', 'Grapes', 'Produce', '🍇', 7, 'g'),
  grocery('mango', 'Mangoes', 'Produce', '🥭', 5, 'pcs'),
  grocery('milk', 'Milk', 'Dairy', '🥛', 7, 'ml'),
  grocery('yogurt', 'Plain yogurt', 'Dairy', '🥣', 7, 'g'),
  grocery('greek-yogurt', 'Greek yogurt', 'Dairy', '🥣', 7, 'g'),
  grocery('cheddar', 'Cheddar cheese', 'Dairy', '🧀', 14, 'g'),
  grocery('mozzarella', 'Fresh mozzarella', 'Dairy', '🧀', 5, 'g'),
  grocery('parmesan', 'Parmesan', 'Dairy', '🧀', 21, 'g'),
  grocery('butter', 'Butter', 'Dairy', '🧈', 30, 'g'),
  grocery('cream', 'Cream', 'Dairy', '🥛', 5, 'ml'),
  grocery('feta', 'Feta cheese', 'Dairy', '🧀', 7, 'g'),
  grocery('cream-cheese', 'Cream cheese', 'Dairy', '🧀', 10, 'g'),
  grocery('egg', 'Eggs', 'Protein', '🥚', 21, 'pcs'),
  grocery('chicken', 'Chicken breast', 'Protein', '🍗', 2, 'g'),
  grocery('salmon', 'Salmon', 'Protein', '🐟', 2, 'g'),
  grocery('shrimp', 'Raw shrimp', 'Protein', '🦐', 2, 'g'),
  grocery('ground-beef', 'Ground beef', 'Protein', '🥩', 2, 'g'),
  grocery('tofu', 'Tofu', 'Protein', '🧊', 4, 'g'),
  grocery('turkey', 'Turkey slices', 'Protein', '🥪', 4, 'g'),
  grocery('tuna', 'Canned tuna', 'Protein', '🐟', 365, 'cans', false),
  grocery('bread', 'Bread', 'Grains', '🍞', 5, 'slices'),
  grocery('tortilla', 'Tortillas', 'Grains', '🫓', 7, 'pcs'),
  grocery('pasta', 'Dry pasta', 'Grains', '🍝', 365, 'g', false),
  grocery('rice', 'Dry rice', 'Grains', '🍚', 365, 'g', false),
  grocery('oats', 'Rolled oats', 'Grains', '🌾', 180, 'g', false),
  grocery('quinoa', 'Quinoa', 'Grains', '🌾', 180, 'g', false),
  grocery('couscous', 'Couscous', 'Grains', '🌾', 180, 'g', false),
  grocery('flour', 'Plain flour', 'Grains', '🌾', 180, 'g', false),
  grocery('chickpeas', 'Canned chickpeas', 'Pantry', '🫘', 365, 'cans', false),
  grocery('black-beans', 'Canned black beans', 'Pantry', '🫘', 365, 'cans', false),
  grocery('lentils', 'Dry red lentils', 'Pantry', '🫘', 365, 'g', false),
  grocery('canned-tomato', 'Canned tomatoes', 'Pantry', '🥫', 365, 'cans', false),
  grocery('coconut-milk', 'Canned coconut milk', 'Pantry', '🥥', 365, 'cans', false),
  grocery('olive-oil', 'Olive oil', 'Pantry', '🫒', 180, 'ml', false),
  grocery('soy-sauce', 'Soy sauce', 'Pantry', '🫙', 180, 'ml', false),
  grocery('peanut-butter', 'Peanut butter', 'Pantry', '🥜', 90, 'g', false),
  grocery('honey', 'Honey', 'Pantry', '🍯', 365, 'g', false),
  grocery('vegetable-stock', 'Vegetable stock cubes', 'Pantry', '🥣', 180, 'pcs', false),
  grocery('cumin', 'Ground cumin', 'Pantry', '🫙', 365, 'g', false),
  grocery('paprika', 'Paprika', 'Pantry', '🫙', 365, 'g', false),
  grocery('curry-powder', 'Curry powder', 'Pantry', '🫙', 365, 'g', false),
  grocery('salt', 'Salt', 'Pantry', '🧂', 730, 'g', false),
  grocery('black-pepper', 'Black pepper', 'Pantry', '🫙', 365, 'g', false),
  grocery('frozen-peas', 'Frozen peas', 'Frozen', '🟢', 180, 'g'),
  grocery('frozen-berries', 'Frozen mixed berries', 'Frozen', '🫐', 180, 'g'),
  grocery('frozen-corn', 'Frozen sweetcorn', 'Frozen', '🌽', 180, 'g'),
  grocery('frozen-spinach', 'Frozen spinach', 'Frozen', '🥬', 180, 'g'),
  grocery('ice-cream', 'Ice cream', 'Frozen', '🍨', 90, 'ml'),
];

export const RECIPES = [
  {
    id: 'green-goddess-bowl', title: 'Green goddess bowl',
    description: 'A bright, crunchy bowl that gives your leafy greens a delicious second act.',
    minutes: 15, servings: 2, diet: 'Vegetarian', image: 'assets/recipe-salad.jpg',
    ingredients: [
      { id: 'spinach', amount: '100 g' }, { id: 'avocado', amount: '1' },
      { id: 'cucumber', amount: '½' }, { id: 'chickpeas', amount: '1 can, drained' },
      { id: 'lemon', amount: '½, juiced' }, { id: 'yogurt', amount: '3 tbsp' },
    ],
    steps: [
      'Rinse the spinach, cucumber, and chickpeas. Slice the cucumber and avocado.',
      'Stir the yogurt and lemon juice together. Add a spoonful of water if you prefer a thinner dressing.',
      'Divide the spinach and chickpeas between bowls. Add cucumber and avocado, then spoon over the dressing.',
    ],
  },
  {
    id: 'tomato-spinach-pasta', title: 'Spinach & basil pesto pasta',
    description: 'A bright green weeknight pasta for those fresh herbs and greens waiting in the fridge.',
    minutes: 20, servings: 2, diet: 'Vegetarian', image: 'assets/recipe-pasta.jpg',
    ingredients: [
      { id: 'pasta', amount: '180 g' }, { id: 'basil', amount: '20 g' },
      { id: 'spinach', amount: '100 g' }, { id: 'garlic', amount: '2 cloves, sliced' },
      { id: 'olive-oil', amount: '2 tbsp' }, { id: 'parmesan', amount: '25 g, grated' },
    ],
    steps: [
      'Cook the pasta in boiling water according to the packet. Reserve a mug of the cooking water before draining.',
      'Blend the spinach, basil, garlic, olive oil, parmesan, and two spoonfuls of pasta cooking water into a smooth green sauce.',
      'Return the pasta to its warm pan off the heat and toss with the pesto. Add a splash of cooking water until glossy.',
    ],
  },
  {
    id: 'avocado-egg-toast', title: 'Avocado & egg toast',
    description: 'Simple, satisfying toast with creamy avocado and a freshly cooked egg.',
    minutes: 10, servings: 1, diet: 'Vegetarian', image: 'assets/recipe-toast.jpg',
    ingredients: [
      { id: 'bread', amount: '2 slices' }, { id: 'avocado', amount: '½' },
      { id: 'egg', amount: '1' }, { id: 'lemon', amount: '¼, juiced' },
    ],
    steps: [
      'Toast the bread until crisp. Mash the avocado with the lemon juice.',
      'Cook the egg in a nonstick pan until the white and yolk are set to your preference.',
      'Spread the avocado over the toast and top with the egg. Serve straight away.',
    ],
  },
  {
    id: 'garden-vegetable-soup', title: 'Golden pumpkin soup',
    description: 'A cosy, creamy one-pot lunch that makes the most of your vegetable drawer.',
    minutes: 30, servings: 3, diet: 'Vegan', image: 'assets/recipe-soup.jpg',
    ingredients: [
      { id: 'carrot', amount: '2, diced' }, { id: 'pumpkin', amount: '500 g, peeled and diced' },
      { id: 'onion', amount: '1, chopped' }, { id: 'coconut-milk', amount: '½ can' },
      { id: 'vegetable-stock', amount: '1 cube, dissolved in 750 ml hot water' },
      { id: 'olive-oil', amount: '1 tbsp' },
    ],
    steps: [
      'Warm the olive oil in a saucepan. Add the onion and carrots and cook over medium heat for 5 minutes.',
      'Add the pumpkin and prepared stock. Bring to a boil, then reduce to a gentle simmer.',
      'Simmer for 20 minutes, or until the pumpkin and carrots are tender. Blend until smooth, stir in the coconut milk, and warm gently before serving.',
    ],
  },
  {
    id: 'rainbow-fried-rice', title: 'Rainbow shrimp rice',
    description: 'Freshly cooked rice tossed with colourful vegetables and a quick savoury sauce.',
    minutes: 25, servings: 2, diet: 'Non-vegetarian', image: 'assets/recipe-rice.jpg',
    ingredients: [
      { id: 'rice', amount: '150 g, dry' }, { id: 'carrot', amount: '1, finely diced' },
      { id: 'bell-pepper', amount: '1, diced' }, { id: 'frozen-peas', amount: '100 g' },
      { id: 'shrimp', amount: '200 g, peeled' }, { id: 'soy-sauce', amount: '1 tbsp' },
      { id: 'olive-oil', amount: '1 tbsp' },
    ],
    steps: [
      'Cook the rice according to the packet. Drain well and keep hot while you prepare the vegetables.',
      'Heat the oil in a large pan. Stir-fry the carrot and bell pepper for 5 minutes. Add peas and cook for another 3 minutes.',
      'Add the peeled shrimp and cook, turning, until opaque throughout and the centre reaches 63°C.',
      'Add the cooked rice and soy sauce. Toss over high heat for 2 minutes until everything is hot, then serve immediately.',
    ],
  },
  {
    id: 'lemon-chicken-rice', title: 'Lemon shrimp rice bowl',
    description: 'A hearty bowl of lemony shrimp, broccoli, and fluffy rice.',
    minutes: 30, servings: 2, diet: 'Non-vegetarian', image: 'assets/recipe-rice.jpg',
    ingredients: [
      { id: 'shrimp', amount: '300 g, peeled' }, { id: 'rice', amount: '150 g, dry' },
      { id: 'broccoli', amount: '1 small head, in florets' }, { id: 'lemon', amount: '1' },
      { id: 'garlic', amount: '2 cloves, crushed' }, { id: 'olive-oil', amount: '1 tbsp' },
    ],
    steps: [
      'Cook the rice according to the packet. Steam the broccoli for 5–7 minutes until tender.',
      'Heat the oil in a pan and add the shrimp. Cook, turning regularly, until opaque throughout and the centre reaches 63°C.',
      'Add garlic, lemon zest, and lemon juice to the shrimp. Stir for 1 minute, adding a splash of water to loosen the sauce.',
      'Divide the rice between bowls, then add the broccoli and shrimp with its pan juices.',
    ],
  },
  {
    id: 'crispy-chickpea-salad', title: 'Crispy chickpea salad',
    description: 'Warm spiced chickpeas meet cool cucumber and juicy tomatoes.',
    minutes: 20, servings: 2, diet: 'Vegan', image: 'assets/recipe-salad.jpg',
    ingredients: [
      { id: 'chickpeas', amount: '1 can, drained and dried' },
      { id: 'tomato', amount: '2, diced' }, { id: 'cucumber', amount: '½, diced' },
      { id: 'lettuce', amount: '½ head, chopped' }, { id: 'olive-oil', amount: '1 tbsp' },
      { id: 'paprika', amount: '1 tsp' }, { id: 'lemon', amount: '½, juiced' },
    ],
    steps: [
      'Warm half the oil in a frying pan. Add the dried chickpeas and paprika and cook for 8–10 minutes, stirring often.',
      'Combine the lettuce, cucumber, and tomatoes in a large bowl.',
      'Add the warm chickpeas, remaining olive oil, and lemon juice. Toss gently and serve.',
    ],
  },
  {
    id: 'creamy-mushroom-pasta', title: 'Creamy green pasta',
    description: 'Fresh spinach, basil, and a little cream make a quick, comforting dinner.',
    minutes: 25, servings: 2, diet: 'Vegetarian', image: 'assets/recipe-pasta.jpg',
    ingredients: [
      { id: 'pasta', amount: '180 g' }, { id: 'spinach', amount: '150 g' },
      { id: 'cream', amount: '100 ml' }, { id: 'garlic', amount: '2 cloves, chopped' },
      { id: 'basil', amount: '15 g' }, { id: 'parmesan', amount: '20 g, grated' },
    ],
    steps: [
      'Cook the pasta according to the packet. Reserve a mug of cooking water, then drain.',
      'Add the spinach to a saucepan with a splash of water. Cover and cook for 2 minutes until wilted.',
      'Blend the spinach, basil, garlic, cream, and parmesan. Warm the sauce gently in the pasta pan, then add the pasta.',
      'Toss until the sauce coats the pasta, adding a little more cooking water if needed.',
    ],
  },
  {
    id: 'banana-breakfast-toast', title: 'Tomato & avocado egg toast',
    description: 'A fresh breakfast with ripe avocado, juicy tomatoes, and a warm egg.',
    minutes: 10, servings: 1, diet: 'Vegetarian', image: 'assets/recipe-toast.jpg',
    ingredients: [
      { id: 'bread', amount: '2 slices' }, { id: 'avocado', amount: '½, mashed' },
      { id: 'tomato', amount: '1, sliced' }, { id: 'egg', amount: '1' },
    ],
    steps: [
      'Toast the bread until golden and crisp.',
      'Cook the egg in a nonstick pan until the white and yolk are set to your preference.',
      'Spread the toast with avocado. Add the tomato slices and cooked egg, then serve immediately.',
    ],
  },
  {
    id: 'red-lentil-curry', title: 'Golden lentil curry',
    description: 'A gently spiced pantry dinner with a handful of fresh greens.',
    minutes: 30, servings: 3, diet: 'Vegan', image: 'assets/recipe-soup.jpg',
    ingredients: [
      { id: 'lentils', amount: '180 g, rinsed' }, { id: 'coconut-milk', amount: '1 can' },
      { id: 'canned-tomato', amount: '1 can' }, { id: 'onion', amount: '1, diced' },
      { id: 'spinach', amount: '100 g' }, { id: 'curry-powder', amount: '2 tsp' },
      { id: 'olive-oil', amount: '1 tbsp' },
    ],
    steps: [
      'Warm the oil in a saucepan. Cook the onion for 5 minutes, then stir in curry powder for 30 seconds.',
      'Add the lentils, tomatoes, coconut milk, and 250 ml water. Stir well and bring to a gentle simmer.',
      'Cook for 20 minutes, stirring occasionally, until lentils are soft. Add more water if the curry becomes too thick.',
      'Stir in spinach until wilted, then divide between bowls.',
    ],
  },
  {
    id: 'tuna-crunch-wrap', title: 'Tuna & avocado salad',
    description: 'A fresh, quick lunch with crisp vegetables and creamy avocado.',
    minutes: 10, servings: 2, diet: 'Non-vegetarian', image: 'assets/recipe-salad.jpg',
    ingredients: [
      { id: 'avocado', amount: '1, sliced' }, { id: 'tuna', amount: '1 can, drained' },
      { id: 'yogurt', amount: '2 tbsp' }, { id: 'cucumber', amount: '¼, sliced' },
      { id: 'lettuce', amount: '4 leaves' }, { id: 'lemon', amount: '¼, juiced' },
    ],
    steps: [
      'Mix the drained tuna with yogurt and lemon juice.',
      'Tear the lettuce into bowls, then add the cucumber and avocado.',
      'Spoon the tuna mixture over the vegetables and serve.',
    ],
  },
  {
    id: 'broccoli-cheddar-eggs', title: 'Cheddar & avocado breakfast toast',
    description: 'A warm breakfast toast for using up a ripe avocado and the last of the cheese.',
    minutes: 15, servings: 2, diet: 'Vegetarian', image: 'assets/recipe-toast.jpg',
    ingredients: [
      { id: 'egg', amount: '2' }, { id: 'avocado', amount: '1, sliced' },
      { id: 'cheddar', amount: '50 g, grated' }, { id: 'bread', amount: '2 slices' },
      { id: 'butter', amount: '10 g' },
    ],
    steps: [
      'Toast the bread until golden and crisp.',
      'Melt butter in a nonstick pan over medium-low heat. Add the eggs and cook until the whites are set.',
      'Scatter the cheddar over the eggs, cover, and cook until the yolks are set to your preference and the cheese has melted.',
      'Arrange avocado slices on each toast and top with a cheesy egg. Serve straight away.',
    ],
  },
];

/** Ingredient presence only; amounts are shown for users to check before cooking. */
export function recipeMatch(recipe, inventory = []) {
  const present = new Set(inventory
    .filter(item => item.quantity !== 0)
    .map(item => typeof item === 'string' ? item : (item.groceryId || item.catalogId || item.id)));
  const available = recipe.ingredients.filter(ingredient => present.has(ingredient.id));
  const missing = recipe.ingredients.filter(ingredient => !present.has(ingredient.id));
  return {
    available, missing, matched: available.length, total: recipe.ingredients.length,
    percent: recipe.ingredients.length ? Math.round(available.length / recipe.ingredients.length * 100) : 100,
  };
}
