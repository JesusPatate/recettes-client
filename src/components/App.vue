<template>
  <div class="container-fluid">
    <app-header></app-header>
    <app-recipes></app-recipes>
  </div>
</template>

<script>
  import 'bootstrap';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import 'mdi/css/materialdesignicons.min.css'
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
