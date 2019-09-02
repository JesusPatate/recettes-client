<template>
  <app-recipe-form
    :units="units"
    @confirm="addRecipe"
    @cancel="$emit('cancel')">
  </app-recipe-form>
</template>

<script>
  import RecipeForm from './RecipeForm.vue';
  import Recipe from 'js/model/Recipe.js';
  import Ingredient from 'js/model/Ingredient.js';
  import recipeStore from 'js/application/recipeStore.js';
  import unitStore from 'js/application/unitStore.js';
  import uuid from 'uuid/v4';

  export default {
    components: {
      'app-recipe-form': RecipeForm
    },

    data() {
      return {
        units: unitStore.items
      };
    },

    methods: {
      addRecipe(data) {
        const ingredients = [];

        for (const item of data.ingredients) {
          ingredients.push(new Ingredient(item.name, item.amount, item.unit));
        }

        const recipe = new Recipe(
          uuid(),
          data.title,
          data.hot,
          data.dessert,
          data.preparationTime,
          data.cookingTime,
          data.servings,
          data.source,
          ingredients
        );

        recipeStore.add(recipe);
        this.$emit('new-recipe', recipe);
      }
    }
  }
</script>
