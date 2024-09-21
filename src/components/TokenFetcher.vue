<template>
  <div>
    <!-- No template needed for this component -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TokenFetcher',
  data() {
    return {
      tokenCache: {
        token: null,
        expiresAt: null
      }
    }
  },
  methods: {
    async fetchToken() {
      try {
        const clientId = import.meta.env.VITE_APP_CLIENT_ID // Ensure these are set correctly
        const clientSecret = import.meta.env.VITE_APP_CLIENT_SECRET // Ensure these are set correctly
        const tokenUrl = 'https://oauth.battle.net/token'
        const TOKEN_LIFETIME_MS = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

        const encodedCredentials = btoa(`${clientId}:${clientSecret}`)
        const response = await axios.post(
          tokenUrl,
          new URLSearchParams({ grant_type: 'client_credentials' }), // Form data for the request
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Basic ${encodedCredentials}` // Correct way to include Basic Auth
            }
          }
        )

        const token = response.data.access_token
        const expiresAt = Date.now() + TOKEN_LIFETIME_MS // Set token expiration time

        // Cache the token and its expiration time
        this.tokenCache = {
          token,
          expiresAt
        }

        return token // Return the new token
      } catch (error) {
        console.error('Error retrieving token:', error)
        throw error // Rethrow error for handling in parent component
      }
    },

    async fetchGuildRoster(realmSlug, guildName) {
      try {
        const token = await this.fetchToken() // Get the token using the fetchToken method
        const apiUrl = `https://eu.api.blizzard.com/data/wow/guild/${realmSlug}/${guildName}/roster?namespace=profile-eu&locale=en_US`

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}` // Use the token for authorization
          }
        })
        return response.data // Return the guild roster data
      } catch (error) {
        console.error('Error retrieving guild roster:', error)
        throw error // Rethrow error for handling in parent component
      }
    }
  }
}
</script>
