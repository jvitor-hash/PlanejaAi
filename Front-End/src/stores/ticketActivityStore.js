import { defineStore } from 'pinia'
import { getAllTicketActivities } from '@/composable/services/useTicketActivityService'

export const useTicketActivityStore = defineStore('ticketActivityStore', {
  state: () => ({
    activities: {}
  }),

  actions: {
    async fetchTicketActivities() {
      const { data, error, loading } = await getAllTicketActivities();

      if (data)
        this.tickets = data.value;

      if (error.value)
        throw new Error(`Failed to initialize store, ${error}`);
    }
  }
})