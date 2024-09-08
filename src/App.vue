<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/navBar.vue'
</script>

<template>
  <div>
    <header>
      <div>
        <Navbar />
      </div>
    </header>
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  position: fixed; /* Fix the header to the top */
  top: 0; /* Align it to the top of the viewport */
  left: 0;
  width: 100%; /* Full width of the viewport */
  background: #fff; /* Optional: Add background color to ensure readability */
  z-index: 1000; /* Ensure the navbar is above other content */
}

/* Add some margin to the top of the main content to avoid overlap */
.main-content {
  margin-top: 4rem; /* Adjust based on the height of your header */
}
</style>
