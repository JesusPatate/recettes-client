import { defineStore } from 'pinia';

export const useRecipeStore = defineStore('recipes', {
    state: () => {
        return {
            recipes: new Map()
        }
    },

    getters: {
        size() {
            return this.recipes.size;
        }
    },

    actions: {
        addRecipe(recipe) {
            console.log("Recipe " + recipe.getTitle() + " added to the store.")
            this.recipes.set(recipe.getId(), recipe);
        }
    }
});