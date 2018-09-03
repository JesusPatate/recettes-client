import RecipeManagementService from 'js/application/RecipeManagementService.js';
import CoolStore from 'js/application/CoolStore.js' ;

class RecipeStore extends CoolStore {
  constructor() {
    super(new RecipeManagementService());
  }

  add(recipe, onSuccess = () => {}, onFailure = () => {}) {
    console.debug(`Adding recipe ${recipe.id} to the store`);
    super.add(recipe, onSuccess, onFailure);
  }

  remove(id, onSuccess = () => {}, onFailure = () => {}) {
    console.debug(`Removing recipe ${id} from the store`);
    super.remove(id, onSuccess, onFailure);
  }
}

let store = new RecipeStore();

export default store;
