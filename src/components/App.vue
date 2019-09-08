<template>
  <div>
    <app-header @selected="action = $event"></app-header>
    <app-recipes v-if="action === 'list'"></app-recipes>
    <app-add-recipe v-if="action === 'add'"></app-add-recipe>
  </div>
</template>

<script>
  import 'bootstrap';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import 'mdi/css/materialdesignicons.min.css'
  import 'assets/css/index.css';
  import Header from './Header.vue';
  import Recipes from './Recipes.vue';
  import AddRecipe from './AddRecipe.vue';
  import eventBus from 'js/application/eventBus.js';
  import recipeService from 'js/application/recipeManagementService.js';
  import unitService from 'js/application/unitManagementService.js';
  import notyf from 'js/notyf.js';

  export default {
    data() {
      return {
        recipes: [],
        units: [],
        action: 'list'
      };
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
      }
    },

    mounted() {
      this.loadUnits();
      this.loadRecipes();
    },

    created() {
      const vm = this;

      eventBus.$on(
        'selected',
        action => { vm.action = action; }
      );

      eventBus.$on(
        'new-recipe',
        recipe => recipeService.create(
          recipe,
          () => { vm.action = 'list'; },
          () => notyf.alert("Insertion de la nouvelle recette échouée")
        )
      );

      eventBus.$on(
        'remove-recipe',
        recipe => recipeService.delete(
          recipe.id,
          () => { vm.action = 'list'; },
          () => notyf.alert("Suppression de la recette échouée")
        )
      );
    },

    components: {
      'app-header': Header,
      'app-recipes': Recipes,
      'app-add-recipe': AddRecipe
    }
  }
</script>
