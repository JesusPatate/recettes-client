import UUID from 'uuidjs';

export default class Recipe {
  constructor(
      id = UUID.generate(),
      title = '',
      hot = false,
      dessert = false,
      prepTime = 1,
      cookingTime = 1,
      servings = 1,
      source = '',
      ingredients = []) {

      this.id = id;
      this.title = title;
      this.hot = hot;
      this.dessert = dessert;
      this.preparationTime = prepTime;
      this.cookingTime = cookingTime;
      this.servings = servings;
      this.source = source;
      this.ingredients = Array.from(ingredients);
    }
}
