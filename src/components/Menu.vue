<template>
  <nav class="columns is-mobile">
    <div class="column is-hidden-mobile"></div>
    <div class="column is-narrow-tablet">
      <a class="nav-item is-tab" :class="{ 'is-active': showHome }" @click.prevent="listRecipes()" href="#">
        Accueil
      </a>
    </div>
    <div class="column is-narrow-tablet">
      <a class="nav-item is-tab" :class="{ 'is-active': showAdd }" @click.prevent="addRecipe()" href="#">
        Ajouter une recette
      </a>
    </div>
    <div class="column is-hidden-mobile"></div>
  </nav>
</template>

<script>
  const LIST = Symbol();
  const ADD = Symbol();

  export default {
    data() {
      return {
        current: LIST
      };
    },
    computed: {
      showHome() {
        return this.current === LIST;
      },
      showAdd() {
        return this.current === ADD;
      }
    },
    methods: {
      listRecipes() {
        this.current = LIST;
        this.$emit('listRecipes');
      },
      addRecipe() {
        this.current = ADD;
        this.$emit('addRecipe');
      }
    }
  };
</script>