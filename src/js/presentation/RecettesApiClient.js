import axios from 'axios';
import config from 'config';

const RECIPES_ROUTE = '/recipes';
const UNITS_ROUTE = '/units';
const SEARCH_RECIPES_ROUTE = '/recipes/search';

export default class RecettesApiClient {
  getRecipes(success = () => {}, failure = () => {}) {
    axios.get(config.apiUrl + RECIPES_ROUTE)
      .then(response => {
        success(response.data);
      })
      .catch(error => {
        console.error("Failed to fetch recipes from server : " + error);
        failure(error);
      });
  }

  getUnits(success = () => {}, failure = () => {}) {
    let units = [];

    axios.get(config.apiUrl + UNITS_ROUTE, this.recipe)
      .then(response => {
        success(response.data);
      })
      .catch(error => {
        console.error("Failed to fetch units from server : " + error);
        failure(error);
      });

    return units;
  }

  storeRecipe(recipe, success = () => {}, failure = () => {}) {
    axios.put(config.apiUrl + RECIPES_ROUTE + '/' + recipe.id, recipe)
      .then(response => {
        success(response.data);
      })
      .catch(error => {
        console.error("Failed to save recipe : " + error);
        failure(error);
      });
  }

  deleteRecipe(id, success = () => {}, failure = () => {}) {
    axios.delete(config.apiUrl + RECIPES_ROUTE + '/' + id)
      .then(response => {
        success(response.data);
      })
      .catch(error => {
        console.error(error);
        failure(error);
      });
  }

  search(text, success = () => {}, failure = () => {}) {
    axios.post(config.apiUrl + SEARCH_RECIPES_ROUTE + '?value=' + text)
      .then(response => {
        success(response.data);
      })
      .catch(error => {
        console.error(error);
        failure(error);
      });
  }
}
