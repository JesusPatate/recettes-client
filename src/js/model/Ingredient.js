import Unit from 'js/model/Unit.js';

export default class Ingredient {
  constructor(name = '', amount = 1, unit = null) {
    this.name = name;
    this.amount = amount;
    this.unit = unit;
  }

  static from(ingredient) {
    return new Ingredient(
      ingredient.name,
      ingredient.amount,
      !!ingredient.unit ? Unit.from(ingredient.unit) : null
    );
  }
}
