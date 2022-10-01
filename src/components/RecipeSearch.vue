<script>
import recipeService from "../js/recipe-service.js";

export default {
  data() {
    return {
      term: "",
    };
  },

  methods: {
    search() {
      recipeService.search(this.term);
    },

    erase() {
      this.term = "";
      recipeService.fetchAll();
    },
  },
};
</script>

<template>
  <form class="row" @submit.prevent>
    <div class="input-group">
      <input
        type="text"
        class="form-control"
        placeholder="Rechercher"
        aria-label="Champ de recherche"
        v-model="term"
      />
      <button
        class="btn btn-light border"
        type="button btn-submit"
        @click="search()"
      >
        <font-awesome-icon icon="fa-solid fa-check" />
      </button>
      <button class="btn btn-light border" type="button" @click="erase()">
        <font-awesome-icon icon="fa-solid fa-xmark" />
      </button>
    </div>
  </form>
</template>
