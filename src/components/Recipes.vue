<template>
  <div class="container-fluid">
    <div class="row">
      <app-recipe-search class="mb-2"></app-recipe-search>
    </div>
    <div class="row">
      <div class="col">
        <app-recipe-list @selected="displayRecipe"></app-recipe-list>
      </div>
      <div id="recipe-panel" v-if="selected" class="col-6 col-md-4 col-lg-3">
        <div class="alert alert-light alert-dismissible mb-1" role="alert">
          <p class="mb-2"><strong>{{selected.title}}</strong></p>
          <button type="button" class="close" aria-label="Close" @click="selected = null" title="Fermer">
            <span aria-hidden="true">&times;</span>
          </button>
          <ul style="list-style: none; padding-left: 0px;">
            <li v-for="item in selected.ingredients">
            <span v-if="item.amount">{{item.amount}}</span>
            <span v-if="item.unit">{{item.unit.name}} de </span>
            {{item.name}}
            </li>
          </ul>
          <p>
            <span class="mr-3" title="Temps de préparation">
              <span class="mdi mdi-silverware-spoon mr-2"></span>{{selected.preparationTime}} min
            </span>
            <span title="Temps de cuisson">
              <span class="mdi mdi-stove mr-2"></span>{{selected.cookingTime}} min
            </span>
          </p>
        </div>
        <button type="button" class="btn btn-info col mx-1 mb-2" disabled>Modifier</button>
        <button type="button" class="btn btn-danger col mx-1 mb-3" disabled>Supprimer</button>
      </div>
    </div>
  </div>
</template>

<script>
  import RecipeList from './RecipeList.vue';
  import RecipeForm from './RecipeForm.vue';
  import RecipeSearch from './RecipeSearch.vue';
  import eventBus from 'js/application/eventBus.js';

  export default {
    components: {
      'app-recipe-list': RecipeList,
      'app-recipe-form': RecipeForm,
      'app-recipe-search': RecipeSearch
    },

    data() {
      return {
        selected: null
      }
    },

    methods: {
      displayRecipe(recipe) {
        this.selected = recipe;
      }
    }
  }
</script>
