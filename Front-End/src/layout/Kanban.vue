<script setup lang="ts">
import Card from '@/components/card.vue'
import Ticket from '@/components/ticket.vue'
import { ref, reactive, onMounted, computed } from 'vue';
import ModalPanel from '@/components/modalPanel.vue';
import FormGroup from '@/components/formGroup.vue';
import { updateTicket } from '@/composable/services/useTicketService';
import { useTeamStore } from '@/stores/teamStore';
import { useTicketStore } from '@/stores/ticketStore';

const props = defineProps({
  filterTeams: {
    type: Array,
    required: true
  }
})

const tickets = ref([])
const teams = ref([])
const modalEditToggled = ref(false);
const teamFilter = ref([]);

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

async function getTickets() {
  const ticketStore = useTicketStore();

  tickets.value = ticketStore.tickets;
}

async function getTeams() {
  const teamStore = useTeamStore();

  teams.value = teamStore.teams;
}

const matchesTeamFilter = (ticket) => {
  // No filter selected, show all teams
  if (!props.filterTeams.length) return true

  const team = teams.value.find(team => team.id === ticket.team_id)
  return team && props.filterTeams.includes(team.name)
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

async function handleUpdateForm() {
  const { data, error, loading } = updateTicket(form.id, form);

  if (data)
    console.log(data);
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

function toggleEditModal(data : any) {
  modalEditToggled.value = !modalEditToggled.value;

  if (data) {
    form.id = data.ticket.id
    form.name = data.ticket.name
    form.description = data.ticket.description
    form.priority = data.ticket.priority
    form.author_id = data.ticket.author_id
    form.team_id = data.ticket.team_id
    form.due_date = data.ticket.due_date;
  }
}

onMounted(async () => {
  getTickets()
  getTeams()
})
</script>

<template>
  <Card class="container">
    <!-- Pending -->
    <Card :shadow="false">
      <h2>Pendente</h2>

      <Ticket
        v-for="ticket in pendingTickets" v-bind:key="ticket" :ticket="ticket" @settings-click="toggleEditModal"
      />
    </Card>

    <!-- In Progress -->
    <Card :shadow="false">
      <h2>Em andamento</h2>

      <Ticket 
        v-for="ticket in inProgressTickets" v-bind:key="ticket" :ticket="ticket" @settings-click="toggleEditModal" 
      />
    </Card>

    <!-- Completed -->
    <Card :shadow="false">
      <h2>Concluído</h2>

      <Ticket 
        v-for="ticket in completedTickets" v-bind:key="ticket" :ticket="ticket" @settings-click="toggleEditModal" 
      />
    </Card>
  </Card>

  <ModalPanel v-if="modalEditToggled">
    <h2>Edicao de ticket</h2>
    <form @submit.prevent="handleUpdateForm">
      <FormGroup label-text="Nome:">
        <input v-model="form.name" type="text" required placeholder="Nome do ticket..." />
      </FormGroup>

      <FormGroup label-text="Descrição:">
        <textarea v-model="form.description" required placeholder="Descrição do ticket..."></textarea>
      </FormGroup>

      <FormGroup label-text="Prioridade:">
        <select v-model="form.priority" required >
          <option value="LOW">Baixa</option>
          <option value="MED">Media</option>
          <option value="HIGH">Alta</option>
        </select>
      </FormGroup>

      <FormGroup label-text="Status:">
        <select v-model="form.status" required >
          <option value="PENDING">Pendente</option>
          <option value="IN_PROGRESS">Em andamento</option>
          <option value="DONE">Concluído</option>
        </select>
      </FormGroup>

      <FormGroup label-text="Equipe:">
        <select v-model="form.team_id" required >
          <option v-for="team in teams" v-bind:key="team" :value="team.id">{{ team.name }}</option>
        </select>
      </FormGroup>
      
      <FormGroup label-text="Data de atraso:">
        <input v-model="dueDate" type="date">
      </FormGroup>

      <div style="margin-top: var(--spacing-rg); display: flex; gap: var(--spacing-sm)" :no-label="true">
        <button type="submit" class="btn btn-primary">Salvar</button>
        <button type="button" @click="toggleEditModal" class="btn btn-primary">Cancelar</button>
      </div>
    </form>
  </ModalPanel>
</template>

<style scoped lang="css">
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

.form-group input, select, textarea, button {
  font-family: inherit;
  padding: var(--spacing-sm);
}
</style>