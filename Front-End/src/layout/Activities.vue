<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTicketActivityStore } from '@/stores/ticketActivityStore'
import ActivityItem from '@/components/activityItem.vue'
import Card from '@/components/card.vue'
import FilterChips from '@/components/filterChips.vue'

const tickets = ref([])
const Datefilter = ref([])

// fetch tickets
onMounted(async () => {
  const ticketStore = useTicketActivityStore();
  tickets.value = ticketStore.activities;
})

// filtered tickets
const filteredTickets = computed(() => {
  return tickets.value;
})
</script>
<template>
  <Card id="wrapper">
    <Card>
      <div class="header  ">
        <h1>Atividades Recentes</h1>
        <FilterChips :chips="['Dia', 'Mês', 'Ano']" v-model="filter" />
      </div>

      <ActivityItem v-for="ticket in filteredTickets" v-bind:key="ticket" :item-action="ticket" />
    </Card>

    <Card>
      <h1>Melhores Funcionarios</h1>
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
}
</style>
