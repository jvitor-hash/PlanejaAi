<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue'
// import searchFilter from '@/components/searchFilter.vue'
import Card from '@/components/card.vue'
import ProfileCard from '@/components/profileCard.vue'
import Header from '@/layout/Header.vue'
import Sidebar from '@/layout/Sidebar.vue'
import FloatingAction from '@/components/floatingAction.vue'
import ModalPanel from '@/components/modalPanel.vue'
import FormGroup from '@/components/formGroup.vue'
import { useFetch } from '@/composable/useFetch'
import TeamCard from '@/components/teamCard.vue'

const users = ref([])
const teams = ref([])
const searchQuery = ref('')
const filterUsers = ref([])
const isModalOpen = ref(false)

const form = reactive({
  name: '',
  description: '',
  status: 'ACTIVE',
  members: [],
})

async function getUsers() {
  const { data, execute } = useFetch()

  await execute('http://localhost:3000/api/users/', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })

  users.value = data.value
}

async function getTeams() {
  const { data, execute } = useFetch()

  await execute('http://localhost:3000/api/teams/', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })

  teams.value = data.value
}

// Handles submitting the form to create a new team
async function handleForm() {
  const { data, error, execute } = useFetch()

  await execute('http://localhost:3000/api/teams/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      title: form.name,
      description: form.description,
      team_status: form.status
    }),
  })

  if (!error.value) {
    // Refresh the list, reset form fields, and close modal on success
    await getTeams()
    form.name = ''
    form.description = ''
    form.status = 'ACTIVE'
    toggleModal()
  }
}

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value

  return users.value.filter((user: any) =>
    user.name?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

function toggleModal() {
  isModalOpen.value = !isModalOpen.value
}

onMounted(() => {
  getUsers()
  getTeams() // Fetch teams on component load
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
      <h1>Equipes</h1>

      <section class="grid">
        <TeamCard
          v-for="team in teams"
          :key="team.id"
          :item-id="team.id"
          :item-team-name="team.title"
          :item-team-description="team.description"
          :item-team-status="team.team_status"
        />
      </section>

      <section>
        <Card>
          <div class="search">
            <input v-model="searchQuery" ref="search_input" type="text" placeholder="Pesquisar por nome" />
            <!-- <button @click="filterSearch">Pesquisar</button> -->
          </div>

          <!-- <div class="filter-chips">
            <p>Equipes:</p>
            <FilterChips
              v-for="team in teams"
              :key="team.id"
              :chips="teams.value.map((team) => team.name)"
            />
          </div> -->
        </Card>
      </section>

      <section class="grid">
        <ProfileCard
          v-for="item in filteredUsers"
          :key="item.id"
          :profile-name="item.name"
          :profile-role="item.role || 'Sem cargo.'"
          :profile-status="item.status"
        />
      </section>

      <FloatingAction direction="bottom-right" @click="toggleModal">+</FloatingAction>

      <ModalPanel v-if="isModalOpen">
        <h2>Equipe</h2>
        <form class="modal-form" @submit.prevent="handleForm">
          <FormGroup label-text="Nome:">
            <input v-model="form.name" type="text" placeholder="Nome da equipe..." required />
          </FormGroup>

          <FormGroup label-text="Description:">
            <textarea
              v-model="form.description"
              placeholder="Descrição da equipe..."
            ></textarea>
          </FormGroup>

          <FormGroup label-text="Status">
            <select v-model="form.status" require>
              <option value="ACTIVE">Ativo</option>
              <option value="INACTIVE">Inativo</option>
              <option value="ARCHIVED">Arquivado</option>
            </select>
          </FormGroup>

          <div style="margin-top: var(--spacing-rg); display: flex; gap: var(--spacing-sm)">
            <button type="submit">Criar Equipe</button>
            <button type="button" @click="toggleModal">Cancelar</button>
          </div>
        </form>
      </ModalPanel>
    </main>
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

.form-group input,
.form-group textarea,
.form-group select, .form-group button {
  padding: var(--spacing-sm);
  font-family: inherit;
}

.page-wrapper main .grid {
  display: grid;
  @media (width < 650px) {
    grid-template-columns: repeat(2, 1fr);
  }
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-sm);
}

.search {
  display: flex;
  justify-content: space-between;
}

.search input[type='text'] {
  padding: var(--spacing-xs);
  outline-color: var(--accent-color);
  min-width: 15%;
}

.search button {
  background-color: var(--accent-color);
  color: #fff;
  border: 1px solid var(--accent-color);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: transparent;
    border: 1px solid var(--accent-color);
    color: var(--accent-color);
  }
}

.filter-chips {
  margin-block-start: var(--spacing-rg);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

:root[data-theme='dark'] {
  .page-wrapper main {
    h1 {
      color: constrast-color(var(--accent-color));
    }
  }
}
</style>
