<template>
  <div class="home-view"></div>
</template>

<script>
import TokenFetcher from '@/components/TokenFetcher.vue' // Import the TokenFetcher component

export default {
  name: 'HomeView',
  components: {
    TokenFetcher // Register the component
  },
  data() {
    return {
      realmSlug: '', // To store the user input for realm slug
      guildName: '', // To store the user input for guild name
      guildRoster: null // To store the fetched guild roster data
    }
  },
  methods: {
    async fetchRoster() {
      try {
        const tokenFetcher = this.$refs.tokenFetcher // Access the TokenFetcher component instance

        // Fetch guild roster using user input
        this.guildRoster = await tokenFetcher.fetchGuildRoster(this.realmSlug, this.guildName)
        console.log('Guild Roster retrieved:', this.guildRoster)
      } catch (error) {
        console.error('Error retrieving guild roster:', error)
      }
    }
  }
}
</script>

<style scoped>
.home-view {
  padding: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type='text'] {
  margin-bottom: 10px;
  padding: 5px;
  width: 300px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
