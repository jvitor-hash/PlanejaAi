<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTicketActivityStore } from '@/stores/ticketActivityStore'
import ActivityItem from '@/components/activityItem.vue'
import Card from '@/components/card.vue'
import FilterChips from '@/components/filterChips.vue'
import BestPerfomance from '@/components/bestPerfomance.vue'

const ticketsActivities = ref([])
const Datefilter = ref([])

// filtered tickets
const filteredTickets = computed(() => {
  const now = new Date();

  return ticketsActivities.value.filter((ticket) => {
    const created = new Date(ticket.createdAt);

    switch (Datefilter.value) {
      case "Dia":
        return (
          created.getFullYear() === now.getFullYear() &&
          created.getMonth() === now.getMonth() &&
          created.getDate() === now.getDate()
        );

      case "Mês":
        return (
          created.getFullYear() === now.getFullYear() &&
          created.getMonth() === now.getMonth()
        );

      case "Ano":
        return created.getFullYear() === now.getFullYear();

      default:
        return true;
    }
  });
});

function listTicketActivities() {
  const activitiesStore = useTicketActivityStore();

  ticketsActivities.value = activitiesStore.activities;
}

// fetch tickets
onMounted(async () => {
  listTicketActivities();
})
</script>
<template>
  <Card id="wrapper">
    <Card>
      <div class="header">
        <h1>Atividades Recentes</h1>
        <FilterChips :chips="['Dia', 'Mês', 'Ano']" v-model="Datefilter" />
      </div>

      <ActivityItem v-for="ticket in filteredTickets" v-bind:key="ticket" :ticket="ticket" />
    </Card>

    <Card>
      <h1>Melhores Funcionarios</h1>
      <!-- <BestPerfomance /> -->
    </Card>
  </Card>
</template>

<style scoped lang="css">
#wrapper {
  display: flex;
  gap: var(--spacing-sm);

  > * {
    flex: 1;
  }
}

.header {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-rg);
}
</style>
