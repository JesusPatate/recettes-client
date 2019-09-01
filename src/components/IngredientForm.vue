<template>
  <div>
    <div class="form-group row">
      <label class="col-md-2 col-form-label" for="ingredientName">Nom</label>
      <div class="col cl-md-auto">
        <input class="form-control" type="text" id="ingredientName" v-model="name">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-md-2 col-form-label" for="ingredientQty">Quantité</label>
      <div class="col col-sm-5">
        <div class="input-group">
          <input
            type="number"
            class="form-control"
            id="ingredientQty"
            min="1"
            v-model.number="amount"
            v-bind:disabled="noAmount"
          >
          <div class="input-group-append">
            <select class="custom-select" v-model.number="unitId" v-bind:disabled="noAmount">
              <option value="0">unités</option>
              <option v-for="unit in units" :value="unit.id">
                {{unit.name}}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="col">
        <input type="checkbox" id="noQuantity" v-model="noAmount" @click="noQuantity">
          <label class="col-auto col-form-label" for="noQuantity">Pas de quantité</label>
      </div>
    </div>
    <button class="btn btn-primary" @click.prevent="cancel">Annuler</button>
    <button class="btn btn-primary" @click.prevent="confirm">Valider</button>
  </div>
</template>

<script>
  export default {
    props: {
      initialValues: Object,
      units: Array
    },

    data() {
      return {
        name: this.initialValues.name,
        amount: this.initialValues.amount,
        unitId: this.initialValues.unitId,
        noAmount: !this.initialValues.amount
      }
    },

    methods: {
      noQuantity() {
        if (!this.noAmount) {
          this.amount = null;
          this.unitId = null;
        } else {
          this.amount = this.initialValues.amount;
          this.unitId = this.initialValues.unitId;
        }
      },

      confirm() {
        const ingredient = {
          name: this.name,
          amount: this.amount,
          unitId: this.unitId
        };

        this.$emit('confirm', ingredient);
      },

      cancel() {
        this.$emit('cancel');
      }
    }
  }
</script>
