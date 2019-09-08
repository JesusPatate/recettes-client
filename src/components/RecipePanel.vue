<template>
  <div>
    <div class="alert alert-light alert-dismissible mb-1" role="alert">
      <p class="mb-2"><strong>{{recipe.title}}</strong></p>
      <button type="button" class="close" aria-label="Close" @click="$emit('close')" title="Fermer">
        <span aria-hidden="true">&times;</span>
      </button>
      <ul style="list-style: none; padding-left: 0px;">
        <li v-for="item in recipe.ingredients">
        <span v-if="item.amount">{{item.amount}}</span>
        <span v-if="item.unit">{{item.unit.name}} de </span>
        {{item.name}}
        </li>
      </ul>
      <p>
        <span class="mr-3" title="Temps de préparation">
          <span class="mdi mdi-silverware-spoon mr-2"></span>{{recipe.preparationTime}} min
        </span>
        <span title="Temps de cuisson">
          <span class="mdi mdi-stove mr-2"></span>{{recipe.cookingTime}} min
        </span>
      </p>
    </div>
    <button type="button" class="btn btn-info col mx-1 mb-2" @click="$emit('edit', recipe)">
      Modifier
    </button>
    <button type="button" class="btn btn-danger col mx-1 mb-3" @click="$emit('remove', recipe)">
      Supprimer
    </button>
  </div>
</template>

<script>
  export default {
    props: {
      recipe: Object
    }
  }
</script>
