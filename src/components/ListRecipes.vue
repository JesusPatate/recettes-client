<template>
  <div>
    <div class="columns" v-for="recipe in recipes">
      <app-recipe :recipe="recipe">
        <a class="button is-success is-outlined" @click="notAvailable()" title="Sélectionner">
          <span class="icon">
            <i class="mdi mdi-check-circle"></i>
          </span>
        </a>

        <a class="button is-info is-outlined" @click="notAvailable()" title="Éditer">
          <span class="icon">
            <i class="mdi mdi-pencil"></i>
          </span>
        </a>

        <a class="button is-danger is-outlined" @click="deleteRecipe(recipe);" title="Supprimer">
          <span class="icon">
            <i class="mdi mdi-delete-forever"></i>
          </span>
        </a>
      </app-recipe>
    </div>
  </div>
</template>

<script>
  import notyf from 'js/Notyf.js';
  import RecettesApiClient from 'js/RecettesApiClient.js';
  import Recipe from './Recipe.vue';

  export default {
    components: {
      'app-recipe': Recipe
    },

    data() {
      return {
        apiClient: new RecettesApiClient(),
        recipes: [],
        message: null
      };
    },

    methods: {
      loadRecipes() {
        const vm = this;

        this.apiClient.getRecipes(
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

      notAvailable() {
        notyf.alert('Fonctionnalité non disponible pour le moment');
      },

      deleteRecipe(recipe) {
        const ok = confirm("Supprimer la recette \"" + recipe.title + "\" ?");

        if (ok) {
          const vm = this;

          this.apiClient.deleteRecipe(recipe.id,
            function() {
              const index = vm.recipes.findIndex((r) => r.id === recipe.id);
              vm.recipes.splice(index, 1);
              notyf.confirm("Recette \"" + recipe.title + "\" supprimée.");
            },
            function() {
              notyf.alert('Erreur lors de la suppression de la recette');
            }
          );
        }
      }
    },

    mounted() {
      this.loadRecipes();
    }
  }
</script>