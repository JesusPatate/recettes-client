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
        this.recipes = this.apiClient.getRecipes();
      },

      notAvailable() {
        notyf.alert('Fonctionnalité non disponible pour le moment');
      },

      deleteRecipe(recipe) {
        const ok = confirm("Supprimer la recette \"" + recipe.title + "\" ?");

        if (ok) {
          this.apiClient.deleteRecipe(recipe.id, () => {
            const index = this.recipes.findIndex((r) => r.id === recipe.id);
            this.recipes.splice(index, 1);
            notyf.alert("Recette \"" + recipe.title + "\" supprimée");
          });
        }
      }
    },

    mounted() {
      this.loadRecipes();
    }
  }
</script>