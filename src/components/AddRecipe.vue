<template>
  <app-recipe-form
    :units="units"
    @confirm="addRecipe"
    @cancel="$emit('cancel')">
  </app-recipe-form>
</template>

<script>
  import RecipeForm from './RecipeForm.vue';
  import notyf from 'js/notyf.js';
  import recipeService from 'js/application/recipeManagementService.js';
  import unitService from 'js/application/unitManagementService.js';
  import Recipe from 'js/model/Recipe.js';
  import Ingredient from 'js/model/Ingredient.js';
  import eventBus from 'js/application/eventBus.js';

  export default {
    data() {
      return {
        units: []
      };
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

        eventBus.$emit('new-recipe', recipe);
      }
    },

    created() {
      const vm = this;
      unitService.getAll(
        results => this.units = results,
        () => notyf.alert('Erreur lors de la récupération des unités')
      );
    },

    components: {
      'app-recipe-form': RecipeForm
    }
  }
</script>
