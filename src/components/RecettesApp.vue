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
    <nav class="container-fluid d-flex px-4">
      <router-link to="/" class="navbar-brand flex-grow-1 fw-bold">
        Recettes
      </router-link>
      <router-link to="/recipes/new" class="link-dark">
        {{ $t("navbar.new-recipe") }}
      </router-link>
    </nav>
  </nav>

  <main class="container-fluid my-3 my-md-4 ms-sm-1">
    <router-view />
  </main>
</template>
