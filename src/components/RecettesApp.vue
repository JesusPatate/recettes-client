<script>
import recipeService from "../js/recipe-service.js";

export default {
  created() {
    recipeService.fetchAll();
  },
};
</script>

<template>
  <nav
    class="navbar sticky-top navbar-expand-lg navbar-light bg-light border-bottom"
  >
    <nav class="container-fluid d-flex">
      <router-link class="navbar-brand flex-grow-1 fw-bold" to="/">
        Recettes
      </router-link>
      <router-link to="/new">Nouvelle recette</router-link>
    </nav>
  </nav>

  <main class="container-fluid my-4 ms-sm-1">
    <router-view />
  </main>
</template>
