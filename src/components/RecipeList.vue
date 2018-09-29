<!--
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
-->

<template>
  <div class="container-fluid" id="recipe-list">
    <div class="row">
      <div class="col">
        <small>{{filtered ? filter.length : recipes.length}} recettes trouvées</small>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4" v-for="recipe in recipes" :key='recipe.id' v-if="!!display[recipe.id]">
        <app-recipe :recipe="recipe"></app-recipe>
      </div>
    </div>
    <!--
    <div class="card-columns">
      <app-recipe :recipe="recipe" v-for="recipe in recipes" :key='recipe.id' v-if="display[recipe.id]"></app-recipe>
    </div>
    -->
  </div>
</template>

<script>
  import Recipe from './Recipe.vue';
  import recipeManagementService from 'js/application/recipeManagementService.js';
  import notyf from 'js/notyf.js';
  import recipeStore from 'js/application/recipeStore.js';
  import eventBus from 'js/application/eventBus.js';

  export default {
    components: {
      'app-recipe': Recipe
    },

    data() {
      return {
        recipes: recipeStore.items,
        recipeMgmtService: recipeManagementService,
        filter: [],
        filtered: false
      };
    },

    computed: {
      display: function() {
        let result = {};

        this.recipes.forEach(recipe => {
          result[recipe.id] = !this.filtered || this.filter.includes(recipe.id);
        });

        return result;
      }
    },

    methods: {
      notAvailable() {
        notyf.alert('Fonctionnalité non disponible pour le moment');
      },

      editRecipe(recipe) {
          eventBus.$emit('edit-recipe', recipe.id);
      },

      deleteRecipe(recipe) {
        const ok = confirm("Supprimer la recette \"" + recipe.title + "\" ?");

        if (ok) {
          recipeStore.remove(recipe.id,
            () => notyf.confirm("Recette \"" + recipe.title + "\" supprimée."),
            () => notyf.alert('Erreur lors de la suppression de la recette'));
        }
      }
    },

    created() {
      eventBus.$on('filter-recipes', ids => {
        this.filter.splice(0, this.filter.length, ...ids);
        this.filtered = true;
      });

      eventBus.$on('clear-filter', () => {
        this.filter.splice(0, this.filter.length);
        this.filtered = false;
      });
    }
  }
</script>
