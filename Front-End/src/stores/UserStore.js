import { defineStore } from 'pinia'

export const useUserStore = defineStore('User', {
  state: () => ({
    users: {}
  }),

  actions: {
    setUsers(users) {
      this.users = users
    }
  }
})