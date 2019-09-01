<template>
  <div class="card my-2">
    <div class="card-body">
      <a
        href="'#"
        @click.prevent="selected(recipe.id)"
        class="card-title"
        role="button"
        aria-expanded="false"
      >
        {{recipe.title}}
      </a>
      <p class="card-text">
        <small class="text-muted">
          Temps total : {{recipe.preparationTime + recipe.cookingTime}} min
        </small>
      </p>
    </div>
  </div>
</template>

<script>
  import 'mdi/css/materialdesignicons.min.css';

  export default {
    props: {
      recipe: {
        type: Object,
        required: true
      }
    },

    methods: {
      selected(id) {
        this.$emit('selected', id);
      }
    }
  }
</script>
