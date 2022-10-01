import axios from "axios";

import Recipe from "./Recipe.js";
import Ingredient from "./Ingredient.js";
import { API_URL } from "../config.js";

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
            `Récupération échouée (statut ${response.status}) ${response.data}`
          );
        } else {
          console.error(`Récupération échouée : ${error.message}`);
          console.debug(error);
        }
      });
  },
};
