<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue'
import Card from '@/components/card.vue'
import ProfileCard from '@/components/profileCard.vue'
import Header from '@/layout/Header.vue'
import Sidebar from '@/layout/Sidebar.vue'
import FilterChips from '@/components/filterChips.vue'
import FloatingAction from '@/components/floatingAction.vue'
import ModalPanel from '@/components/modalPanel.vue'
import FormGroup from '@/components/formGroup.vue'
import { createTeam, updateTeam, deleteTeam } from '@/composable/services/useTeamService';
import { useUserStore } from '@/stores/userStore';
import { useTeamStore } from '@/stores/teamStore';
import { useTeamMembershipStore } from '@/stores/teamMembershipStore';
import TeamCard from '@/components/teamCard.vue'

const users = ref([])
const teams = ref([])
const teamMemberships = ref([])
const teamNames = ref([])
const searchQuery = ref('')
const isModalOpen = ref(false)
const isModalEditOpen = ref(false)
const activePage = ref('Edicao')
const selectedValues = ref([])

const formEdit = reactive({
  id: 0,
  name: '',
  description: '',
  team_status: 'ACTIVE',
  author_id: 0,
})

const formCreate = reactive({
  name: '',
  description: '',
  team_status: 'ACTIVE',
  author_id: 0,
})

async function listUsers() {
  const userStore = useUserStore();

  users.value = userStore.users;
}

async function listTeams() {
  const teamStore = useTeamStore();

  teams.value = teamStore.teams;
  teamNames.value = teams.value.map(team => team.name);
}

async function listTeamMembership() {
  const teamMembershipStore = useTeamMembershipStore();

  teamMemberships.value = teamMembershipStore.memberships;
}

async function updateTeams() {
  const teamStore = useTeamStore();
  await teamStore.fetchTeams();

  teams.value = teamStore.teams;
  teamNames.value = teams.value.map(team => team.name);
}

// Handles submitting the form to create a new team
async function handleForm() {
  formCreate.author_id = Number(localStorage.getItem('id'));
  const { data, error, execute } = await createTeam(formCreate);

  if (data) {
    // Refresh the list, reset form fields, and close modal on success
    await updateTeams()
    toggleModal()
  }
}

async function handleUpdateForm() {
    const { data, error, loading } = await updateTeam(formEdit.id, formEdit);

    if (data) {
      await updateTeams()
      toggleEditModal(null)
    }
}

async function handleDeleteForm() {
  console.log(formEdit.id);
  const { data, error, loading } = await deleteTeam(formEdit.id);

    if (data) {
      // Reset form fields, and close modal on success
      await updateTeams()
      toggleEditModal(null)
    }
}

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value

  return users.value.filter((user: any) =>
    user.name?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// TODO: Make this get the team ids from the name being 
// filtered and then get the relation between the user 
// and team by using the team membership table.
const filteredTeams = computed(() => {
  // const team_ids = [];
  // for (const team of teams.value) {
  //   if (team.name?.toLowerCase().includes(selectedValues.value.toLowerCase())) {
  //     team_ids.push(team.id);
  //   } else {
  //     return true;
  //   }
  // }
});

function toggleModal() {
  isModalOpen.value = !isModalOpen.value
}

function toggleEditModal(data) {
  isModalEditOpen.value = !isModalEditOpen.value

  if (data) {
    formEdit.id = data.team.id
    formEdit.name = data.team.name
    formEdit.description = data.team.description
    formEdit.team_status = data.team.team_status
    formEdit.author_id = data.team.author_id
  }
}

function switchTabs(tab) {
  activePage.value = tab
}

onMounted(() => {
  listUsers()
  listTeams()
  listTeamMembership()
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
        <TeamCard v-for="team in teams" v-bind:key="team" :team="team" @settings-click="toggleEditModal"/>
      </section>

      <section>
        <Card>
          <div class="search">
            <input v-model="searchQuery" ref="search_input" type="text" placeholder="Pesquisar usuario por nome" />
          </div>

          <!-- <div class="filter-chips">
            <p>Equipes:</p>
            <FilterChips :chips="teamNames" v-model="selectedValues" />
          </div> -->
        </Card>
      </section>

      <section class="grid">
        <ProfileCard v-for="item in filteredUsers" v-bind:key="item.id" :profile="item" />
      </section>

      <FloatingAction direction="bottom-right" @click="toggleModal">+</FloatingAction>

      <ModalPanel v-if="isModalOpen">
        <h2>Equipe</h2>
        <form class="modal-form" @submit.prevent="handleForm">
          <FormGroup label-text="Nome:">
            <input v-model="formCreate.name" type="text" placeholder="Nome da equipe..." required />
          </FormGroup>

          <FormGroup label-text="Descrição:">
            <textarea
              v-model="formCreate.description"
              placeholder="Descrição da equipe..."
            ></textarea>
          </FormGroup>

          <FormGroup label-text="Status">
            <select v-model="formCreate.team_status" require>
              <option value="ACTIVE">Ativo</option>
              <option value="INACTIVE">Inativo</option>
              <option value="ARCHIVED">Arquivado</option>
            </select>
          </FormGroup>

          <div style="margin-top: var(--spacing-rg); display: flex; gap: var(--spacing-sm)">
            <button type="submit" class="btn btn-primary">Criar Equipe</button>
            <button type="button" @click="toggleModal" class="btn btn-primary">Cancelar</button>
          </div>
        </form>
      </ModalPanel>

      <ModalPanel v-if="isModalEditOpen">
        <div class="modal-header">
            <h2>{{ formEdit.name }}</h2>
            <button class="close-btn" @click="toggleEditModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg>
            </button>
        </div>
        <!-- <nav>
            <ul>
                <li><button class="btn btn-secondary" @click="switchTabs('Edicao')" >Edição</button></li>
                <li><button class="btn btn-secondary" @click="switchTabs('Membros')">Membros</button></li>
            </ul>
        </nav> -->
        <hr>

        <!-- Edição -->
        <div v-if="activePage === 'Edicao'">
            <form @submit.prevent="handleUpdateForm">
              <FormGroup label-text="Nome:">
                  <input v-model="formEdit.name" type="text">
              </FormGroup>

              <FormGroup label-text="Descrição:">
                  <textarea v-model="formEdit.description"></textarea>
              </FormGroup>

              <FormGroup label-text="Status da equipe:">
                  <select v-model="formEdit.team_status">
                      <option value="ACTIVE">Ativo</option>
                      <option value="INACTIVE">Inativo</option>
                      <option value="ARCHIVED">Arquivado</option>
                  </select>
              </FormGroup>

              <FormGroup :no-label="true" class="form-buttons">
                  <button type="submit" class="btn btn-primary">Editar</button>
                  <button type="button" class="btn btn-danger" @click="handleDeleteForm" style="width:auto;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                    </svg>
                    Deletar
                  </button>
              </FormGroup>
          </form>
        </div>
        <!-- Membros -->
        <div v-if="activePage === 'Membros'">
          <div class="header">
            <input type="text" placeholder="Digite o nome de um membro...">
            <button type="button" class="btn btn-primary">Pesquisar</button>
          </div>

          <div>

          </div>
        </div>
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

.header {
  display: flex;
  flex-direction: row;
  margin: var(--spacing-sm) 0;
  gap: var(--spacing-sm);

  > *:first-child {
    flex: 1;
  }
}

input, textarea, select {
  padding: var(--spacing-sm);
  font-family: inherit;
}

.form-group button {
  padding: var(--spacing-sm);
  font-family: inherit;
}

ul {
    display: flex;
    flex-direction: row;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-sm);
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
  min-width: auto;
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

.modal-header {
    display: flex;
    flex-direction: row;
    margin-bottom: var(--spacing-rg);
    > * {
        flex: 1;
    }
}

.form-buttons {
  display: flex;
  flex-direction: row;
  > *:first-child {
    flex: 1;
  }
}

.close-btn {
    border: none;
    flex: 0;
    background-color: transparent;
    transform: scale(1.15);
    cursor: pointer;

    > svg {
        color: red;
    }
}

.btn-danger {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-sm);
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
