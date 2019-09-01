<template>
  <div class="container-fluid" id="recipe-list">
    <div class="row">
      <div class="col">
        <small>{{filtered ? filter.length : recipes.length}} recettes trouvées</small>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4" v-for="recipe in display" :key='recipe.id'>
        <app-recipe :recipe="recipe" @selected="selected"></app-recipe>
      </div>
    </div>
    <!--
    <div class="card-columns">
      <app-recipe :recipe="recipe" v-for="recipe in display" :key='recipe.id' @selected="selected"></app-recipe>
    </div>
  -->
  </div>
</template>

<script>
  import Recipe from './RecipeListItem.vue';
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
        let result = [];

        this.recipes.forEach(recipe => {
          if (!this.filtered || this.filter.includes(recipe.id)) {
            result.push(recipe);
          }
        });

        return result;
      }
    },

    methods: {
      selected(id) {
        const recipe = recipeStore.get(id);
        this.$emit('selected', recipe);
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
