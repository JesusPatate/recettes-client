<template>
  <div class="modal" :class="{'is-active': display}">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Ajouter une recette</p>
        <button class="delete" aria-label="close" @click="discard"> </button>
      </header>
      <section class="modal-card-body">
        <app-alert :message="message" @validate="message = ''"></app-alert>
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
                  <select :id="'unit' + index" @change="setUnit(index, $event)">
                    <option value="-1" disabled :selected="getUnitId(index) === null">Unité</option>
                    <option v-for="unit of units" :value="unit.id" :selected="getUnitId(index) == unit.id">{{unit.name}}</option>
                  </select>
                </span>
              </p>
            </div>

            <div class="column">
              <p class="control">
                <a class="button is-light" @click="removeIngredient(index)" v-if="index > 0">
                  <span class="icon is-small">
                    <i class="delete"></i>
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
        </form>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="save">Ajouter</button>
        <button class="button" @click="discard">Annuler</button>
      </footer>
    </div>
  </div>
</template>

<script>
  import Recipe from 'js/model/Recipe.js';
  import Ingredient from 'js/model/Ingredient.js';
  import Alert from './Alert.vue';
  import notyf from 'js/notyf.js';
  import recipeStore from 'js/application/recipeStore.js';
  import unitStore from 'js/application/unitStore.js';
  import eventBus from 'js/application/eventBus.js';

  export default {
    components: {
      'app-alert': Alert,
    },

    props: {
      show: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        display: this.show,
        recipe: new Recipe(),
        units: unitStore.items,
        edition: false,
        message: ""
      };
    },

    methods: {
      /**
       * Adds a new empty ingredient line.
       */
      addIngredient() {
        this.recipe.ingredients.push(new Ingredient());
      },

      /**
       * Removes an ingredient.
       *
       * @param index The index of the ingredient to be removed
       */
      removeIngredient(index) {
        this.recipe.ingredients.splice(index, 1);
      },

      getUnitId(index) {
        const unit = this.recipe.ingredients[index].unit;

        return (unit != null) ? unit.id.toString() : null;
      },

      /**
       * Sets a unit to an ingredient.
       *
       * @param index The index of the ingredient
       * @param event The onChange event
       */
      setUnit(index, event) {
        const unitId = event.target.value;
        this.recipe.ingredients[index].unit = unitStore.get(unitId);
      },

      save() {
        const vm = this;

        let onSuccess = function(recipe) {
          vm.message = 'Recette "' + recipe.title + '\" sauvegardée.';
          vm.discard();
        };

        let onError = function() {
          vm.message = 'Erreur lors de la sauvegarde de la recette';
        };

        if (this.edition) {
          recipeStore.update(vm.recipe, onSuccess, onError);
        } else {
          recipeStore.add(vm.recipe, onSuccess, onError);
        }
      },

      discard() {
        this.display = false;
        this.recipe = new Recipe();
        this.recipe.ingredients.push(new Ingredient());
        this.message = "";
      }
    },

    created() {
      const vm = this;

      eventBus.$on('addNewRecipe', function(id) {
        vm.edition = false;
        vm.display = true;
      });

      eventBus.$on('editRecipe', function(id) {
        let recipe = recipeStore.get(id);
        vm.recipe = Recipe.from(recipe);
        vm.edition = true;
        vm.display = true;
      });
    },

    mounted() {
      // For new recipes with no ingredients, add an empty ingredient line
      if (this.recipe.ingredients.length === 0) {
        this.recipe.ingredients.push(new Ingredient());
      }
    }
  }
</script>
