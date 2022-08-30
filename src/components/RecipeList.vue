<script>
    import { useRecipeStore } from '@/js/RecipeStore.js';

    const RECIPE_PATH = '/show-recipe.html';

    export default {
        setup() {
            const recipes = useRecipeStore();
            return {recipes};
        },

        methods: {
            alert(arg) {
                alert(arg);
            },

            showRecipe(id) {
                window.location = RECIPE_PATH + '?recipeId=' + id;
            }
        }
    }
</script>

<template>
    <div class="recipe-list d-xs-flex-column d-md-flex gap-3 flex-wrap">
        <div v-for="[id, recipe] in recipes.recipes" :key="id" class="card recipe-card bg-light">
            <div  class="card-body">
                <a href="#" @click.prevent="showRecipe(recipe.getId());">{{ recipe.getTitle() }}</a>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/mixins";

@include media-breakpoint-down(md) {
    .recipe-card + .recipe-card {
        margin-top: 1rem;
    }
}

.recipe-card a {
    text-decoration: none;
    color: black;
}

.recipe-card a:hover {
    color: dimgray;
}
</style>