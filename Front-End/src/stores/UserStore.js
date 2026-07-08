import { defineStore } from 'pinia'
import { getUsers } from '@/composable/services/useUserService'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    users: []
  }),

  actions: {
    async fetchUsers() {
      const { data, error, loading } = await getUsers();

      if (data)
        this.users = data.value;

      if (error.value)
        throw new Error(`Failed to fetch users: ${error.value?.message}`);
    }
  }
})