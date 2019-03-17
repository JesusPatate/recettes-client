<template>
  <div>
    <app-header></app-header>
    <component :is="currentView"></component>
  </div>
</template>

<script>
  import 'bootstrap';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import 'mdi/css/materialdesignicons.min.css'
  import 'assets/css/index.css';
  import Header from './Header.vue';
  import Recipes from './Recipes.vue';
  import RecipeForm from './RecipeForm.vue';
  import eventBus from 'js/application/eventBus.js';
  import unitManagementService from 'js/application/unitManagementService.js';
  import recipeManagementService from 'js/application/recipeManagementService.js';
  import recipeStore from 'js/application/recipeStore.js';
  import unitStore from 'js/application/unitStore.js';
  import notyf from 'js/notyf.js';

  export default {
    components: {
      'app-header': Header,
      'app-recipes': Recipes,
      'app-recipe-form': RecipeForm
    },

    data() {
      return {
        currentView: 'app-recipes'
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
    },

    created() {
      eventBus.$on('show-recipe-list', () => {
        this.currentView = 'app-recipes';
      });

      eventBus.$on('show-recipe-form', () => {
        this.currentView = 'app-recipe-form';
      });
    }
  }
</script>
