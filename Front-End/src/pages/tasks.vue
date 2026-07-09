<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue'
import Header from '@/layout/Header.vue'
import Sidebar from '@/layout/Sidebar.vue'
import FilterChips from '@/components/filterChips.vue'
import ModalPanel from '@/components/modalPanel.vue'
import FormGroup from '@/components/formGroup.vue'
import Card from '@/components/card.vue'
import Ticket from '@/components/ticket.vue'
import { createTicket, updateTicket, deleteTicket } from '@/composable/services/useTicketService'
import { createTicketActivity } from '@/composable/services/useTicketActivityService';
import { useTicketActivityStore } from '@/stores/ticketActivityStore'
import { useTicketStore } from '@/stores/ticketStore'
import { useTeamStore } from '@/stores/teamStore'

const modalCreate = ref(false);
const modalEditToggled = ref(false);
const tickets = ref([]);
const teams = ref([]);
const selectedValues = ref([]);
const teamNames = ref([]);
const form = reactive({
  id: 0,
  name: '',
  description: '',
  priority: 'MED',
  status: 'PENDING',
  due_date: '',
  team_id: 0,
  author_id: 0
})

function toggleCreateModal() {
  modalCreate.value = !modalCreate.value
}

async function updateTickets() {
  const ticketStore = useTicketStore()
  await ticketStore.fetchTickets()

  tickets.value = ticketStore.tickets
}

function listTickets() {
  const ticketStore = useTicketStore()

  tickets.value = ticketStore.tickets
}

function formatDate(date) {
  const d = new Date(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const dueDate = computed({
  get() {
    return formatDate(form.due_date);
  },
  set(value) {
    form.due_date = value;
  }
});

const matchesTeamFilter = (ticket) => {
  // No filter selected, show all teams
  if (!selectedValues.value.length) return true

  const team = teams.value.find(team => team.id === ticket.team_id)
  return team && selectedValues.value.includes(team.name)
}

const pendingTickets = computed(() =>
  tickets.value.filter(ticket =>
    ticket.status === 'PENDING' &&
    matchesTeamFilter(ticket) 
  )
)

const inProgressTickets = computed(() =>
  tickets.value.filter(ticket =>
    ticket.status === 'IN_PROGRESS' &&
    matchesTeamFilter(ticket)
  )
)

const completedTickets = computed(() =>
  tickets.value.filter(ticket =>
    ticket.status === 'DONE' &&
    matchesTeamFilter(ticket)
  )
)

async function updateActivities() {
  const activitiesStore = useTicketActivityStore();
  await activitiesStore.fetchTicketActivities();
}

function listTeams() {
  const teamStore = useTeamStore()

  teams.value = teamStore.teams
  teamNames.value = teams.value.map((team) => team.name)
}

async function handleUpdateForm() {
  const { data, error, loading } = await updateTicket(form.id, form);

  const activityData = {
    ticket_id: form.id,
    user_id: Number(localStorage.getItem('id')),
    action: 'Usuário atualizou uma tarefa.',
    type: 'STATUS_CHANGED'
  }

  const { data2, error2, loading2 } = await createTicketActivity(activityData);

  if (data) {
    // Reset form fields, and close modal on success
    await updateTickets()
    await updateActivities()
    form.id = 0
    form.name = ''
    form.description = ''
    toggleEditModal(null)
  }
}

async function handleDelete() {
  const { data, error, loading } = await deleteTicket(form.id);

  const activityData = {
    ticket_id: form.id,
    user_id: Number(localStorage.getItem('id')),
    action: 'Usuário deletou uma tarefa.',
    type: 'DELETED'
  }

  const { data2, error2, loading2 } = await createTicketActivity(activityData);

  if (data) {
    // Reset form fields, and close modal on success
    await updateTickets()
    await updateActivities()
    form.id = 0
    form.name = ''
    form.description = ''
    toggleEditModal(null)
  }
}

async function handleCreateForm() {
  form.author_id = Number(localStorage.getItem('id'))
  const { data, error, loading } = await createTicket(form)

  const activityData = {
    ticket_id: form.id,
    user_id: Number(localStorage.getItem('id')),
    action: 'Usuário criou uma tarefa.',
    type: 'CREATED'
  }

  const { data2, error2, loading2 } = await createTicketActivity(activityData);

  if (data) {
    await updateTickets()
    await updateActivities()
    form.name = ''
    form.description = ''
    form.priority = 'MED'
    form.status = 'PENDING'
    toggleCreateModal()
  }
}

function toggleEditModal(data : any) {
  modalEditToggled.value = !modalEditToggled.value;

  if (data) {
    form.id = data.ticket.id
    form.name = data.ticket.name
    form.description = data.ticket.description
    form.priority = data.ticket.priority
    form.status = data.ticket.status
    form.author_id = data.ticket.author_id
    form.team_id = data.ticket.team_id
    form.due_date = data.ticket.due_date;
  }
}

onMounted(async () => {
  listTickets()
  listTeams()
})
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
        <button @click="toggleCreateModal" class="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16" >
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
          </svg>
          Criar tarefa
        </button>

        <Card class="container">
          <!-- Pending -->
          <Card :shadow="false">
            <h2>Pendente</h2>

            <Ticket v-for="ticket in pendingTickets" v-bind:key="ticket" :ticket="ticket" @settings-click="toggleEditModal" />
          </Card>

          <!-- In Progress -->
          <Card :shadow="false">
            <h2>Em andamento</h2>

            <Ticket v-for="ticket in inProgressTickets" v-bind:key="ticket" :ticket="ticket" @settings-click="toggleEditModal" />
          </Card>

          <!-- Completed -->
          <Card :shadow="false">
            <h2>Concluído</h2>

            <Ticket v-for="ticket in completedTickets" v-bind:key="ticket" :ticket="ticket" @settings-click="toggleEditModal" />
          </Card>
        </Card>
      </section>
    </main>

    <ModalPanel class="modal-create" v-if="modalCreate">
      <h2>Criação de ticket</h2>
      <form @submit.prevent="handleCreateForm">
        <FormGroup label-text="Nome:">
          <input v-model="form.name" type="text" required placeholder="Nome do ticket..." />
        </FormGroup>

        <FormGroup label-text="Descrição:">
          <textarea
            v-model="form.description"
            required
            placeholder="Descrição do ticket..."
          ></textarea>
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
          <input v-model="form.due_date" type="date" />
        </FormGroup>

        <div style="margin-top: var(--spacing-rg); display: flex; gap: var(--spacing-sm)">
          <button type="submit" class="btn btn-primary">Criar</button>
          <button type="button" @click="toggleCreateModal" class="btn btn-primary">Cancelar</button>
        </div>
      </form>
    </ModalPanel>

    <ModalPanel v-if="modalEditToggled">
      <h2>Edição de ticket</h2>
      <form @submit.prevent="handleUpdateForm">
        <FormGroup label-text="Nome:">
          <input v-model="form.name" type="text" required placeholder="Nome do ticket..." />
        </FormGroup>

        <FormGroup label-text="Descrição:">
          <textarea
            v-model="form.description"
            required
            placeholder="Descrição do ticket..."
          ></textarea>
        </FormGroup>

        <FormGroup label-text="Prioridade:">
          <select v-model="form.priority" required>
            <option value="LOW">Baixa</option>
            <option value="MED">Media</option>
            <option value="HIGH">Alta</option>
          </select>
        </FormGroup>

        <FormGroup label-text="Status:">
          <select v-model="form.status" required>
            <option value="PENDING">Pendente</option>
            <option value="IN_PROGRESS">Em andamento</option>
            <option value="DONE">Concluído</option>
          </select>
        </FormGroup>

        <FormGroup label-text="Equipe:">
          <select v-model="form.team_id" required>
            <option v-for="team in teams" v-bind:key="team" :value="team.id">
              {{ team.name }}
            </option>
          </select>
        </FormGroup>

        <FormGroup label-text="Data de atraso:">
          <input v-model="dueDate" type="date" />
        </FormGroup>

        <div
          style="margin-top: var(--spacing-rg); display: flex; gap: var(--spacing-sm)"
          :no-label="true"
        >
          <button type="submit" class="btn btn-primary">Salvar</button>
          <button type="button" @click="toggleEditModal" class="btn btn-primary">Cancelar</button>
          <button type="button" @click="handleDelete" class="btn btn-danger">Deletar</button>
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

.form-group input,
.form-group select,
.form-group textarea,
.form-group button {
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

.container {
  display: flex;
  align-items: stretch;
  min-height: 750px;
  min-width: fit-content;
  gap: var(--spacing-sm);

  > * {
    flex: 1;
    text-wrap: nowrap;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }
}

.btn {
  display: flex;
  justify-self: end;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);

  > svg {
    color: inherit;
  }
}
</style>
