<template>
  <div class="container">
    <form @submit.prevent>
      <div class="row mb-3">
        <label
          for="newRecipeTitleInput"
          class="col-sm-3 col-xl-2 col-form-label user-select-none"
        >
          Titre
        </label>
        <div class="col">
          <input
            type="text"
            aria-label="First name"
            class="form-control"
            id="newRecipeTitleInput"
          />
        </div>
      </div>

      <div class="row mb-3">
        <label
          for="newRecipePrepTimeInput"
          class="col-sm-3 col-xl-2 col-form-label user-select-none"
        >
          Temps de préparation
        </label>
        <div class="col-auto">
          <div class="input-group">
            <input
              type="number"
              value="0"
              min="0"
              step="5"
              class="form-control"
              id="newRecipePrepTimeInput"
            />
            <span class="input-group-text">minutes</span>
          </div>
        </div>
      </div>

      <div class="row mb-3">
        <label
          for="newRecipeCookingTimeInput"
          class="col-sm-3 col-xl-2 col-form-label user-select-none"
        >
          Temps de cuisson
        </label>
        <div class="col-auto">
          <div class="input-group">
            <input
              type="number"
              value="0"
              min="0"
              step="5"
              class="form-control"
              id="newRecipeCookingTimeInput"
            />
            <span class="input-group-text">minutes</span>
          </div>
        </div>
      </div>

      <div class="row mb-2">
        <label
          for="newRecipeHotCheckbox"
          class="col-4 col-sm-3 col-xl-2 col-form-label user-select-none"
        >
          Plat chaud
        </label>
        <div class="col-auto">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="newRecipeHotCheckbox"
            />
          </div>
        </div>
      </div>

      <div class="row mb-3">
        <label
          for="newRecipeHotCheckbox2"
          class="col-4 col-sm-3 col-xl-2 col-form-label user-select-none"
        >
          Dessert
        </label>
        <div class="col-auto">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="newRecipeHotCheckbox2"
            />
          </div>
        </div>
      </div>

      <div class="row mb-3">
        <label
          for="newRecipeServingsInput"
          class="col-sm-3 col-xl-2 col-form-label user-select-none"
        >
          Nombre de parts
        </label>
        <div class="col-auto">
          <input
            type="number"
            value="0"
            min="0"
            class="form-control"
            id="newRecipeServingsInput"
          />
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<style scoped>
.form-check-input {
  margin-top: 0.75rem;
}
</style>
