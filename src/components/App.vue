<template>
  <div>
    <app-header></app-header>
    <keep-alive>
      <component :is="currentView"></component>
    </keep-alive>
  </div>
</template>

<script>
  import 'bootstrap';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import 'mdi/css/materialdesignicons.min.css'
  import 'assets/css/index.css';
  import Header from './Header.vue';
  import Recipes from './Recipes.vue';
  import RecipeForm from './RecipeForm.vue';
  import eventBus from 'js/application/eventBus.js';

  export default {
    components: {
      'app-header': Header,
      'app-recipes': Recipes,
      'app-recipe-form': RecipeForm
    },

    data() {
      return {
        currentView: 'app-recipes'
      };
    },

    created() {
      eventBus.$on('show-recipe-list', () => {
        this.currentView = 'app-recipes';
      });

      eventBus.$on('show-recipe-form', () => {
        this.currentView = 'app-recipe-form';
      });
    }
  }
</script>
