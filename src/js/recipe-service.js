import apiClient from "../js/recettes-api-client.js";
import { useRecipeStore } from "../stores/recipes.js";

var recipeStore = null;

function getRecipeStore() {
  if (recipeStore === null) {
    recipeStore = useRecipeStore();
  }

  return recipeStore;
}

export default {
  fetchAll() {
    const store = getRecipeStore();
    apiClient.getAllRecipes((recipes) => store.storeAll(recipes));
  },

  search(term) {
    const store = getRecipeStore();
    apiClient.searchRecipes(term, (recipes) => store.storeAll(recipes, true));
  },
};
