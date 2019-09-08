<template>
  <form class="container">
      <div class="row my-2">
        <div class="col">
          <h3>Nouvelle recette</h3>
        </div>
      </div>

      <!-- Title -->
      <div class="form-group row">
        <label for="titleInput" class="col-md-2 col-form-label">Titre</label>
        <div class="col">
          <input type="text" class="form-control" id="titleInput" v-model="title">
        </div>
      </div>

      <!-- Categories -->
      <fieldset class="form-group">
        <div class="row">
          <legend class="col-md-2 col-form-label pt-0">Catégories</legend>
          <div class="col">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="hotCheckbox" v-model="hot">
              <label class="form-check-label ml-2" for="hotCheckbox">Plat chaud</label>
            </div>
              <div class="form-check mt-1">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="dessertCheckbox"
                  v-model="dessert"
                >
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
            <input
              type="number"
              class="form-control"
              id="prepTimeInput"
              min="1"
              v-model.number="preparationTime"
            >
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
            <input
              type="number"
              class="form-control"
              id="cookingTimeInput"
              min="0"
              v-model.number="cookingTime"
            >
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
          <input
            type="number"
            class="form-control"
            id="servingsInput"
            min="1"
            v-model.number="servings"
          >
        </div>
      </div>

      <!-- Ingredient -->
      <fieldset class="form-group">
        <div class="row">
          <legend class="col-md-2 col-form-label pt-0">Ingrédients</legend>
          <div class="col">
            <p>
              <a href="#" @click.prevent="displayIngredientForm = true">
                Ajouter un nouvel ingrédient
              </a>
            </p>

            <app-ingredient-form
                v-if="displayIngredientForm"
                v-bind="{initialValues: initialIngredientValues, units: units}"
                class="alert alert-secondary"
                @confirm="addNewIngredient"
                @cancel="dropNewIngredient"
            >
            </app-ingredient-form>

            <ul class="form-group">
              <li class="col" v-for="(ingredient, index) in ingredients">
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
          <input type="text" class="form-control" id="sourceInput" v-model="source">
        </div>
      </div>

      <div class="form-group row">
        <div class="col">
          <button class="btn btn-primary" @click="cancel">Annuler</button>
          <button class="btn btn-primary" @click="confirm">Valider</button>
        </div>
      </div>
  </form>
</template>

<script>
  import IngredientForm from './IngredientForm.vue';
  import Recipe from 'js/model/Recipe.js';
  import Ingredient from 'js/model/Ingredient.js';
  import uuid from 'uuid/v4';

  export default {
    components: {
      'app-ingredient-form': IngredientForm
    },

    props: {
      units: {
        type: Array,
        default: function() {
          return [];
        }
      },
      initialValues: {
        type: Object,
        default: function() {
          return {
            id: uuid(),
            title: "",
            hot: false,
            dessert: false,
            preparationTime: 1,
            cookingTime: 0,
            servings: 1,
            source: ""
          }
        }
      }
    },

    data() {
      return {
        id: this.initialValues.id,
        title: this.initialValues.title,
        hot: this.initialValues.hot,
        dessert: this.initialValues.dessert,
        preparationTime: this.initialValues.preparationTime,
        cookingTime: this.initialValues.cookingTime,
        servings: this.initialValues.servings,
        source: this.initialValues.source,
        ingredients: [],
        initialIngredientValues: {
          name: "",
          amount: 1,
          unitId: 0
        },
        displayIngredientForm: false
      };
    },

    methods: {
      addNewIngredient(ingredient) {
        if (ingredient.name.length > 0) {
          this.ingredients.push({
            name: ingredient.name,
            amount: ingredient.amount,
            unit: this.getUnit(ingredient.unitId)
          });

          this.displayIngredientForm = false;
          this.resetNewIngredient();
        }
      },

      getUnit(id) {
        for (const unit of this.units) {
          if (unit.id === id) {
            return unit;
          }
        }
      },

      resetNewIngredient() {
        this.newIngredient = {
          name: "",
          amount: 1,
          unitId: 0
        };
      },

      dropNewIngredient() {
        this.displayIngredientForm = false;
        this.resetNewIngredient();
      },

      removeIngredient(index) {
        this.ingredients.splice(index, 1);
      },

      cancel() {
        this.$emit('cancel');
      },

      confirm() {
        const recipe = {
          id: this.id,
          title: this.title,
          hot: this.hot,
          dessert: this.dessert,
          preparationTime: this.preparationTime,
          cookingTime: this.cookingTime,
          servings: this.servings,
          source: this.source,
          ingredients: this.ingredients
        };

        this.$emit('confirm', recipe);
      }
    }
  }
</script>
