import axios from "axios";

import Recipe from "./Recipe.js";
import Ingredient from "./Ingredient.js";
import { API_URL } from "../config.js";

function map(data) {
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
  getAllRecipes(callback = () => {}) {
    console.debug("Récupération des recettes...");

    axios.get(API_URL + "/recipes").then((response) => {
      console.debug(response.data.length + " recettes récupérées");
      console.debug(response.data);
      const recipes = map(response.data);
      callback(recipes);
    });
  },
};
