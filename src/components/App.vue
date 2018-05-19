<template>
  <div class="hero is-light is-fullheight">
    <app-header></app-header>

    <div class="hero-body">
      <div class="container">
        <app-recipes></app-recipes>
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
  import Recipes from './Recipes.vue';

  export default {
    components: {
      'app-header': Header,
      'app-recipes': Recipes,
    }
  }
</script>
