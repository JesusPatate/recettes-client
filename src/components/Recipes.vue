<template>
  <div class="container-fluid">
    <div v-if="action === 'list'" class="row">
      <div class="container-fluid">
        <div class="row">
          <app-recipe-search class="mb-2"></app-recipe-search>
        </div>
        <div class="row">
          <div id="recipe-list" class="col">
            <app-recipe-list @selected="displayRecipeDetails"></app-recipe-list>
          </div>
          <div id="recipe-panel" v-if="selectedRecipe" class="col-md-4 col-lg-3">
            <app-recipe-panel
              :recipe="selectedRecipe"
              @remove="removeRecipe"
              @edit="action = 'edit'"
              @close="selectedRecipe = null"
            >
            </app-recipe-panel>
          </div>
        </div>
      </div>
    </div>
    <div v-if="action === 'add'" class="row">
      <app-add-recipe :units="units"></app-add-recipe>
    </div>
    <div v-if="action === 'edit'" class="row">
      <app-edit-recipe :units="units" :recipe="selectedRecipe"></app-edit-recipe>
    </div>
  </div>
</template>

<script>
  import AddRecipe from './AddRecipe.vue';
  import EditRecipe from './EditRecipe.vue';
  import RecipeList from './RecipeList.vue';
  import RecipePanel from './RecipePanel.vue';
  import RecipeSearch from './RecipeSearch.vue';
  import eventBus from 'js/application/eventBus.js';
  import recipeService from 'js/application/recipeManagementService.js';
  import unitService from 'js/application/unitManagementService.js';

  export default {

    data() {
      return {
        action: 'list',
        selectedRecipe: null,
        units: []
      }
    },

    methods: {
      loadRecipes() {
        const vm = this;

        recipeService.getAll(
          recipes => {
            vm.recipes = recipes;

            if (recipes.length === 0) {
              notyf.alert("Aucune recette trouvée");
            }
          },
          () => notyf.alert("Erreur lors de la récupération des recettes")
        );
      },

      loadUnits() {
        const vm = this;

        unitService.getAll(
          units => {
            vm.units = units;

            if (units.length === 0) {
              notyf.alert("Aucune unité trouvée")
            }
          },
          () => notyf.alert('Erreur lors de la récupération des unités')
        );
      },

      displayRecipeDetails(id) {
        this.selectedRecipe = recipeService.get(id);
      },

      removeRecipe(recipe) {
        const vm = this;

        recipeService.delete(
          recipe.id,
          () => { vm.action = 'list'; },
          () => eventBus.$emit('error', 'Suppression de la recette échouée')
        );

        this.selectedRecipe = null;
      }
    },

    created() {
      const vm = this;

      this.loadUnits();
      this.loadRecipes();

      eventBus.$on(
        'menu-add-recipe',
        () => vm.action = 'add'
      );

      eventBus.$on(
        'menu-list-recipes',
        () => vm.action = 'list'
      );

      eventBus.$on(
        'new-recipe',
        recipe => {
          vm.displayRecipeDetails(recipe.id);
          vm.action = 'list';
        }
      );

      eventBus.$on(
        'recipe-updated',
        recipe => {
          vm.displayRecipeDetails(recipe.id);
          vm.action = 'list';
        }
      );
    },

    components: {
      'app-recipe-list': RecipeList,
      'app-recipe-search': RecipeSearch,
      'app-recipe-panel': RecipePanel,
      'app-add-recipe': AddRecipe,
      'app-edit-recipe': EditRecipe
    }
  }
</script>
