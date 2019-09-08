import Store from 'js/application/Store.js' ;

class UnitStore extends Store {

  add(unit, onSuccess = () => {}, onFailure = () => {}) {
    console.debug(`Adding unit ${unit.id} to the store`);
    super.add(unit, onSuccess, onFailure);
  }

  remove(id, onSuccess = () => {}, onFailure = () => {}) {
    console.debug(`Removing unit ${id} from the store`);
    super.remove(id, onSuccess, onFailure);
  }
}

const store = new UnitStore();

export default store;
