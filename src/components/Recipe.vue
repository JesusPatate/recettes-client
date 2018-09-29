<template>
  <div class="card my-2">
    <div class="card-body">
      <a data-toggle="collapse" :href="'#collapse-' + recipe.id" class="card-title" role="button" aria-expanded="false">{{recipe.title}}</a>
      <p class="card-text">
        <small class="text-muted">Temps total : {{recipe.preparationTime + recipe.cookingTime}} min</small>
      </p>
    </div>
    <div class="card-body collapse small py-0" :id="'collapse-' + recipe.id">
      <ul style="list-style: none; padding-left: 0px;">
        <li v-for="item in recipe.ingredients">
        <span v-if="item.amount">
          {{item.amount}}<span v-if="item.unit"> {{item.unit.name}} de </span>
        </span>
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
    }
  }
</script>
