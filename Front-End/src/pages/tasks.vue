<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue'
import Header from '@/layout/Header.vue'
import Kanban from '@/layout/Kanban.vue'
import Sidebar from '@/layout/Sidebar.vue'
import FilterChips from '@/components/filterChips.vue'
import FloatingAction from '@/components/floatingAction.vue'
import ModalPanel from '@/components/modalPanel.vue'
import FormGroup from '@/components/formGroup.vue'
import Card from '@/components/card.vue'
import { createTicket } from '@/composable/services/useTicketService';
import { getAllTeams } from '@/composable/services/useTeamService';

const modalCreate = ref(false)
const teams = ref([])
const teamNames = ref([])
const form = reactive({
  name: '',
  description: '',
  priority: 'MED',
  status: 'PENDING',
  due_date: new Date(),
  team_id: 0,
  author_id: 0
})

function toggleCreateModal() {
  modalCreate.value = !modalCreate.value;
}

async function updateTeams() {
  const { data, error, loading } = await getAllTeams();
  
  if (data) {
    teams.value = data.value; 
    teamNames.value = teams.value.map(team => team.name);
  }
}

onMounted(async () => {
  const { data, error, loading } = await getAllTeams();

  if (data) {
    teams.value = data.value; 
    teamNames.value = teams.value.map(team => team.name);
  }
})

async function handleCreateForm() {
  form.author_id = Number(localStorage.getItem('id'));
  const { data, error, loading } = createTicket(form);

  console.log('test');

  if (data) {
    await updateTeams();
    form.name = '';
    form.description = '';
    form.priority = 'MED';
    form.status = 'PENDING';
    toggleCreateModal();
  }
}

const selectedValues = ref([])
</script>

<template>
  <div class="page-wrapper">
    <aside>
      <Sidebar />
    </aside>

    <header>
      <Header />
    </header>

    <main>
      <h1>Tarefas</h1>

      <Card class="teams-card">
        <p><b>Equipes:</b></p>
        <FilterChips :chips="teamNames" v-model="selectedValues" />
      </Card>

      <section>
        <Kanban :teams="teams"/>
      </section>

      <FloatingAction direction="bottom-right" @click="toggleCreateModal">+</FloatingAction>
    </main>

    <ModalPanel class="modal-create" v-if="modalCreate">
        <h2>Criação de ticket</h2>
        <form @submit.prevent="handleCreateForm">
          <FormGroup label-text="Nome:">
            <input v-model="form.name" type="text" required placeholder="Nome do ticket..." />
          </FormGroup>

          <FormGroup label-text="Descrição:">
            <textarea v-model="form.description" required placeholder="Descrição do ticket..."></textarea>
          </FormGroup>

          <FormGroup label-text="Prioridade:">
            <select v-model="form.priority" required>
              <option selected value="LOW">Baixa</option>
              <option value="MED">Media</option>
              <option value="HIGH">Alta</option>
            </select>
          </FormGroup>

          <FormGroup label-text="Status:">
            <select v-model="form.status" required>
              <option selected value="PENDING">Pendente</option>
              <option value="IN_PROGRESS">Em andamento</option>
              <option value="DONE">Concluído</option>
            </select>
          </FormGroup>

          <FormGroup label-text="Equipe:">
            <select v-model="form.team_id" required>
              <option v-for="team in teams" :value="team.id">{{ team.name }}</option>
            </select>
          </FormGroup>

          <FormGroup label-text="Data de atraso:">
            <input v-model="form.due_date" type="date">
          </FormGroup>

          <div style="margin-top: var(--spacing-rg); display: flex; gap: var(--spacing-sm)">
            <button type="submit" class="btn btn-primary">Salvar</button>
            <button type="button" @click="toggleCreateModal" class="btn btn-primary">Cancelar</button>
          </div>
        </form>
      </ModalPanel>
  </div>
</template>

<style scoped lang="css">
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

.form-group input, .form-group select, .form-group textarea, .form-group button {
  font-family: inherit;
  padding: var(--spacing-sm);
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
}

.teams-card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

:root[data-theme='dark'] {
  .page-wrapper main {
    h1 {
      color: constrast-color(var(--accent-color));
    }
  }
}
</style>
