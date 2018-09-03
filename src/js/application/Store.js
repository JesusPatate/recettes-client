/* 
 * TODO : faire une sous-classe qui surcharge add() et remove() et qui font appel au client de l'API.
 * UnitStore et RecipeStore devront étendre cette sous-classe.
 */

export default class {
  constructor() {
    this.items = [];
  }

  get(id) {
    console.debug(`Item ${id} requested`);
    let requestedItem = this.items.find(item => item.id == id);
    return requestedItem;
  }

  add(item) {
    this.items.push(item);
  }

  remove(id) {
    let idx = this.items.findIndex(item => item.id === id);
    let deleted = this.items.splice(idx, 1);
    return deleted.length > 0;
  }
};
