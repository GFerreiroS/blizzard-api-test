<template>
  <div class="">
    <h1>This is an about page</h1>
    <p v-if="token">Token: {{ token }}</p>
  </div>
</template>

<script>
import { fetchToken } from '@/tokenService'

export default {
  name: 'App',
  data() {
    return {
      token: null
    }
  },
  async mounted() {
    try {
      this.token = await fetchToken()
      console.log('Token retrieved:', this.token)
    } catch (error) {
      console.error('Error retrieving token:', error)
    }
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
