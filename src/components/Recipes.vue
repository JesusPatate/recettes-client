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
  import unitManagementService from 'js/application/unitManagementService.js';
  import recipeManagementService from 'js/application/recipeManagementService.js';
  import notyf from 'js/notyf.js';
  import recipeStore from 'js/application/recipeStore.js';
  import unitStore from 'js/application/unitStore.js';

  export default {
    components: {
      'app-recipe-list': RecipeList,
      'app-recipe-form': RecipeForm,
      'app-recipe-search': RecipeSearch
    },

    data() {
      return {
        recipes: recipeStore.items,
        units: unitStore.items
      };
    },

    methods: {
      loadRecipes() {
        const vm = this;

        recipeStore.init(
          recipes => {
            if (recipes.length === 0) {
              notyf.alert("Aucune recette trouvée")
            }
          }, () => notyf.alert("Erreur lors de la récupération des recettes"));
      },

      loadUnits() {
        unitStore.init(
          units => {
            if (units.length === 0) {
              notyf.alert("Aucune unité trouvée")
            }
          }, () => notyf.alert('Erreur lors de la récupération des unités'));
      }
    },

    mounted() {
      this.loadUnits();
      this.loadRecipes();
    }
  }
</script>
