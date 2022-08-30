import { createApp } from 'vue';
import { createPinia } from 'pinia';

import 'bootstrap/dist/js/bootstrap';

import '@/sass/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import RecipeList from '@/components/RecipeList.vue';
import IngredientListEditor from '@/components/IngredientListEditor.vue';
import { useRecipeStore } from '@/js/RecipeStore.js';
import client from '@/js/RecettesApiClient.js';

history.scrollRestoration = 'auto';

const recipeList = createApp(RecipeList);
recipeList.use(createPinia());
recipeList.mount('#recipe-list');

const recipes = useRecipeStore();
client.getRecipes().forEach(recipe => {
    recipes.addRecipe(recipe);
});

const ingredientListEditor = createApp(IngredientListEditor);
ingredientListEditor.mount('#ingredient-list-editor');

// import App from './WelcomeApp.vue';

// const welcomeApp = createApp(App);
// welcomeApp.use(createPinia());
// welcomeApp.mount('#welcome-app');