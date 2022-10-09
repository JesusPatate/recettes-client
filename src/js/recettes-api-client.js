import axios from "axios";

import { API_URL } from "../config.js";
import Ingredient from "./Ingredient.js";
import Recipe from "./Recipe.js";

function toRecipe(data) {
  return data.map((item) => {
    const ingredients = item.ingredients.map(
      (i) => new Ingredient(i.name, i.amount, i.unit)
    );

    return new Recipe(
      item.id,
      item.title,
      item.hot,
      item.dessert,
      item.preparationTime,
      item.cookingTime,
      item.servings,
      item.source,
      ingredients
    );
  });
}

function fromRecipe(recipe) {
  const data = {
    title: recipe.title,
    hot: recipe.hot,
    dessert: recipe.dessert,
    servings: recipe.servings,
    preparationTime: recipe.preparationTime,
    cookingTime: recipe.cookingTime,
    ingredients: [],
  };

  if (recipe.source !== null) {
    data.source = recipe.source;
  }

  for (const ingredient of recipe.ingredients) {
    data.ingredients.push({
      name: ingredient.name,
      amount: ingredient.amount,
      unit: ingredient.unit,
    });
  }

  return data;
}

export default {
  getAllRecipes(onSuccess = () => {}) {
    console.debug("Récupération des recettes...");

    axios
      .get(API_URL + "/recipes")
      .then((response) => {
        console.debug(response.data.length + " recettes récupérées");
        console.debug(response.data);
        const recipes = toRecipe(response.data);
        onSuccess(recipes);
      })
      .catch((error) => {
        if (error.response && error.response.status > 0) {
          const response = error.response;
          console.error(
            `Récupération des recettes échouée (statut ${response.status}) : ${response.data}`
          );
        } else {
          console.error(`Récupération des recettes échouée : ${error.message}`);
          console.debug(error);
        }
      });
  },

  searchRecipes(term, onSuccess = () => {}) {
    console.debug("Récupération des recettes...");

    axios
      .post(API_URL + "/recipes/search?value=" + term)
      .then((response) => {
        console.debug(response.data.length + " recettes récupérées");
        console.debug(response.data);
        const recipes = toRecipe(response.data);
        onSuccess(recipes);
      })
      .catch((error) => {
        if (error.response && error.response.status > 0) {
          const response = error.response;
          console.error(
            `Récupération des recettes échouée (statut ${response.status}) : ${response.data}`
          );
        } else {
          console.error(`Récupération des recettes échouée : ${error.message}`);
          console.debug(error);
        }
      });
  },

  saveRecipe(recipe, onSuccess = () => {}) {
    console.debug(`Sauvegarde de la recette "${recipe.title}"...`);

    const data = fromRecipe(recipe);

    axios
      .put(API_URL + `/recipes/${recipe.id}`, data)
      .then(() => {
        console.debug("Recette sauvegardée");
        onSuccess();
      })
      .catch((error) => {
        console.debug(error);

        if (error.response && error.response.status > 0) {
          const response = error.response;
          console.error(
            `Sauvegarde échouée (statut ${response.status}) : ${response.data}`
          );
        } else {
          console.error(`Sauvegarde échouée : ${error.message}`);
        }
      });
  },

  deleteRecipe(recipeId, onSuccess = () => {}) {
    console.debug("Suppression de la recette...");

    axios
      .delete(API_URL + `/recipes/${recipeId}`)
      .then(() => {
        console.debug("Recette supprimée");
        onSuccess();
      })
      .catch((error) => {
        console.debug(error);

        if (error.response && error.response.status > 0) {
          const response = error.response;
          console.error(
            `Sauvegarde échouée (statut ${response.status}) : ${response.data}`
          );
        } else {
          console.error(`Sauvegarde échouée : ${error.message}`);
        }
      });
  }
};
