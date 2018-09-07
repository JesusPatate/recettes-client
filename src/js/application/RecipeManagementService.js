import Recipe from 'js/model/Recipe.js' ;
import Ingredient from 'js/model/Ingredient.js';
import RecettesApiClient from 'js/presentation/RecettesApiClient.js';
import RecipeRepresentation from 'js/presentation/representation/RecipeRepresentation.js';
import unitStore from 'js/application/unitStore.js';

export default class RecipeManagementService {
  constructor() {
    this.apiClient = new RecettesApiClient();
  }

  getAll(onSuccess, onFailure) {

    this.apiClient.getRecipes(
      result => {
        let recipes = [];
        
        for (let index in result) {
          let representation = result[index];
          let recipe = this.buildRecipe(representation);
          recipes.push(recipe);
        }

        onSuccess(recipes);
      },
      error => onFailure(error));
  }

  create(recipe, onSuccess, onFailure) {
      const representation = RecipeRepresentation.from(recipe);

      this.apiClient.saveRecipe(representation,
        response => {
          let recipe = this.buildRecipe(response);
          onSuccess(recipe);
        }, 
        onFailure);
  }

  update(recipe, onSuccess, onFailure) {
    const representation = RecipeRepresentation.from(recipe);
    this.apiClient.updateRecipe(representation, onSuccess, onFailure);
  }

  delete(id, onSuccess, onFailure) {
    this.apiClient.deleteRecipe(id, onSuccess, onFailure);
  }

  buildRecipe(representation) {
    let ingredients = [];

    for (let index in representation.ingredients) {
      let ingredientRepr = representation.ingredients[index];
      let unit = unitStore.get(ingredientRepr.unitId);
      let ingredient = new Ingredient(ingredientRepr.name, ingredientRepr.amount, unit);
      ingredients.push(ingredient);
    }

    let recipe = new Recipe(
      representation.id,
      representation.title,
      representation.hot,
      representation.dessert,
      representation.preparationTime,
      representation.cookingTime,
      representation.servings,
      representation.source,
      ingredients);

    return recipe;
  }
}
