<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useFetch } from '@/composable/useFetch'
import BarChart from '@/components/barChart.vue'
import Card from '@/components/card.vue'
import LineChart from '@/components/lineChart.vue'
import PieChart from '@/components/pieChart.vue'

const tickets = ref<any[]>([])

// load data
onMounted(async () => {
  const { data, error, loading, execute } = useFetch()

  await execute('http://localhost:3000/api/tickets/', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })

  if (data)
    tickets.value = data.value;
})

/**
 * PIE CHART: status breakdown
 */
const pieData = computed(() => {
  const statusCount = {
    pending: 0,
    in_progress: 0,
    done: 0,
  }

  for (const t of tickets.value) {
    const status = (t.status || '').toUpperCase()
    if (status === 'PENDING' || status === 'BACKLOG') statusCount.pending++
    else if (status === 'IN_PROGRESS' || status === 'REVIEW') statusCount.in_progress++
    else if (status === 'DONE' || status === 'BLOCKED' || status === 'CANCELLED') statusCount.done++
  }

  const total = tickets.value.length;

  return [statusCount.pending, statusCount.in_progress, statusCount.done, total]
})

/**
 * BAR CHART: tickets per weekday (created_at assumed)
 */
const barData = computed(() => {
  const days = [0, 0, 0, 0, 0] // Mon–Fri

  for (const t of tickets.value) {
    if (!t.created_at) continue
    const d = new Date(t.created_at).getDay()

    // JS: 0=Sun ... 6=Sat → map Mon-Fri
    if (d >= 1 && d <= 5) {
      days[d - 1]++
    }
  }

  return days
})

/**
 * LINE CHART: tickets per month
 */
const lineData = computed(() => {
  const months = Array(12).fill(0)

  for (const t of tickets.value) {
    if (!t.created_at) continue
    const m = new Date(t.created_at).getMonth()
    months[m]++
  }

  return months
})

const labels_pie = ['Pendente', 'Em andamento', 'Concluídos', 'Total']
const labels_bar = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex']
const labels_line = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
]
</script>

<template>
  <Card class="graphs">
    <Card :shadow="false">
      <h1>Grafico</h1>
      <!-- <FilterChips :chips="['Dia', 'Mês', 'Ano']" v-model="selectedValues" /> -->
      <PieChart :labels="labels_pie" unit-name="Tickets" :data="pieData" />
    </Card>

    <Card :shadow="false">
      <h1>Tickets concluídos semanal</h1>
      <BarChart :labels="labels_bar" unit-name="Tickets" :data="barData" />
    </Card>

    <Card :shadow="false">
      <h1>Tickets concluídos anual</h1>
      <LineChart :labels="labels_line" unit-name="Tickets" :data="lineData" />
    </Card>
  </Card>
</template>

<style scoped lang="css">
.graphs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (width < 650px) {
    grid-template-columns: repeat(1, 1fr);
  }

  min-height: 500px;
  gap: 10px;

  h1 {
    color: var(--text-color);
    text-wrap: nowrap;
    margin-bottom: var(--spacing-md);
  }

  div {
    background-color: var(--bg-light);
  }
}
</style>
