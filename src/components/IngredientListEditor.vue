<script>
const NO_UNIT = 'NO-UNIT';

export default {

    data() {
        return {
            ingredients: [],
            newName: '',
            newQuantity: undefined,
            newUnit: NO_UNIT
        }
    },

    methods: {
        addIngredient() {
            if (this.newName.length === 0) {
                return;
            }

            if (this.newName.length > 0) {
                const newIngredient = {
                    id: crypto.randomUUID(),
                    name: this.newName,
                    quantity: this.newQuantity,
                    unit: ( this.newUnit !== NO_UNIT) ? this.newUnit : undefined
                };

                this.ingredients.push(newIngredient);
                this.newName = '';
                this.newQuantity = undefined;
                this.newUnit = NO_UNIT;
            }
        }
    }
}
</script>

<template>
    <form @submit.prevent="addIngredient" class="mb-3">
        <div class="mb-3">
            <label for="name" class="form-label fw-bold">Ingrédients</label>
            <input type="text" id="ingredient-name" v-model="newName" placeholder="Entrée pour valider" class="form-control" />
        </div>
        <div class="input-group mb-3">
            <input type="number" id="ingredient-quantity" v-model="newQuantity" placeholder="Quantité" min="1" class="form-control" >
            <select id="ingredient-unit" v-model="newUnit" class="form-select">
                <option value="NO-UNIT" selected>Pas d'unité</option>
                <option value="grammes" >Grammes</option>
            </select>
        </div>
        <button type="button" class="btn btn-primary btn-sm" v-on:click="addIngredient">Ajouter</button>
    </form>
    <ul class="list-group">
        <li v-for="ingredient in ingredients" :key="ingredient.id" class="list-group-item">
            <span v-if="ingredient.quantity">
                {{ ingredient.name }} : {{ ingredient.quantity + (ingredient.unit ? " " + ingredient.unit : "") }}
            </span>
            <span v-else>
                {{ ingredient.name }}
            </span>
        </li>
    </ul>
</template>