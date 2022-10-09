import { createRouter, createWebHashHistory } from "vue-router";
import RecipeListView from "../views/RecipeListView.vue";
import RecipeDetailsView from "../views/RecipeDetailsView.vue";
import NewRecipeView from "../views/NewRecipeView.vue";
import EditRecipeView from "../views/EditRecipeView.vue";

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
      path: "/recipes/new",
      name: "new-recipe",
      component: NewRecipeView,
    },
    {
      path: "/recipes/:id/edit",
      name: "edit-recipe",
      component: EditRecipeView,
    },
  ],
});

export default router;
