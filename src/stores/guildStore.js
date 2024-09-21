import { defineStore } from 'pinia'

export const useGuildStore = defineStore('guild', {
  state: () => ({
    realmSlug: '',
    guildName: ''
  }),
  actions: {
    setRealmSlug(slug) {
      this.realmSlug = slug
    },
    setGuildName(name) {
      this.guildName = name
    }
  }
})
