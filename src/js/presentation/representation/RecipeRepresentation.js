
import IngredientRepresentation from './IngredientRepresentation.js';

export default class RecipeRepresentation {
  constructor(id, title, hot, dessert, prepTime, cookingTime, servings, source, ingredients) {
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
      const ingredients = [];

      for (let i = 0; i < recipe.ingredients.length; ++i) {
        let ingredient = IngredientRepresentation.from(recipe.ingredients[i]);
        ingredients.push(ingredient);
      }

      return new RecipeRepresentation(
        recipe.id,
        recipe.title,
        recipe.hot,
        recipe.dessert,
        recipe.preparationTime,
        recipe.cookingTime,
        recipe.servings,
        recipe.source,
        ingredients
      );
    }
}
