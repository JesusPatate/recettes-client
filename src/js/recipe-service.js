import units from "@/assets/units.json";
import apiClient from "../js/recettes-api-client.js";
import { useRecipeStore } from "../stores/recipes.js";
import Ingredient from "./Ingredient.js";
import Recipe from "./Recipe.js";

var recipeStore = null;

function getRecipeStore() {
  if (recipeStore === null) {
    recipeStore = useRecipeStore();
  }

  return recipeStore;
}

function toRecipe(data) {
  const ingredients = data.ingredients.map(
    (i) => new Ingredient(i.name, i.amount, i.unit)
  );

  return new Recipe(
    data.id,
    data.title,
    data.hot,
    data.dessert,
    data.preparationTime,
    data.cookingTime,
    data.servings,
    data.source,
    ingredients
  );
}

export default {
  fetchAll() {
    const store = getRecipeStore();
    apiClient.getAllRecipes((recipes) => store.storeAll(recipes));
  },

  get(recipeId) {
    const store = getRecipeStore();
    return store.get(recipeId);
  },

  search(term) {
    const store = getRecipeStore();
    apiClient.searchRecipes(term, (recipes) => store.storeAll(recipes));
  },

  add(recipeData, onSuccess = () => {}) {
    const store = getRecipeStore();
    const recipe = toRecipe(recipeData);
    apiClient.saveRecipe(recipe, () => {
      store.store(recipe);
      onSuccess();
    });
  },

  delete(recipeId, onSuccess = () => {}) {
    const store = getRecipeStore();
    apiClient.deleteRecipe(recipeId, () => {
      store.remove(recipeId);
      onSuccess();
    });
  },

  formatIngredient(ingredientData) {
    let result = ingredientData.name;

      if (ingredientData.amount) {
        result += " : " + ingredientData.amount;
      }

      if (ingredientData.unit) {
        result += " " + units[ingredientData.unit];
      }

      return result;
  },
};
