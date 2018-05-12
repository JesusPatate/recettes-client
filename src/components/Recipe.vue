<template>
  <div class="column is-8 is-offset-2">
    <a class="button recipe-button" @click="toggle">
      <span class="recipe-title">{{recipe.title}}</span>
      <span class="tag is-rounded is-hidden-mobile is-danger" v-if="recipe.hot">chaud</span>
      <span class="tag is-rounded is-hidden-mobile is-warning" v-if="recipe.dessert">dessert</span>
    </a>
    <div class="panel recipe-details" v-if="showDetails">
      <p class="panel-block">
        <ul>
          <li>Préparation : {{recipe.preparationTime}} minutes</li>
          <li>Cuisson : {{recipe.cookingTime}} minutes</li>
          <li>Portions : {{recipe.servings}}</li>
          <li v-if="recipe.source">Source : {{recipe.source}}</li>
        </ul>
      </p>
      <p class="panel-block">
        <ul>
          <li v-for="item in recipe.ingredients">
            {{item.name}}
            <span v-if="item.amount">
               : {{item.amount}}<span v-if="item.unit"> {{item.unit.name}}</span>
            </span>
          </li>
        </ul>
      </p>
      <div class="panel-block">
        <div class="field is-grouped">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  a.recipe-button {
    width: 100%;
  }

  span.recipe-title {
    margin-right: 1em;
  }
  .recipe-details {
    background-color: #FBFBFB;
    margin-top: 0.2em;
  }

  .tag + .tag {
    margin-left: 1em;
  }

  .recipe-button > .tag {
    /*opacity: 0.6;*/
  }
</style>

<script>
  import 'mdi/css/materialdesignicons.min.css';

  export default {
    props: {
      recipe: {
        type: Object,
        required: true
      }
    },

    data() {
      return {
        showDetails: false
      }
    },

    methods: {
      toggle() {
        this.showDetails = !this.showDetails;
      }
    }
  }
</script>