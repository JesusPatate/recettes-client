import axios from 'axios';
import config from 'config';

export default class RecettesApiClient {
  getRecipes(success = function() {}, failure = function() {}) {
    axios.get(config.apiUrl + '/recipes')
      .then((response) => {
        success(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch recipes from server : " + error);
        failure(error);
      });
  }

  getUnits(success = function() {}, failure = function() {}) {
    let units = [];

    axios.get(config.apiUrl + '/units', this.recipe)
      .then((response) => {
        success(response.data);
      })
      .catch(function (error) {
        console.error("Failed to fetch units from server : " + error);
        failure(error);
      });

    return units;
  }

  saveRecipe(recipe, success = function() {}, failure = function() {}) {
    axios.post(config.apiUrl + '/recipes', recipe)
      .then((response) => {
        success();
      })
      .catch(function (error) {
        console.error("Failed to save recipe : " + error);
        failure(error);
      });
  }

  updateRecipe(recipe, success = function() {}, failure = function() {}) {
    axios.put(config.apiUrl + '/recipes', recipe)
      .then((response) => {
        success();
      })
      .catch(function (error) {
        console.error("Failed to save recipe : " + error);
        failure(error);
      });
  }

  deleteRecipe(id, success = function() {}, failure = function() {}) {
    axios.delete(config.apiUrl + '/recipes/' + id)
      .then((response) => {
        success();
      })
      .catch((error) => {
        console.error(error);
        failure(error);
      });
  }
}
