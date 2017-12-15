import axios from 'axios';
import notyf from 'js/Notyf.js';
import config from 'config';

export default class RecettesApiClient {
  getRecipes() {
    const recipes = [];

    axios.get(config.apiUrl + '/recipes')
      .then((response) => {
        response.data.map(recipe => recipes.push(recipe));

        if (recipes.length === 0) {
          notyf.alert("Aucune recette trouvée");
        }
      })
      .catch((error) => {
        console.error("Failed to fetch recipes from server : " + error);
      });

    return recipes;
  }

  getUnits() {
    let units = [];

    axios.get(config.apiUrl + '/units', this.recipe)
      .then((response) => {
        response.data.map(unit => units.push(unit));
      })
      .catch(function (error) {
        console.error("Failed to fetch units from server : " + error);
      });

    return units;
  }

  saveRecipe(recipe, callback = () => {}) {
    axios.put(config.apiUrl + '/recipes', recipe)
      .then((response) => {
        callback();
      })
      .catch(function (error) {
        console.error("Failed to save recipe : " + error);
      });
  }

  deleteRecipe(id, callback = () => {}) {
    axios.delete(config.apiUrl + '/recipes/' + id)
      .then((response) => {
        callback();
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
