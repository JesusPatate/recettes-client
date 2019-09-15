<template>
  <app-recipe-form
    :units="units"
    :initialValues="recipe"
    @confirm="updateRecipe"
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
      units: Array,
      recipe: Object
    },

    methods: {
      updateRecipe(data) {
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

        recipeService.update(
          recipe,
          () => {  eventBus.$emit('recipe-updated', recipe); },
          () => eventBus.$emit('error', 'Mide à jour de la recette échouée')
        );
      }
    },

    components: {
      'app-recipe-form': RecipeForm
    },
  }
</script>
