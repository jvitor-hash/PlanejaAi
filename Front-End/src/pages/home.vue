<script setup lang="ts">
import Sidebar from '@/layout/Sidebar.vue'
import Header from '@/layout/Header.vue'
import Card from '@/components/card.vue';
import StatsCounter from '@/components/StatsCounter.vue';
import Graphs from '@/layout/Graphs.vue';
import Activities from '@/layout/Activities.vue';
import { getAllTickets } from '@/composable/services/useTicketService';
import { ref, onMounted, computed } from 'vue';

const tickets = ref([]);
const stats = [];

onMounted(async () => {
  const { data, error, loading } = await getAllTickets();

  if (data)
    tickets.value = data.value;
})

const filterStats = computed(() => {
  const statusCount = {
    pending: 0,
    in_progress: 0,
    done: 0,
  }

  for (const t of tickets.value) {
    const status = (t.status || '').toUpperCase()
    if (status === 'PENDING') statusCount.pending++
    else if (status === 'IN_PROGRESS') statusCount.in_progress++
    else if (status === 'DONE') statusCount.done++
  }

  const total = tickets.value.length;

  return [statusCount.pending, statusCount.in_progress, statusCount.done, total]
})

</script>

<template>
  <div class="page-wrapper">
    <aside>
      <Sidebar/>
    </aside>

    <header>
      <Header/>
    </header>

    <main>
      <h1>Dashboard</h1>

      <section>
        <Card class="stats">
          <StatsCounter :stat-count="filterStats[0]" stat-name="Pendente"/>
          <StatsCounter :stat-count="filterStats[1]" stat-name="Em Andamento"/>
          <StatsCounter :stat-count="filterStats[2]" stat-name="Concluídos"/>
          <StatsCounter :stat-count="filterStats[3]" stat-name="Total"/>
        </Card>
      </section>

      <section>
        <Graphs/>
      </section>

      <section>
        <!-- <Activities/> -->
      </section>
    </main>
  </div>

</template>

<style scoped>
  .page-wrapper {
    display: grid;
    grid-template-areas: 
      'a b b'
      'a c c';
    
    grid-template-columns: 60px 1fr;
    grid-template-rows: auto 1fr;
    min-height: 100dvh;
  }

  .page-wrapper aside {
    position: fixed;
    grid-area: a;
    height: 100svh;
    z-index: 5;
  }

  .page-wrapper header {
    grid-area: b;
  }

  .page-wrapper main {
    grid-area: c;
    padding: var(--spacing-sm);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);

    overflow-y: auto;
    overflow-x: auto;

    h1 {
      color: var(--accent-color);
    }

    .stats {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      gap: 10px;
      min-width: fit-content;
    }
  }

  :root[data-theme="dark"] {
    .page-wrapper main {
      h1 {
        color: constrast-color(var(--accent-color));
      }
    }
  }
</style>