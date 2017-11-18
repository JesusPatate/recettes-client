const recipeListVM = new Vue({
  el: '#recipe-list',
  data: {
    recipes: []
  },
  methods: {
    deleteRecipe: function(recipe) {
      const vm = this;

      const ok = confirm("Supprimer la recette " + recipe.title + " ?");

      if (ok) {
        axios.delete('http://www.ggautier.fr/recipes/api/recipes/' + recipe.id)
          .then((response) => {
            const index = vm.recipes.indexOf(recipe);
            vm.recipes.splice(index, 1);
          })
          .catch((error) => {
            console.error(error);
          });
        }
    },

    loadRecipes: function() {
      const vm = this;

      axios.get('http://www.ggautier.fr/recipes/api/recipes')
        .then((response) => {
          vm.recipes = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },
  mounted() {
    this.loadRecipes();
  }
});
