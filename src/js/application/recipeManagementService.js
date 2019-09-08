import recipeStore from 'js/application/recipeStore.js';
import unitStore from 'js/application/unitStore.js';
import Ingredient from 'js/model/Ingredient.js';
import Recipe from 'js/model/Recipe.js' ;
import RecettesApiClient from 'js/presentation/RecettesApiClient.js';
import RecipeRepresentation from 'js/presentation/representation/RecipeRepresentation.js';

class RecipeManagementService {
  constructor() {
    this.recipeStore = recipeStore;
    this.unitStore = unitStore;
    this.apiClient = new RecettesApiClient();
  }

  getAll(onSuccess, onFailure) {
    if (!this.recipeStore.isEmpty()) {
      onSuccess(this.store.items);
    } else {
      this.apiClient.getRecipes(
        result => {
          let recipes = [];

          for (let index in result) {
            let representation = result[index];
            let recipe = this.buildRecipe(representation);
            this.recipeStore.add(recipe);
            recipes.push(recipe);
          }

          onSuccess(recipes);
        },
        onFailure
      );
    }
  }

  search(text, onSuccess = () => {}, onFailure = () => {}) {
    this.apiClient.search(text,
      results => {
        let recipes = [];

        for (let index in results) {
          let representation = results[index];
          let recipe = this.buildRecipe(representation);
          recipes.push(recipe);
        }

        onSuccess(recipes);
      },
      error => onFailure(error));
  }

  create(recipe, onSuccess, onFailure) {
      const representation = RecipeRepresentation.from(recipe);

      this.apiClient.storeRecipe(representation,
        response => {
          let recipe = this.buildRecipe(response);
          this.recipeStore.add(recipe);
          onSuccess(recipe);
        },
        onFailure);
  }

  update(recipe, onSuccess, onFailure) {
    const representation = RecipeRepresentation.from(recipe);
    this.apiClient.storeRecipe(
      representation,
      () => {
        this.recipeStore.update(recipe);
        onSuccess(recipe);
      },
      onFailure);

  }

  delete(id, onSuccess, onFailure) {
    this.apiClient.deleteRecipe(
      id,
      () => {
        this.recipeStore.remove(id);
        onSuccess(id);
      },
      onFailure);
  }

  buildRecipe(representation) {
    let ingredients = [];

    for (let index in representation.ingredients) {
      let ingredientRepr = representation.ingredients[index];
      let unit = this.unitStore.get(ingredientRepr.unitId);
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

const service = new RecipeManagementService();

export default service;
