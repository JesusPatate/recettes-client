<template>
    <div>
        <app-recipe-list></app-recipe-list>
        <app-recipe-form ref="editForm"
            :show="showAddRecipeModal"
            :units="units"
            @close="showAddRecipeModal = false">
        </app-recipe-form>
        <button id="addRecipeBtn"
            class="button is-outlined is-success"
            title="Ajouter une recette"
            @click="showAddRecipeModal = true">
          + 
        </button>
    </div>
</template>

<script>
  import RecipeList from './RecipeList.vue';
  import EditForm from './EditForm2.vue';
  import UnitManagementService from 'js/application/UnitManagementService.js';
  import RecipeManagementService from 'js/application/RecipeManagementService.js';
  import notyf from 'js/notyf.js';
  import recipeStore from 'js/application/recipeStore.js';
  import unitStore from 'js/application/unitStore.js';
  import { eventBus } from 'js/application/eventBus.js';

  export default {
    components: {
      'app-recipe-list': RecipeList,
      'app-recipe-form': EditForm
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
      }
    },

    mounted() {
      this.loadUnits();
      this.loadRecipes();
    }
  }
</script>