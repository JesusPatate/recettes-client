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

  update(item) {
    let idx = this.items.findIndex(elt => elt.id === item.id);
    this.items.splice(idx, 1, item);
    // We must use splice instead of accessing directly to items[idx] so that Vue detects the change
  }

  remove(id) {
    let idx = this.items.findIndex(item => item.id === id);
    let deleted = this.items.splice(idx, 1);
    return deleted.length > 0;
  }

  clear() {
    const deleted = this.items.splice(0, this.items.length);
    return deleted;
  }
};
