<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <nav
    class="navbar sticky-top navbar-expand-lg navbar-light bg-light border-bottom"
  >
    <div class="container-fluid d-flex">
      <router-link class="navbar-brand flex-grow-1 fw-bold" to="/">
        Recettes
      </router-link>
      <router-link to="/test">Test</router-link>
    </div>
  </nav>

  <div class="container-fluid">
    <RouterView />
  </div>
</template>
