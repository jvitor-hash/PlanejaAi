<script setup lang="ts">
import Card from '@/components/card.vue'
import Ticket from '@/components/ticket.vue'
import { ref, reactive, onMounted, computed } from 'vue';
import ModalPanel from '@/components/modalPanel.vue';
import FormGroup from '@/components/formGroup.vue';
import { getAllTickets, updateTicket } from '@/composable/services/useTicketService';

const props = defineProps({
  teams: {
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
  due_date: new Date(),
  team_id: 0,
  author_id: 0
})

async function getTickets() {
  const { data, error, loading } = await getAllTickets();

  if (data)
    tickets.value = data.value;
}

async function getTeams() {
  const { data, error, loading } = await getAllTeams();

  if (data)
    teams.value = data.value;
}

onMounted(async () => {
  getTickets()
  teams.value = props.teams;
})

const pendingTickets = computed(() =>
  tickets.value.filter(ticket => ['PENDING'].includes(ticket.status))
)

const inProgressTickets = computed(() =>
  tickets.value.filter(ticket => ['IN_PROGRESS'].includes(ticket.status))
)

const completedTickets = computed(() =>
  tickets.value.filter(ticket => ['DONE'].includes(ticket.status))
)

async function handleUpdateForm() {
  const { data, error, loading } = updateTicket(form.id, form);

  if (data)
    console.log(data);
}

function editModal(data : any) {
  if (data) {
    form.id = data.ticket.id
    form.name = data.ticket.name
    form.description = data.ticket.description
    form.priority = data.ticket.priority
    form.author_id = data.ticket.author_id
    form.team_id = data.ticket.team_id
  }
}

function toggleEditModal() {
  modalEditToggled.value = !modalEditToggled.value;
}

</script>

<template>
  <Card class="container">
    <!-- Pending -->
    <Card :shadow="false">
      <h2>Pendente</h2>

      <Ticket
        v-for="ticket in pendingTickets" v-bind:key="ticket" :ticket="ticket" @settings-click="editModal(); toggleEditModal()"
      />
    </Card>

    <!-- In Progress -->
    <Card :shadow="false">
      <h2>Em andamento</h2>

      <Ticket 
        v-for="ticket in inProgressTickets" v-bind:key="ticket" :ticket="ticket" @settings-click="editModal(); toggleEditModal()" 
      />
    </Card>

    <!-- Completed -->
    <Card :shadow="false">
      <h2>Concluído</h2>

      <Ticket 
        v-for="ticket in completedTickets" v-bind:key="ticket" :ticket="ticket" @settings-click="editModal(); toggleEditModal()" 
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
          <option selected value="LOW">Baixa</option>
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
          <option v-for="team in props.teams" v-bind:key="team" :value="team.id">{{ team.name }}</option>
        </select>
      </FormGroup>
      
      <FormGroup label-text="Data de atraso:">
        <input v-model="form.due_date" type="date">
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