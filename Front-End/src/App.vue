<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import '@/assets/main.css';
import { useTeamStore } from '@/stores/teamStore';
import { useUserStore } from '@/stores/userStore';
import { useTicketStore } from '@/stores/ticketStore';
import { useTicketActivityStore } from '@/stores/ticketActivityStore';
import { useTeamMembershipStore } from '@/stores/teamMembershipStore';

async function init() {
  const store1 = useTeamStore();
  await store1.fetchTeams();

  const store2 = useUserStore();
  await store2.fetchUsers();

  const store3 = useTicketStore();
  await store3.fetchTickets();

  const store4 = useTicketActivityStore();
  await store4.fetchTicketActivities();

  const store5 = useTeamMembershipStore();
  await store5.fetchTeamMemberships();
}

onMounted(async () => {
  init()
})
</script>

<template>
  <RouterView></RouterView>
</template>