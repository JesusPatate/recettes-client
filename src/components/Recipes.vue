<template>
    <div class="container">
        <app-recipe-list></app-recipe-list>
        <app-recipe-form></app-recipe-form>
        <button id="addRecipeBtn" type="button"
            class="btn btn-sm btn-info mdi mdi-plus rounded-0"
            title="Ajouter une recette"
            @click="addNewRecipe()">
        </button>
    </div>
</template>

<script>
  import RecipeList from './RecipeList.vue';
  import RecipeForm from './RecipeForm.vue';
  import UnitManagementService from 'js/application/UnitManagementService.js';
  import RecipeManagementService from 'js/application/RecipeManagementService.js';
  import notyf from 'js/notyf.js';
  import recipeStore from 'js/application/recipeStore.js';
  import unitStore from 'js/application/unitStore.js';
  import eventBus from 'js/application/eventBus.js';

  export default {
    components: {
      'app-recipe-list': RecipeList,
      'app-recipe-form': RecipeForm
    },

    data() {
      return {
        recipes: recipeStore.items,
        units: unitStore.items,
        unitMgmtService: new UnitManagementService(),
        recipeMgmtService: new RecipeManagementService(),
        showAddRecipeModal: false
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
      },

      addNewRecipe() {
        eventBus.$emit('addNewRecipe');
      }
    },

    mounted() {
      this.loadUnits();
      this.loadRecipes();
    }
  }
</script>
