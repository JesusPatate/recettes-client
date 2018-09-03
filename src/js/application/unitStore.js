import UnitManagementService from 'js/application/UnitManagementService.js';
import CoolStore from 'js/application/CoolStore.js' ;

class UnitStore extends CoolStore {
  constructor() {
    super(new UnitManagementService());
  }

  add(unit, onSuccess = () => {}, onFailure = () => {}) {
    console.debug(`Adding unit ${unit.id} to the store`);
    super.add(unit, onSuccess, onFailure);
  }

  remove(id, onSuccess = () => {}, onFailure = () => {}) {
    console.debug(`Removing unit ${id} from the store`);
    super.remove(id, onSuccess, onFailure);
  }
}

let store = new UnitStore();

export default store;
