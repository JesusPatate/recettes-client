<script>
import RecipeForm from "../components/RecipeForm.vue";

export default {
    components: { "recipe-form": RecipeForm }
}
</script>

<template>
    <recipe-form :recipeId="$route.params.id"></recipe-form>
</template>