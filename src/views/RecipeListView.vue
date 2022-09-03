<script setup>
import RecipeSearch from "../components/RecipeSearch.vue";
</script>

<template>
  <div class="container-fluid my-4">
    <div class="row">
      <div class="col-xl-4 col-md-6">
        <RecipeSearch></RecipeSearch>
      </div>
    </div>
  </div>

  <div id="recipe-list" class="container-fluid mb-4">
    <div class="card text-bg-light" v-for="n in 100" :key="n">
      <div class="card-body">Poulet roti aux endives sur son lit de carottes rapées au cumin</div>
    </div>
  </div>
</template>

<style>
#recipe-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, 20rem);
  justify-content: center;
  gap: 1rem;
}
</style>
