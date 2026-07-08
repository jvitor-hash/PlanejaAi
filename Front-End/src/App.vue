<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import '@/assets/main.css';
import { useTeamStore } from '@/stores/teamStore';
import { useUserStore } from '@/stores/userStore';
import { useTicketStore } from '@/stores/ticketStore';

async function init() {
  const store1 = useTeamStore();
  await store1.fetchTeams();

  const store2 = useUserStore();
  await store2.fetchUsers();

  const store3 = useTicketStore();
  await store3.fetchTickets();
}

onMounted(async () => {
  init()
})
</script>

<template>
  <RouterView></RouterView>
</template>