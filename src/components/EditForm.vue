<template>
  <form>
    <div class="field">
      <label class="label" for="inputName">Titre : </label>
      <p class="control">
        <input class="input" type="text" id="inputName" v-model="recipe.title">
      </p>
    </div>
    
    <div class="field">
      <label class="label">Catégories : </label>
      <p class="control is-unselectable">
        <label class="radio">
          <input class="checkbox" type="checkbox" id="hot" v-model="recipe.hot">
          Plat chaud
        </label>

        <label class="radio">
          <input class="checkbox" type="checkbox" id="dessert" v-model="recipe.dessert">
          Dessert
        </label>
      </p>
    </div>

    <div class="field">
      <label class="label" for="preparationTime">Temps de préparation : </label>
      <div class="field has-addons">
        <p class="control">
          <input class="input" type="number" id="preparationTime" min="1" value="1" v-model="recipe.preparationTime">
        </p>

        <p class="control">
          <span class="select">
            <select id="selectPrepTime">
              <option>minutes</option>
              <option>heures</option>
            </select>
          </span>
        </p>
      </div>
    </div>

    <div class="field">
      <label class="label" for="cookingTime">Temps de cuisson : </label>
      <div class="field has-addons">
        <p class="control">
          <input class="input" type="number" id="cookingTime" min="0" v-model="recipe.cookingTime">
        </p>

        <p class="control">
          <span class="select">
            <select>
              <option>minutes</option>
              <option>heures</option>
            </select>
          </span>
        </p>
      </div>
    </div>

    <div class="field">
      <label class="label" for="inputServings">Nombre de portions : </label>
      <p class="control">
        <input class="input" type="number" id="inputServings" min="1" value="1" v-model="recipe.servings">
      </p>
    </div>

    <div class="field">
      <label class="label">Ingredients : </label>
      <div class="field">
        <template  v-for="(item, index) of recipe.ingredients">
          <div class="columns">
            <div class="column">
              <p class="control">
                <input class="input" type="text" :id="'ingredient' + index" placeholder="Nom" v-model="item.name">
              </p>
            </div>

            <div class="column">
              <p class="control">
                <input class="input" type="number" :id="'amount' + index" min="1" placeholder="Quantité" v-model="item.amount">
              </p>
            </div>

            <div class="column">
              <p class="control">
                <span class="select is-fullwidth">
                  <select v-model="item.unit" :id="'unit' + index">
                    <option value="" disabled selected>Unité</option>
                    <option v-for="unit of units" :value="unit.id">{{unit.name}}</option>
                  </select>
                </span>
              </p>
            </div>

            <div class="column">
              <p class="control">
                <a class="button is-light" @click="removeIngredient(index)">
                  <span class="icon is-small">
                    <i class="delete" v-if="index > 0"></i>
                  </span>
                </a>
              </p>
            </div>
          </div>
        </template>

        <div class="field">
          <p class="control">
              <input type="button" class="button is-primary" id="btnAddIngredient" value="Ajouter un ingrédient" @click.prevent="addIngredient">
          </p>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label" for="source">Source : </label>
      <p class="control">
        <input class="input" type="text" id="source" v-model="recipe.source">
      </p>
    </div>

    <div class="field">
      <p class="control">
        <input type="button" class="button is-primary" id="btnSubmit" value="Ajouter la recette" @click="sendRecipe">
      </p>
    </div>
  </form>
</template>

<script>
  import axios from 'axios';
  import Recipe from 'js/Recipe.js';
  import Ingredient from 'js/Ingredient.js';
  import RecettesApiClient from 'js/RecettesApiClient.js';
  import notyf from 'js/Notyf.js';

  const initRecipe = function() {
    const recipe = new Recipe();
    recipe.ingredients.push(new Ingredient());
    return recipe;
  };

  export default {
    props: {
      recipe: {
        type: Object,
        default() {
          return initRecipe()
        }
      }
    },

    data() {
      return {
        apiClient: new RecettesApiClient(),
        units: []
      };
    },

    methods: {
      /**
       * Adds a new ingredient to the recipe.
       */
      addIngredient() {
        this.recipe.ingredients.push(new Ingredient());
      },

      /**
       * Removes an ingredient of the recipe.
       *
       * @param index The index of the ingredient to be removed
       */
      removeIngredient(index) {
        this.recipe.ingredients.splice(index, 1);
      },

      sendRecipe() {
        const vm = this;

        this.apiClient.saveRecipe(this.recipe,
          function() {
            notyf.confirm("Recette \"" + vm.recipe.title + "\" ajoutée.");
            vm.recipe = initRecipe();
          },
          function() {
            notyf.alert('Erreur lors de la création de la recette');
          }
        );
      }
    },

    mounted() {
      this.apiClient.getUnits(units => this.units = units);
    }
  }
</script>