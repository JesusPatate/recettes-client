import { defineStore } from "pinia";

export const useRecipeStore = defineStore({
  id: "recipe",

  state: () => ({
    recipes: new Map(),
  }),

  getters: {
    size: (state) => state.recipes.size,
  },

  actions: {
    getAll() {
      return this.recipes.entries;
    },

    get(id) {
      return this.recipes.get(id);
    },

    storeAll(recipes) {
      this.recipes.clear();
      recipes.forEach((recipe) => this.recipes.set(recipe.id, recipe));
    },

    store(recipe) {
      this.recipes.set(recipe.id, recipe);
    },

    remove(id) {
      this.recipes.delete(id);
    }
  },
});
