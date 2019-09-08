export default class {
  constructor() {
    this.items = [];
  }

  /**
   * Retrieves an element of the store.
   *
   * @param id The identifier of the element
   * @return The element if it was found or undefined otherwise
   */
  get(id) {
    console.debug(`Item ${id} requested`);
    let requestedItem = this.items.find(item => item.id == id);
    return requestedItem;
  }

  /**
   * Adds provided element to the store.
   *
   * This method does nothing if the element is already in the store.
   *
   * @param item The element to add to the store
   * @return Whether the element was inserted
   */
  add(item) {
    if (this.get(item.id) === undefined) {
      this.items.push(item);
      return true;
    }

    return false;
  }

  /**
   * Updates an element in the store.
   *
   * This method does nothing if the element is not in the store.
   *
   * @param item The updated element
   * @return Whether an element in the store was updated
   */
  update(item) {
    let idx = this.items.findIndex(elt => elt.id === item.id);

    if (idx > -1) {
      /*
       * We must use splice instead of accessing directly to items[idx]
       * so that Vue detects the change.
       */
      this.items.splice(idx, 1, item);
    }

    return idx > -1;
  }

  /**
   * Removes an element from the store.
   *
   * This method does nothing if the element is not in the store.
   *
   * @param item The element to remove
   * @return Whether the element was found
   */
  remove(id) {
    let idx = this.items.findIndex(item => item.id === id);

    if (idx > -1) {
      let deleted = this.items.splice(idx, 1);
      return deleted.length > 0;
    }
  }

  /**
   * Clears out the store.
   *
   * @return An array containing the deleted elements.
   */
  clear() {
    const deleted = this.items.splice(0, this.items.length);
    return deleted;
  }

  /**
   * Returns whether the is empty.
   *
   * @return Whether the store contains no elements.
   */
  isEmpty() {
    return this.items.length === 0;
  }
};
