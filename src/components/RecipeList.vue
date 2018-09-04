<template>
  <div>
    <div class="columns" v-for="recipe in recipes" :key='recipe.id'>
      <app-recipe :recipe="recipe">
        <p class="control">
          <a class="button is-success is-outlined" @click="notAvailable()" title="Sélectionner">
            <span class="icon">
              <i class="mdi mdi-check-circle"></i>
            </span>
          </a>
        </p>
        <p class="control">
          <a class="button is-info is-outlined" @click="editRecipe(recipe);" title="Éditer">
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
  import recipeStore from 'js/application/recipeStore.js';
  import { eventBus } from 'js/application/eventBus.js';

  export default {
    components: {
      'app-recipe': Recipe
    },

    data() {
      return {
        recipes: recipeStore.items,
        recipeMgmtService: new RecipeManagementService()
      };
    },

    methods: {
      notAvailable() {
        notyf.alert('Fonctionnalité non disponible pour le moment');
      },

      editRecipe(recipe) {
          eventBus.$emit('editRecipe', recipe.id);
      },

      deleteRecipe(recipe) {
        const ok = confirm("Supprimer la recette \"" + recipe.title + "\" ?");

        if (ok) {
          recipeStore.remove(recipe.id,
            () => notyf.confirm("Recette \"" + recipe.title + "\" supprimée."),
            () => notyf.alert('Erreur lors de la suppression de la recette'));
        }
      }
    }
  }
</script>