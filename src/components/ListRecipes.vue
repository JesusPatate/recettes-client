<template>
  <div>
    <div class="columns" v-for="recipe in recipes">
      <app-recipe :recipe="recipe">
        <p class="control">
          <a class="button is-success is-outlined" @click="notAvailable()" title="Sélectionner">
            <span class="icon">
              <i class="mdi mdi-check-circle"></i>
            </span>
          </a>
        </p>
        <p class="control">
          <a class="button is-info is-outlined" @click="editRecipe(recipe)" title="Éditer">
          <span class="icon">
            <i class="mdi mdi-pencil"></i>
          </span>
        </a>
        </p>
        <p class="control">
          <a class="button is-danger is-outlined" @click="deleteRecipe(recipe);" title="Supprimer">
          <span class="icon">
            <i class="mdi mdi-delete-forever"></i>
          </span>
        </a>
        </p>
      </app-recipe>
    </div>
  </div>
</template>

<script>
  import Recipe from './Recipe.vue';
  import RecettesApiClient from 'js/presentation/RecettesApiClient.js';
  import RecipeManagementService from 'js/application/RecipeManagementService.js';
  import notyf from 'js/notyf.js';

  export default {
    components: {
      'app-recipe': Recipe
    },

    props: ['recipes'],

    data() {
      return {
        recipeMgmtService: new RecipeManagementService(),
        apiClient: new RecettesApiClient(),
        message: null
      };
    },

    methods: {
      notAvailable() {
        notyf.alert('Fonctionnalité non disponible pour le moment');
      },

      editRecipe(recipe) {
          this.$emit('editRecipe', recipe);
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
    }
  }
</script>