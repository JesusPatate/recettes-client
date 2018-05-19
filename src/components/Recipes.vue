<template>
    <div>
        <app-recipes :recipes="recipes" @delete="deleteRecipe($event)"></app-recipes>
        <app-recipe-form :show="showAddRecipeModal" :units="units" @close="showAddRecipeModal = false" @save="addRecipe($event)"></app-recipe-form>
        <button id="addRecipeBtn" class="button is-outlined is-success" title="Ajouter une recette" @click="showAddRecipeModal = true">+</button>
    </div>
</template>

<script>
  import ListRecipes from './ListRecipes.vue';
  import EditForm from './EditForm2.vue';
  import UnitManagementService from 'js/application/UnitManagementService.js';
  import RecipeManagementService from 'js/application/RecipeManagementService.js';
  import notyf from 'js/notyf.js';

  export default {
    components: {
      'app-recipes': ListRecipes,
      'app-recipe-form': EditForm
    },

    data() {
      return {
        recipes: [],
        units: [],
        unitMgmtService: new UnitManagementService(),
        recipeMgmtService: new RecipeManagementService(),
        showAddRecipeModal: false
      };
    },

    methods: {
      addRecipe(recipe) {
        this.recipes.push(recipe);
      },

      deleteRecipe(recipe) {
        const index = this.recipes.findIndex((r) => r.id === recipe.id);
        this.recipes.splice(index, 1);
      },

      loadRecipes() {
        const vm = this;

        this.recipeMgmtService.getRecipes(
          function(recipes) {
            vm.recipes = recipes;

            if (recipes.length === 0) {
              notyf.alert("Aucune recette trouvée")
            }
          },
          function() {
            notyf.alert("Erreur lors de la récupération des recettes");
          }
        );
      },

      loadUnits() {
        this.unitMgmtService.getUnits(units => this.units = units,
          () => notyf.alert('Erreur lors de la récupération des unités'));
      }
    },

    mounted() {
      this.loadRecipes();
      this.loadUnits();
    }
  }
</script>