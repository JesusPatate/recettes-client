<template>
  <app-recipe-form
    :units="units"
    @confirm="addRecipe"
    @cancel="$emit('cancel')">
  </app-recipe-form>
</template>

<script>
  import RecipeForm from './RecipeForm.vue';
  import recipeService from 'js/application/recipeManagementService.js';
  import unitService from 'js/application/unitManagementService.js';
  import Recipe from 'js/model/Recipe.js';
  import Ingredient from 'js/model/Ingredient.js';
  import eventBus from 'js/application/eventBus.js';

  export default {
    props: {
        units: Array
    },

    methods: {
      addRecipe(data) {
        const ingredients = [];

        for (const item of data.ingredients) {
          ingredients.push(new Ingredient(item.name, item.amount, item.unit));
        }

        const recipe = new Recipe(
          data.id,
          data.title,
          data.hot,
          data.dessert,
          data.preparationTime,
          data.cookingTime,
          data.servings,
          data.source,
          ingredients
        );

        recipeService.create(
          recipe,
          () => {  eventBus.$emit('new-recipe', recipe); },
          () => eventBus.$emit('error', 'Insertion de la nouvelle recette échouée')
        );
      }
    },

    components: {
      'app-recipe-form': RecipeForm
    }
  }
</script>
