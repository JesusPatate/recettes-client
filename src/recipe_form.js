const recipeFormVM = new Vue(
  {
    el: '#recipe-form',
    data: {
      recipe: {
        id: UUID.generate(),
        title: '',
        hot: false,
        dessert: false,
        preparationTime: 1,
        cookingTime: 1,
        servings: 1,
        source: '',
        ingredients: []
      },
      newIngredient: {
        name: '',
        amount: '',
        unit: ''
      },
      units: []
    },
    methods: {
      addIngredient: function() {
        this.recipe.ingredients.push({
          name: this.newIngredient.name,
          amount: this.newIngredient.amount,
          unit: this.newIngredient.unit
        });

        this.newIngredient = {
          name: '',
          amount: '',
          unit: ''
        }
      },

      removeIngredient: function(index) {
        this.recipe.ingredients.splice(index, 1);
      },

      clearData: function() {
        this.recipe = {
          id: UUID.generate(),
          title: '',
          hot: false,
          dessert: false,
          preparationTime: 1,
          cookingTime: 1,
          servings: 1,
          source: '',
          ingredients: []
        };

        this.newIngredient = {
          name: '',
          amount: '',
          unit: ''
        };
      },

      sendRecipe: function() {
        axios.put('http://www.ggautier.fr/recipes/api/recipes', this.recipe)
          .then((response) => {
            this.clearData();
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    },
    mounted: function() {
        const vm = this;

        axios.get('http://www.ggautier.fr/recipes/api/units', this.recipe)
          .then((response) => {
            response.data.map(unit => vm.units.push(unit));
          })
          .catch(function (error) {
            console.error("Unable to fetch units from server : " + error);
          });
    }
  }
);
