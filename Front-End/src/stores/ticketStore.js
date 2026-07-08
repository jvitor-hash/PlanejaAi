import { defineStore } from 'pinia'
import { getAllTickets } from '@/composable/services/useTicketService'

export const useTicketStore = defineStore('ticketStore', {
  state: () => ({
    tickets: {}
  }),

  actions: {
    async fetchTickets() {
      const { data, error, loading } = await getAllTickets();

      if (data)
        this.tickets = data.value;

      if (error.value)
        throw new Error(`Failed to initialize store, ${error}`);
    }
  }
})