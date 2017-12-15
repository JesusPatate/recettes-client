<template>
  <div class="hero is-light">
    <app-header></app-header>

    <div class="hero-body">
      <div class="container">
        <app-menu @listRecipes="listRecipes()" @addRecipe="addRecipe()"></app-menu>

        <section id="recipe-list" v-if="displayRecipes">
          <app-recipes></app-recipes>
        </section>

        <section id="recipe-form" v-if="displayEditForm">
          <app-recipe-form></app-recipe-form>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  import 'bulma';
  import 'assets/css/index.css';
  import Header from './Header.vue';
  import Menu from './Menu.vue';
  import ListRecipes from './ListRecipes.vue';
  import EditForm from './EditForm.vue';

  export default {
    components: {
      'app-header': Header,
      'app-menu': Menu,
      'app-recipes': ListRecipes,
      'app-recipe-form': EditForm
    },
    data() {
      return {
        displayRecipes: true,
        displayEditForm: false
      };
    },
    methods: {
      listRecipes() {
        this.displayRecipes = true;
        this.displayEditForm = false;
      },

      addRecipe() {
        this.displayRecipes = false;
        this.displayEditForm = true;
      }
    }
  }
</script>
