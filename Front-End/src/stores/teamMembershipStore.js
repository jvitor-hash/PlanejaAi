import { defineStore } from 'pinia'
import { getAllTeamMemberships } from '@/composable/services/useTeamMembershipService'

export const useTeamMembershipStore = defineStore('teamMembership', {
  state: () => ({
    memberships: {}
  }),

  actions: {
    async fetchTeamMemberships() {
      const { data, error, loading } = await getAllTeamMemberships();

      if (data)
        this.tickets = data.value;

      if (error.value)
        throw new Error(`Failed to initialize store, ${error}`);
    }
  }
})