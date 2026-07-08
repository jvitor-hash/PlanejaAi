import { defineStore } from 'pinia'
import { getAllTeams } from '@/composable/services/useTeamService'

export const useTeamStore = defineStore('teamStore', {
  state: () => ({
    teams: {}
  }),

  actions: {
    async fetchTeams() {
      const { data, error, loading } = await getAllTeams();

      if (data)
        this.teams = data.value;

      if (error.value)
        throw new Error(`Failed to fetch teams, ${error.value?.message}`);
    },
  }
})