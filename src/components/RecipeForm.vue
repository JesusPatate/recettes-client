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
        <label for="titleInput" class="col-sm-2 col-form-label">Titre</label>
        <div class="col">
          <input type="text" class="form-control" id="titleInput">
        </div>
      </div>

      <!-- Categories -->
      <fieldset class="form-group">
        <div class="row">
          <legend class="col-sm-2 col-form-label pt-0">Catégories</legend>
          <div class="col">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="hotCheckbox">
              <label class="form-check-label ml-2" for="hotCheckbox">Plat chaud</label>
            </div>
              <div class="form-check mt-1">
                <input class="form-check-input" type="checkbox" id="dessertCheckbox">
                <label class="form-check-label ml-2" for="dessertCheckbox">Dessert</label>
              </div>
          </div>
        </div>
      </fieldset>

      <!-- Preparation time -->
      <div class="form-group row">
        <label for="prepTimeInput" class="col-sm-2 col-form-label">Temps de prépraration</label>
        <div class="col-auto">
          <div class="input-group">
            <input type="number" class="form-control" id="prepTimeInput" value="0" min="0">
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
        <label for="cookingTimeInput" class="col-sm-2 col-form-label">Temps de cuisson</label>
        <div class="col-auto">
          <div class="input-group">
            <input type="number" class="form-control" id="cookingTimeInput" value="0" min="0">
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
        <label for="servingsInput" class="col-sm-2 col-form-label">Nombre de portions</label>
        <div class="col-auto">
          <input type="number" class="form-control" id="servingsInput" value="1" min="1">
        </div>
      </div>

      <!-- source -->
      <div class="form-group row">
        <label for="sourceInput" class="col-sm-2 col-form-label">Source</label>
        <div class="col">
          <input type="text" class="form-control" id="sourceInput">
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
  }
</script>
