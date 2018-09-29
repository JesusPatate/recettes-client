<template>
  <div class="container-fluid" id="recipe-search">
    <form>
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Titre, ingrédient..." v-model="text">
        <div class="input-group-append">
          <button class="btn btn-outline-info" type="button" @click="search">Rechercher</button>
            <button class="btn btn-outline-info" type="button" v-if="displayClearBtn" @click="clearFilter">Effacer</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import recipeManagementService from 'js/application/recipeManagementService.js';
  import recipeStore from 'js/application/recipeStore.js';
  import eventBus from 'js/application/eventBus.js';

  export default {
    data() {
      return {
        text: "",
        displayClearBtn: false
      }
    },

    methods: {
      search() {
        if (this.text.length === 0) {
          return;
        }

        recipeManagementService.search(this.text,
          recipes => {
            let ids = recipes.map(recipe => recipe.id);
            eventBus.$emit('filter-recipes', ids);
            this.displayClearBtn = true;
          });
      },

      clearFilter() {
        this.text = "";
        this.displayClearBtn = false;
        eventBus.$emit('clear-filter');
      }
    }
  }
</script>
