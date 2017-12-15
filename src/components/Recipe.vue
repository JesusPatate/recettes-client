<template>
  <div class="column is-8 is-offset-2">
    <article class="panel">
      <header class="panel-heading">
        <div class="columns is-mobile">
          <div class="column">
            <h3 >{{recipe.title}}</h3>
          </div>
          <div class="column is-narrow">
            <div class="buttons">
              <slot></slot>
            </div>
          </div>
        </div>
      </header>
      <section class="panel-block">
        <div class="content">
          <ul>
            <li>Plat chaud : <input type="checkbox" :checked="recipe.hot" disabled></li>
            <li>Dessert : <input type="checkbox" :checked="recipe.dessert" disabled></li>
            <li>Temps de préparation : {{recipe.preparationTime}} minutes</li>
            <li v-if="recipe.cookingTime">Temps de cuisson : {{recipe.cookingTime}} minutes</li>
            <li>Nombre de portions : {{recipe.servings}}</li>
            <li>
              Ingrédients :
              <ul>
                <li v-for="item in recipe.ingredients">
                  {{item.name}}
                  <span v-if="item.amount">
                    ({{item.amount}}<span v-if="item.unit"> {{item.unit.name}}</span>)
                  </span>
                </li>
              </ul>
            </li>
            <li>Source : {{recipe.source}}</li>
            <li v-if="recipe.comments">
              Commentaires :
              <ul>
                <li v-for="item in recipe.comments">{{item}}</li>
              </ul>
            </li>
          </ul>
        </div>
      </section>
    </article>
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