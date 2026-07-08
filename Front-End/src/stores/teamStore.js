import { defineStore } from 'pinia'
import { getAllTeams } from '@/composable/services/useTeamService'

export const useTeamStore = defineStore('teamStore', {
  state: () => ({
    teams: {}
  }),

  actions: {
    async initStore() {
      const { data, error, loading } = await getUsers();

      if (data)
        this.teams = data.value;
    }
  }
})