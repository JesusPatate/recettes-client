<template>
  <div class="card border-bottom-0" id="recipe-panel">
    <div class="card-body">
      <div class="card-title">
        <strong>{{recipe.title}}</strong>
        <button type="button" class="close" aria-label="Close" @click="$emit('close')" title="Fermer">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="card-subtitle text-muted">
        <span class="mr-3" title="Temps de préparation">
          <span class="mdi mdi-silverware-spoon mr-2"></span>{{recipe.preparationTime}} min
        </span>
        <span title="Temps de cuisson">
          <span class="mdi mdi-stove mr-2"></span>{{recipe.cookingTime}} min
        </span>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-7 col-lg-9">
          <ul style="list-style: none;">
            <li v-for="item in recipe.ingredients">
            <span v-if="item.amount">{{item.amount}}</span>
            <span v-if="item.unit">{{item.unit.name}} de </span>
            {{item.name}}
            </li>
          </ul>
        </div>
        <div class="col-sm-5 col-lg-3">
          <div class="container">
            <div class="row">
              <div class="col">
                <button class="btn btn-info w-100" @click="$emit('edit', recipe)">Modifier</button>
              </div>
            </div>
              <div class="row">
                <div class="col">
                  <button class="btn btn-danger w-100" @click="$emit('remove', recipe)">Supprimer</button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      recipe: Object
    }
  }
</script>
