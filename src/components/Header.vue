<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-info mb-3">
    <span class="navbar-brand font-weight-bold" href="#">RECETTES</span>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
      <ul class="navbar-nav">
        <li class="nav-item dropdown mx-1">
          <a class="nav-link dropdown-toggle active" href="#" id="recipesDropdownMenu" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Recettes</a>
          <div class="dropdown-menu" aria-labelledby="recipesDropdownMenu">
            <a class="dropdown-item" href="#" @click="showRecipeList">Voir les recettes</a>
            <a class="dropdown-item" href="#" @click="showRecipeForm">Ajouter une recette</a>
          </div>
        </li>
        <li class="nav-item mx-1">
          <a class="nav-link" href="#" role="button">Planning</a>
        </li>
        <li class="nav-item mx-1">
          <a class="nav-link" href="#" role="button">Courses</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  import eventBus from 'js/application/eventBus.js';

  export default {
    methods: {
      showRecipeList() {
        eventBus.$emit('show-recipe-list');
      },

      showRecipeForm() {
        eventBus.$emit('show-recipe-form');
      }
    }
  }
</script>
