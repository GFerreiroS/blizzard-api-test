import axios from 'axios'

let tokenCache = {
  token: null,
  expiresAt: null
}

const clientId = 'b913ce55b7db4d78b4861531a264c678' // Replace with your actual client ID
const clientSecret = 'kbibu6k8H12JoBSQAtK0eRf4iiieMIYx' // Replace with your actual client secret
const tokenUrl = 'https://oauth.battle.net/token'
const TOKEN_LIFETIME_MS = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

async function fetchTokenFromServer() {
  try {
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

    const token = response.data.access_token
    const expiresAt = Date.now() + TOKEN_LIFETIME_MS // Set token expiration time

    // Cache the token and its expiration time
    tokenCache = {
      token,
      expiresAt
    }

    return token
  } catch (error) {
    console.error('Error retrieving token:', error)
    throw error // Rethrow error for handling in parent component
  }
}

export async function fetchToken() {
  // Check if the token is still valid
  if (tokenCache.token && Date.now() < tokenCache.expiresAt) {
    return tokenCache.token
  } else {
    // Token is expired or not present, fetch a new one
    return fetchTokenFromServer()
  }
}
