<template>
  <div class="container-fluid">
    <div class="row">
      <app-recipe-search class="mb-2"></app-recipe-search>
    </div>
    <div class="row">
      <div class="col">
        <app-recipe-list @selected="selectedRecipe = $event"></app-recipe-list>
      </div>
      <div id="recipe-panel" v-if="selectedRecipe" class="col-6 col-md-4 col-lg-3">
        <app-recipe-panel
          :recipe="selectedRecipe"
          @remove="removeRecipe"
          @close="selectedRecipe = null"
        >
      </app-recipe-panel>
      </div>
    </div>
  </div>
</template>

<script>
  import RecipeList from './RecipeList.vue';
  import RecipePanel from './RecipePanel.vue';
  import RecipeForm from './RecipeForm.vue';
  import RecipeSearch from './RecipeSearch.vue';
  import eventBus from 'js/application/eventBus.js';
  import recipeStore from 'js/application/recipeStore.js';

  export default {
    components: {
      'app-recipe-list': RecipeList,
      'app-recipe-form': RecipeForm,
      'app-recipe-search': RecipeSearch,
      'app-recipe-panel': RecipePanel
    },

    data() {
      return {
        selectedRecipe: null
      }
    },

    methods: {
      removeRecipe(recipe) {
        eventBus.$emit('remove-recipe', recipe);
        this.selectedRecipe = null;
      }
    }
  }
</script>
