<script>
import { mapActions } from "pinia";

import apiClient from "../js/recettes-api-client.js";
import { useRecipeStore } from "../stores/recipes.js";

export default {
  created() {
    this.fetchRecipes();
  },

  methods: {
    ...mapActions(useRecipeStore, ["storeAll"]),

    fetchRecipes() {
      apiClient.getAllRecipes((recipes) => this.storeAll(recipes));
    },
  },
};
</script>

<template>
  <nav
    class="navbar sticky-top navbar-expand-lg navbar-light bg-light border-bottom"
  >
    <div class="container-fluid d-flex">
      <router-link class="navbar-brand flex-grow-1 fw-bold" to="/">
        Recettes
      </router-link>
      <router-link to="/test">Test</router-link>
    </div>
  </nav>

  <div class="container-fluid">
    <RouterView />
  </div>
</template>
