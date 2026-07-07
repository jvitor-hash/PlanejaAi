<script setup lang="ts">
import { useFetch } from '@/composable/useFetch'
import { ref, computed, onMounted } from 'vue'
import ActivityItem from '@/components/activityItem.vue'
import Card from '@/components/card.vue'

// tickets from API
const tickets = ref<any[]>([])

// filter state
const filter = ref<'day' | 'month' | 'year'>('day')

// fetch tickets
onMounted(async () => {
  const { data, error, loading, execute } = useFetch()

  await execute('http://localhost:3000/api/activity/', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })

  if (data) 
    tickets.value = data.value
})

// helper: check date range
function isWithinFilter(dateStr: string, type: string) {
  const created = new Date(dateStr)
  const now = new Date()

  if (type === 'day') {
    return created.toDateString() === now.toDateString()
  }

  if (type === 'month') {
    return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear()
  }

  if (type === 'year') {
    return created.getFullYear() === now.getFullYear()
  }

  return true
}

// filtered tickets
const filteredTickets = computed(() => {
  return tickets.value.filter((t) => isWithinFilter(t.created_at, filter.value))
})
</script>
<template>
  <Card id="wrapper">
    <Card>
      <div class="title">
        <h1>Atividades Recentes</h1>

        <select v-model="filter">
          <option value="day">Dia</option>
          <option value="month">Mês</option>
          <option value="year">Ano</option>
        </select>
      </div>

      <ActivityItem v-for="ticket in filteredTickets" :key="ticket.id" :item-action="ticket" />
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

.title {
  display: flex;
  > * {
    flex: 1;
  }
}

.title select {
  max-width: fit-content;
  border: none;
  color: var(--accent-color);
  background-color: transparent;
}
</style>
