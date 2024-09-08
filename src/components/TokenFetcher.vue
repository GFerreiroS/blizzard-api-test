<template>
  <div>
    <!-- No template needed for this component -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TokenFetcher',
  methods: {
    async fetchToken() {
      try {
        const clientId = 'b913ce55b7db4d78b4861531a264c678' // Replace with your actual client ID
        const clientSecret = 'kbibu6k8H12JoBSQAtK0eRf4iiieMIYx' // Replace with your actual client secret
        const tokenUrl = 'https://oauth.battle.net/token'

        const response = await axios.post(
          tokenUrl,
          new URLSearchParams({ grant_type: 'client_credentials' }), // Form data for the request
          {
            auth: {
              username: clientId,
              password: clientSecret
            },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        )

        return response.data.access_token // Return the token
      } catch (error) {
        console.error('Error retrieving token:', error)
        throw error // Rethrow error for handling in parent component
      }
    }
  }
}
</script>
