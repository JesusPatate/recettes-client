import { createRouter, createWebHashHistory } from "vue-router";
import RecipeListView from "../views/RecipeListView.vue";
import RecipeDetailsView from "../views/RecipeDetailsView.vue";
import NewRecipeView from "../views/NewRecipeView.vue";

const router = createRouter({
  //history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: RecipeListView,
    },
    {
      path: "/recipes/:id",
      name: "recipe-details",
      component: RecipeDetailsView,
    },
    {
      path: "/new",
      name: "new-recipe",
      component: NewRecipeView,
    },
  ],
});

export default router;
