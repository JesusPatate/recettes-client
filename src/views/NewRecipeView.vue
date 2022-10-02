<script>
import unitsMappings from "@/assets/units.json";
import helpers from "../js/helpers.js";
import recipeService from "../js/recipe-service";

  const NO_UNIT = "NO-UNIT";

  export default {
    data() {
      return {
        title: "",
        hot: false,
        dessert: false,
        servings: 1,
        preparationTime: 0,
        cookingTime: 0,
        ingredients: [],
        source: "",
        newIngredient: {
          name: "",
          amount: null,
          unit: NO_UNIT,
        },
        units: unitsMappings,
      };
    },

    methods: {
      addIngredient() {
        this.newIngredient.name = this.newIngredient.name.trim();

        if (this.newIngredient.name.length === 0) {
          return;
        }

        const ingredient = {...this.newIngredient};
        
        if(ingredient.unit === NO_UNIT) {
          ingredient.unit = null;
        }

        this.ingredients.push(ingredient);

        this.newIngredient.name = "";
        this.newIngredient.amount = null;
        this.newIngredient.unit = NO_UNIT;
      },

      format(ingredient) {
        return recipeService.formatIngredient(ingredient);
      },

      capitalize: helpers.capitalize,

      addRecipe() {
        this.title = this.title.trim();
        this.source = this.source.trim();

        if (this.title.length === 0) {
          return;
        }

        const recipe = {
          title: this.title,
          hot: this.hot,
          dessert: this.dessert,
          servings: this.servings,
          preparationTime: this.preparationTime,
          cookingTime: this.cookingTime,
          ingredients: this.ingredients.map((ingredient) => {
            return { ...ingredient };
          }),
        };

        if (this.source.length > 0) {
          recipe.source = this.source;
        }

        recipeService.add(recipe);
      },
    }
  }
</script>

<template>
  <div class="container">
    <form @submit.prevent>
      <div class="row mb-3">
        <label
          for="newRecipeTitleInput"
          class="col-sm-3 col-xl-2 col-form-label user-select-none"
        >
          Titre
        </label>
        <div class="col">
          <input
            type="text"
            class="form-control"
            id="newRecipeTitleInput"
            v-model="title"
          />
        </div>
      </div>

      <div class="row mb-3">
        <label
          for="newRecipePrepTimeInput"
          class="col-sm-3 col-xl-2 col-form-label user-select-none"
        >
          Temps de préparation
        </label>
        <div class="col-auto">
          <div class="input-group">
            <input
              type="number"
              class="form-control"
              id="newRecipePrepTimeInput"
              min="0"
              step="5"
              v-model="preparationTime"
            />
            <span class="input-group-text">minutes</span>
          </div>
        </div>
      </div>

      <div class="row mb-3">
        <label
          for="newRecipeCookingTimeInput"
          class="col-sm-3 col-xl-2 col-form-label user-select-none"
        >
          Temps de cuisson
        </label>
        <div class="col-auto">
          <div class="input-group">
            <input
              type="number"
              class="form-control"
              id="newRecipeCookingTimeInput"
              min="0"
              step="5"
              v-model="cookingTime"
            />
            <span class="input-group-text">minutes</span>
          </div>
        </div>
      </div>

      <div class="row mb-2">
        <label
          for="newRecipeHotCheckbox"
          class="col-4 col-sm-3 col-xl-2 col-form-label user-select-none"
        >
          Plat chaud
        </label>
        <div class="col-auto">
          <div class="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="newRecipeHotCheckbox"
              v-model="hot"
            />
          </div>
        </div>
      </div>

      <div class="row mb-2">
        <label
          for="newRecipeHotCheckbox2"
          class="col-4 col-sm-3 col-xl-2 col-form-label user-select-none"
        >
          Dessert
        </label>
        <div class="col-auto">
          <div class="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="newRecipeHotCheckbox2"
              v-model="dessert"
            />
          </div>
        </div>
      </div>

      <div class="row mb-3">
        <label
          for="newRecipeServingsInput"
          class="col-sm-3 col-xl-2 col-form-label user-select-none"
        >
          Nombre de parts
        </label>
        <div class="col-auto">
          <input
            type="number"
            class="form-control"
            id="newRecipeServingsInput"
            min="0"
            v-model="servings"
          />
        </div>
      </div>

      <div class="row mb-3">
        <label class="col-sm-3 col-xl-2 col-form-label user-select-none">
          Ingrédients
        </label>
        <div class="col">
          <ul v-if="ingredients.length > 0">
            <li class=" ps-0" v-for="ingredient in ingredients">
              {{ format(ingredient) }}
            </li>
          </ul>

          <div class="row gx-2 gy-2 mb-3">
            <div class="col-sm-auto">
              <input 
                type="text"
                class="form-control"
                id="newRecipeIngredientNameInput"
                placeholder="Nouvel ingrédient"
                v-model="newIngredient.name"
              />
            </div>
            <div class="col-auto">
              <div class="input-group">
                <input
                  type="number"
                  class="form-control"
                  id="ingredient-quantity"
                  placeholder="Quantité"
                  min="1"
                  v-model="newIngredient.amount"
                >
                <select id="ingredient-unit" class="form-select" v-model="newIngredient.unit">
                  <option value="NO-UNIT" selected>Pas d'unité</option>
                  <option v-for="(key, value) in units" :value="value">
                    {{ capitalize(key) }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-auto">
              <button type="button" class="btn btn-primary" @click="addIngredient">
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row mb-3">
        <label
          for="newRecipeSourceInput"
          class="col-sm-3 col-xl-2 col-form-label user-select-none"
        >
          Source
        </label>
        <div class="col">
          <input
            type="text"
            class="form-control"
            id="newRecipeSourceInput"
            v-model="source"
          />
        </div>
      </div>

      <button type="submit" class="btn btn-primary" @click="addRecipe()">Ajouter la recette</button>
    </form>
  </div>
</template>

<style scoped>
.form-check-input {
  margin-top: 0.75rem;
}
</style>
