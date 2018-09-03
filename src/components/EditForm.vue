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

    <div class="field">
      <p class="control">
        <input type="button" class="button is-primary" id="btnSubmit" value="Valider" @click="saveRecipe">
      </p>
    </div>
  </form>
</template>

<style scoped>
  #btnSubmit {
    margin-top: 0.75rem;
  }
</style>

<script>
  import Ingredient from 'js/model/Ingredient.js';
  import Recipe from 'js/model/Recipe.js';
  import RecipeManagementService from 'js/application/RecipeManagementService.js';
  import UnitManagementService from 'js/application/UnitManagementService.js';
  import notyf from 'js/notyf.js';

  /**
   * Retrieves a unit from its identifier.
   *
   * @param id The identifier of the unit
   * @param units Available units
   */
  function getUnit(id, units) {
    for (let index in units) {
      const unit = units[index];

      if (unit.id == id) {
        return unit;
      }
    }

    return null;
  }

  export default {
    props: {
      recipe: {
        type: Object,
        required: true
      }
    },

    data() {
      return {
        recipeMgmtService: new RecipeManagementService(),
        unitMgmtService: new UnitManagementService(),
        units: []
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
        this.recipe.ingredients[index].unit = getUnit(unitId, this.units);
      },

      /**
       * Saves the recipe.
       */
      saveRecipe() {
        const vm = this;
        this.recipeMgmtService.saveRecipe(vm.recipe,
          function() {
            notyf.confirm("Recette \"" + vm.recipe.title + "\" sauvegardée.");
            vm.recipe = new Recipe();
          },
          function() {
            notyf.alert('Erreur lors de la sauvegarde de la recette');
          });
      }
    },

    mounted() {
      // For new recipes with no ingredients, add an empty ingredient line
      if (this.recipe.ingredients.length === 0) {
        this.recipe.ingredients.push(new Ingredient());
      }
    }
  }
</script>