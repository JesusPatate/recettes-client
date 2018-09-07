import uuid from 'js/infrastructure/uuid.js';

import Ingredient from 'js/model/Ingredient.js';

export default class Recipe {
  constructor(
      id = uuid(),
      title = '',
      hot = false,
      dessert = false,
      prepTime = 1,
      cookingTime = 1,
      servings = 1,
      source = '',
      ingredients = []) {

      this.id = id;
      this.title = title;
      this.hot = hot;
      this.dessert = dessert;
      this.preparationTime = prepTime;
      this.cookingTime = cookingTime;
      this.servings = servings;
      this.source = source;
      this.ingredients = Array.from(ingredients);
    }

    static from(recipe) {
      return new Recipe(
            recipe.id,
            recipe.title,
            recipe.hot,
            recipe.dessert,
            recipe.preparationTime,
            recipe.cookingTime,
            recipe.servings,
            recipe.source,
            recipe.ingredients.map(i => Ingredient.from(i))
      );
    }
}
