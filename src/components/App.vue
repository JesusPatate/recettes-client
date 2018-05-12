<template>
  <div class="hero is-light is-fullheight">
    <app-header></app-header>

    <div class="hero-body">
      <div class="container">
        <app-recipes></app-recipes>
        <app-recipe-form :show="showAddRecipeModal" @close="showAddRecipeModal = false"></app-recipe-form>
        <button id="addRecipeBtn" class="button is-outlined is-success" title="Ajouter une recette" @click="showAddRecipeModal = true">+</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  #addRecipeBtn {
    position: fixed;
    bottom: 1em;
    right: 1em; 
  }
</style>

<script>
  import 'bulma';
  import 'assets/css/index.css';
  import Header from './Header.vue';
  import ListRecipes from './ListRecipes.vue';
  import EditForm from './EditForm2.vue';

  export default {
    components: {
      'app-header': Header,
      'app-recipes': ListRecipes,
      'app-recipe-form': EditForm
    },

    data() {
      return {
        showAddRecipeModal: false
      };
    },

    methods: {

    }
  }
</script>
