<script>
import { mapState } from "pinia";

import RecipeSearch from "../components/RecipeSearch.vue";
import { useRecipeStore } from "../stores/recipes.js";

export default {
  components: {
    RecipeSearch,
  },

  computed: {
    // TODO: do not access store's state directly
    ...mapState(useRecipeStore, ["recipes", "size"]),
  },
};
</script>

<template>
  <div class="container-fluid mb-4">
    <div class="row">
      <div class="col-xl-4 col-md-6">
        <RecipeSearch></RecipeSearch>
      </div>
    </div>
  </div>

  <div id="recipe-list" class="container-fluid mb-4">
    <div
      class="card text-bg-light border border-2"
      v-for="recipe in recipes.values()"
      :key="recipe.id"
    >
      <div class="card-body">
        <router-link
          :to="{ name: 'recipe-details', params: { id: recipe.id } }" class="link-dark"
        >
          {{ recipe.title }}
        </router-link>
      </div>
    </div>
  </div>
  <!-- <div class="text-center text-muted">{{ size }} recettes affichées</div> -->
  <div class="text-center text-muted">{{ $tc("recipe-list.foo", size) }}</div>
</template>

<style>
#recipe-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, 20rem);
  justify-content: center;
  gap: 1rem;
}
</style>
