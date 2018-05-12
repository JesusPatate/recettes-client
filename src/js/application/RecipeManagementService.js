import Recipe from 'js/model/Recipe.js' ;
import Ingredient from 'js/model/Ingredient.js';
import RecettesApiClient from 'js/presentation/RecettesApiClient.js';
import RecipeRepresentation from 'js/presentation/representation/RecipeRepresentation.js';

/**
 * Retrieves a unit from its identifier.
 *
 * @param id The identifier of the unit
 * @param units Available units
 */
function getUnit(id, units) {
  for (let index in units) {
    const unit = units[index];

    if (unit.id == id) {
      return unit;
    }
  }

  return null;
}

export default class RecipeManagementService {
  constructor() {
    this.apiClient = new RecettesApiClient();
  }

  getRecipes(onSuccess, onFailure) {
    let recipes = [];
    let units = [];

    this.apiClient.getUnits(result => units = result, error => onFailure(error));
    this.apiClient.getRecipes(
      result => {
        for (let index1 in result) {
          let recipeRepr = result[index1];
          let ingredients = [];

          for (let index2 in recipeRepr.ingredients) {
            let ingredientRepr = recipeRepr.ingredients[index2];
            let unit = getUnit(ingredientRepr.unitId, units);
            let ingredient = new Ingredient(ingredientRepr.name, ingredientRepr.amount, unit);
            ingredients.push(ingredient);
          }

          let recipe = new Recipe(
            recipeRepr.id,
            recipeRepr.title,
            recipeRepr.hot,
            recipeRepr.dessert,
            recipeRepr.preparationTime,
            recipeRepr.cookingTime,
            recipeRepr.servings,
            recipeRepr.source,
            ingredients);

          recipes.push(recipe);
        }

        onSuccess(recipes);
      },
      error => onFailure(error));
  }

  saveRecipe(recipe, onSuccess, onFailure) {
      const representation = RecipeRepresentation.from(recipe);

      if (recipe.id === null) {
        this.apiClient.saveRecipe(representation, onSuccess, onFailure);
      } else {
        this.apiClient.updateRecipe(representation, onSuccess, onFailure);
      }
  }
}
