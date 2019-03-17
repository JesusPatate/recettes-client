<template>
  <form>
    <div class="container">
      <div class="row my-2">
        <div class="col">
          <h3>Nouvelle recette</h3>
        </div>
      </div>

      <!-- Title -->
      <div class="form-group row">
        <label for="titleInput" class="col-md-2 col-form-label">Titre</label>
        <div class="col">
          <input type="text" class="form-control" id="titleInput" v-model="recipe.title">
        </div>
      </div>

      <!-- Categories -->
      <fieldset class="form-group">
        <div class="row">
          <legend class="col-md-2 col-form-label pt-0">Catégories</legend>
          <div class="col">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="hotCheckbox" v-model="recipe.hot">
              <label class="form-check-label ml-2" for="hotCheckbox">Plat chaud</label>
            </div>
              <div class="form-check mt-1">
                <input class="form-check-input" type="checkbox" id="dessertCheckbox" v-model="recipe.dessert">
                <label class="form-check-label ml-2" for="dessertCheckbox">Dessert</label>
              </div>
          </div>
        </div>
      </fieldset>

      <!-- Preparation time -->
      <div class="form-group row">
        <label for="prepTimeInput" class="col-md-2 col-form-label">Temps de prépraration</label>
        <div class="col-md-auto">
          <div class="input-group">
            <input type="number" class="form-control" id="prepTimeInput" value="1" min="1" v-model.number="recipe.preparationTime">
            <div class="input-group-append">
              <select class="custom-select">
                <option>minutes</option>
                <option>heures</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Cooking time -->
      <div class="form-group row">
        <label for="cookingTimeInput" class="col-md-2 col-form-label">Temps de cuisson</label>
        <div class="col-md-auto">
          <div class="input-group">
            <input type="number" class="form-control" id="cookingTimeInput" value="0" min="0" v-model.number="recipe.cookingTime">
            <div class="input-group-append">
              <select class="custom-select">
                <option>minutes</option>
                <option>heures</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Servings -->
      <div class="form-group row">
        <label for="servingsInput" class="col-md-2 col-form-label">Nombre de portions</label>
        <div class="col-auto">
          <input type="number" class="form-control" id="servingsInput" value="1" min="1" v-model.number="recipe.servings">
        </div>
      </div>

      <!-- Ingredient -->
      <fieldset class="form-group">
        <div class="row">
          <legend class="col-md-2 col-form-label pt-0">Ingrédients</legend>
          <div class="col">
            <p>
              <a href="#" @click.prevent="displayIngredientForm = true">Ajouter un nouvel ingrédient</a>
            </p>

            <div v-if="displayIngredientForm" class="alert alert-secondary">
              <div class="form-group row">
                <label class="col-md-2 col-form-label" for="ingredientName">Nom</label>
                <div class="col cl-md-auto">
                  <input class="form-control" type="text" id="ingredientName" v-model="ingredient.name">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-2 col-form-label" for="ingredientQty">Quantité</label>
                <div class="col col-sm-5">
                  <div class="input-group">
                    <input type="number" class="form-control" id="ingredientQty" value="0" min="0" v-model.number="ingredient.amount">
                    <div class="input-group-append">
                      <select class="custom-select" v-model="ingredient.unitId">
                        <option value="0">Unité</option>
                        <option v-for="unit in units" :value="unit.id">
                          {{unit.name}}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <button class="btn btn-primary" @click.prevent="dropIngredient">Annuler</button>
              <button class="btn btn-primary" @click.prevent="addIngredient">Valider</button>
            </div>

            <ul class="form-group">
              <li class="col" v-for="(ingredient, index) in recipe.ingredients">
                <span v-if="ingredient.amount">{{ingredient.amount}}</span>
                <span v-if="ingredient.unit">{{ingredient.unit.name}} de </span>
                {{ingredient.name}}
                <button class="btn btn-link-outline" @click="removeIngredient(index)">
                  <i class="mdi mdi-close-circle"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </fieldset>

      <!-- Source -->
      <div class="form-group row">
        <label for="sourceInput" class="col-md-2 col-form-label">Source</label>
        <div class="col">
          <input type="text" class="form-control" id="sourceInput" v-model="recipe.source">
        </div>
      </div>

      <div class="form-group row">
        <div class="col">
          <button class="btn btn-primary" @click.prevent="cancel">Annuler</button>
          <button class="btn btn-primary" @click.prevent="submit">Valider</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
  import Recipe from 'js/model/Recipe.js';
  import Ingredient from 'js/model/Ingredient.js';
  import notyf from 'js/notyf.js';
  import recipeStore from 'js/application/recipeStore.js';
  import unitStore from 'js/application/unitStore.js';
  import eventBus from 'js/application/eventBus.js';

  export default {
    data() {
      return {
        units: unitStore.items,
        recipe: new Recipe(),
        ingredient: {
          name: "",
          amount: null,
          unitId: null
        },
        displayIngredientForm: false
      };
    },

    methods: {
      dropIngredient() {
        this.displayIngredientForm = false;
        this.resetIngredient();
      },

      addIngredient() {
        if (this.ingredient.name.length > 0) {
          this.recipe.ingredients.push({
            name: this.ingredient.name,
            amount: this.ingredient.amount,
            unit: unitStore.get(this.ingredient.unitId)
          });

          this.displayIngredientForm = false;
          this.resetIngredient();
        }
      },

      resetIngredient() {
        this.ingredient = {
          name: "",
          amount: null,
          unitId: null
        };
      },

      removeIngredient(index) {
        this.recipe.ingredients.splice(index, 1);
      },

      cancel() {
        eventBus.$emit('show-recipe-list');
      },

      submit() {
        recipeStore.add(this.recipe);
        eventBus.$emit('show-recipe-list');
      }
    }
  }
</script>
