<script setup lang="ts">
import Card from '@/components/card.vue'
import Ticket from '@/components/ticket.vue'
import { ref, reactive, onMounted, computed } from 'vue';
import ModalPanel from '@/components/modalPanel.vue';
import FormGroup from '@/components/formGroup.vue';
import { getAllTickets, updateTicket } from '@/composable/services/useTicketService';
const tickets = ref([])
const modalEditToggled = ref(false);

const form = reactive({
  id: 0,
  name: '',
  description: '',
  priority: 'MED',
  status: 'PENDING',
})

onMounted(async () => {
  const { data, error, loading } = getAllTickets();

  if (data)
    tickets.value = data.value;
})

const pendingTickets = computed(() =>
  tickets.value.filter(ticket =>
    ['PENDING'].includes(ticket.status)
  )
)

const inProgressTickets = computed(() =>
  tickets.value.filter(ticket =>
    ['IN_PROGRESS'].includes(ticket.status)
  )
)

const completedTickets = computed(() =>
  tickets.value.filter(ticket =>
    ['DONE'].includes(ticket.status)
  )
)

async function handleUpdateForm() {
  const { data, error, loading } = updateTicket(form.id, form);

  if (data)
    console.log(data);
}

function toggleEditModal(data) {
  modalEditToggled.value = !modalEditToggled.value;
  form.id = data.id
  form.name = data.name
  form.description = data.description
  form.priority = data.priority
}

</script>

<template>
  <Card class="container">
    <!-- Pending -->
    <Card :shadow="false">
      <h2>Pendente</h2>

      <Ticket
        v-for="ticket in pendingTickets"
        :key="ticket.id"
        :item-id="ticket.id"
        :item-title="ticket.name"
        :item-priority="ticket.priority"
        :item-description="ticket.description"
        :item-status="ticket.status"
        @settings-click="toggleEditModal"
      />
    </Card>

    <!-- In Progress -->
    <Card :shadow="false">
      <h2>Em andamento</h2>

      <Ticket
        v-for="ticket in inProgressTickets"
        :key="ticket.id"
        :item-id="ticket.id"
        :item-title="ticket.name"
        :item-priority="ticket.priority"
        :item-description="ticket.description"
        @settings-click="toggleEditModal"
      />
    </Card>

    <!-- Completed -->
    <Card :shadow="false">
      <h2>Concluído</h2>

      <Ticket
        v-for="ticket in completedTickets"
        :key="ticket.id"
        :item-id="ticket.id"
        :item-title="ticket.name"
        :item-priority="ticket.priority"
        :item-description="ticket.description"
        @settings-click="toggleEditModal"
      />
    </Card>
  </Card>

  <ModalPanel v-if="modalEditToggled">
    <h2>Edicao de ticket</h2>
    <form @submit.prevent="handleUpdateForm">
      <FormGroup label-text="Nome:">
        <input v-model="form.name" type="text" required placeholder="Nome do ticket..." />
      </FormGroup>

      <FormGroup label-text="Descricao:">
        <textarea v-model="form.description" required placeholder="Descricao do ticket..."></textarea>
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
          <option selected value="BACKLOG">Backlog</option>
          <option value="PENDING">Pendente</option>
          <option value="REVIEW">Em revisão</option>
          <option value="IN_PROGRESS">Em andamento</option>
          <option value="DONE">Concluído</option>
        </select>
      </FormGroup>

      <div style="margin-top: var(--spacing-rg); display: flex; gap: var(--spacing-sm)" :no-label="true">
        <button type="submit" class="btn">Salvar</button>
        <button type="button" @click="toggleEditModal" class="btn">Cancelar</button>
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