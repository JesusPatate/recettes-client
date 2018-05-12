export default class IngredientRepresentation {
  constructor(name, amount, unitId) {
    this.name = name;
    this.amount = amount;
    this.unitId = unitId;
  }

  static from(ingredient) {
    const unitId = (ingredient.unit != null) ? ingredient.unit.id : null;

    return new IngredientRepresentation(ingredient.name, ingredient.amount, unitId);
  }
}
