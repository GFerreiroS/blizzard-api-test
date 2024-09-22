<template>
  <div class="home-view">
    <h1 class="text-4xl text-white">Configuration</h1>
    <form @submit.prevent="fetchRoster">
      <div>
        <label for="guildName">Guild Name:</label>
        <input class="text-black" type="text" v-model="guildName" id="guildName" required />
      </div>
      <div>
        <label for="realmSlug">Realm:</label>
        <input class="text-black" type="text" v-model="realmSlug" id="realmSlug" required />
      </div>
      <button type="submit">Fetch Guild Roster</button>
    </form>

    <!-- Display fetched guild roster if available -->
    <div v-if="guildRoster">
      <h2>Guild Roster:</h2>
      <pre>{{ guildRoster }}</pre>
    </div>

    <!-- Include the TokenFetcher component -->
    <TokenFetcher ref="tokenFetcher" />
  </div>
</template>

<script>
import TokenFetcher from '@/components/TokenFetcher.vue'
import { useGuildStore } from '@/stores/guildStore'

export default {
  name: 'HomeView',
  components: {
    TokenFetcher
  },
  setup() {
    const guildStore = useGuildStore()

    return {
      realmSlug: guildStore.realmSlug,
      guildName: guildStore.guildName,
      setRealmSlug: guildStore.setRealmSlug,
      setGuildName: guildStore.setGuildName
    }
  },
  methods: {
    async fetchRoster() {
      try {
        const tokenFetcher = this.$refs.tokenFetcher

        // Update store with the user input
        this.setRealmSlug(this.realmSlug)
        this.setGuildName(this.guildName)

        // Fetch guild roster
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
