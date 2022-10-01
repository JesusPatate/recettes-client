<script>
import { mapActions } from "pinia";
import { useRecipeStore } from "../stores/recipes.js";
import unitMappings from "@/assets/units.json";

export default {
  data() {
    return {
      recipe: this.get(this.$route.params.id),
    };
  },

  methods: {
    ...mapActions(useRecipeStore, ["get"]),

    format(ingredient) {
      let result = ingredient.name;

      if (ingredient.amount) {
        result += " : " + ingredient.amount;
      }

      if (ingredient.unit) {
        result += " " + this.formatUnit(ingredient.unit);
      }

      return result;
    },

    formatUnit(unit) {
      return unitMappings[unit];
    },
  },
};
</script>

<template>
  <h4 class="title mb-4">{{ recipe.title }}</h4>

  <article>
    <header class="container alert alert-light border mx-0 mb-4">
      <!-- Times -->
      <div class="row">
        <div class="column col-sm-auto">
          <font-awesome-icon
            icon="fa-solid fa-stopwatch"
            title="Temps total"
            class="me-1"
          />
          {{ recipe.totalTime }} minutes
        </div>
        <div class="column col-auto mt-2 mt-sm-0">
          (
          <span class="ms-1 me-2">
            <font-awesome-icon
              icon="fa-solid fa-utensils"
              title="Temps de préparation"
              class="me-1"
            />
            {{ recipe.preparationTime }} minutes
          </span>
          <span class="me-1">
            <font-awesome-icon
              icon="fa-solid fa-fire-flame-curved"
              title="Temps de cuisson"
              class="me-1"
            />
            {{ recipe.cookingTime }} minutes
          </span>
          )
        </div>
      </div>

      <!-- Servings -->
      <div class="row mt-2">
        <div class="column">
          <font-awesome-icon
            icon="fa-solid fa-pizza-slice"
            title="Nombre de parts"
            class="me-1"
          />
          {{ recipe.servings }} personnes
        </div>
      </div>

      <!-- Source -->
      <div v-if="recipe.source" class="row mt-2">
        <div class="column">
          <font-awesome-icon
            icon="fa-solid fa-book"
            title="Source"
            class="me-1"
          />
          {{ recipe.source }}
        </div>
      </div>
    </header>

    <section>
      <ul class="fa-ul">
        <li v-for="item in recipe.ingredients" :key="item.name">
          <span class="fa-li">
            <font-awesome-icon icon="fa-solid fa-check-square" />
          </span>
          {{ format(item) }}
        </li>
      </ul>
    </section>
  </article>
</template>

<style>
header,
article {
  width: fit-content !important;
}
</style>
