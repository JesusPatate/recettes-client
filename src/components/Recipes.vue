<template>
    <div class="container">
        <app-recipe-search class="mb-2"></app-recipe-search>
        <app-recipe-list></app-recipe-list>
    </div>
</template>

<script>
  import RecipeList from './RecipeList.vue';
  import RecipeForm from './RecipeForm.vue';
  import RecipeSearch from './RecipeSearch.vue';

  export default {
    components: {
      'app-recipe-list': RecipeList,
      'app-recipe-form': RecipeForm,
      'app-recipe-search': RecipeSearch
    },

    /*
    data() {
      return {
        recipes: recipeStore.items,
        units: unitStore.items
      };
    }
    */
  }
</script>
