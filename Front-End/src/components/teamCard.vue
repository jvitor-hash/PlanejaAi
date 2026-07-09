<script setup lang="ts">
import Card from './card.vue';
import ModalPanel from '@/components/modalPanel.vue'
import FormGroup from '@/components/formGroup.vue'
import { ref, reactive, computed } from 'vue';
import { updateTeam } from '@/composable/services/useTeamService';
import { useTeamStore } from '@/stores/teamStore';

const isModalOpen = ref(false)
const activePage = ref('Edicao')

const props = defineProps({
    team: {
        type: Object,
        required: true
    }
})

const form = reactive({
    id: '',
    name: '',
    description: '',
    team_status: 'ACTIVE'
})

function formatTeamStatus(itemTeamStatus: String) {
    if( itemTeamStatus === 'ACTIVE' )
        return 'Ativo';
    else if ( itemTeamStatus === 'INACTIVE' )
        return 'Inativo';
    else if ( itemTeamStatus === 'ARCHIVED' )
        return 'Arquivado';
} 

const highlightClass = computed(() => props.team.team_status)

async function handleForm() {
    const { data, error, loading } = await updateTeam(form.id, form);

    if (data)
        
        toggleModal();
}

function toggleModal() {
    isModalOpen.value = !isModalOpen.value

    form.name = props.team.name;
    form.description = props.team.description;
    form.team_status = props.team.team_status;
}
</script>

<template>
    <Card>
        <div class="info">
            <h2>{{ props.team.name }}</h2>
            <p>{{props.team.description}}</p>
            <p :class="highlightClass">{{ formatTeamStatus(props.team.team_status) }}</p>
        </div>

        <button class="settings" @click="toggleModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
            </svg>
        </button>
    </Card>

    <ModalPanel v-if="isModalOpen">
        <div class="modal-header">
            <h2>{{ props.team.name }}</h2>
            <button class="close-btn" @click="toggleModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg>
            </button>
        </div>
        <nav>
            <ul>
                <li>
                    <button class="btn btn-secondary">Edição</button>
                </li>
                <li>
                    <button class="btn btn-secondary">Membros</button>
                </li>
            </ul>
        </nav>
        <hr>
        <form @submit.prevent="handleForm">
            <FormGroup label-text="Nome:">
                <input v-model="form.name" type="text">
            </FormGroup>

            <FormGroup label-text="Descrição:">
                <textarea v-model="form.description"></textarea>
            </FormGroup>

            <FormGroup label-text="Status da equipe:">
                <select v-model="form.team_status">
                    <option value="ACTIVE">Ativo</option>
                    <option value="INACTIVE">Inativo</option>
                    <option value="ARCHIVED">Arquivado</option>
                </select>
            </FormGroup>

            <FormGroup :no-label="true">
                <button class="btn btn-primary" style="width:auto;">Editar</button>
            </FormGroup>
        </form>
    </ModalPanel>
</template>

<style scoped lang="css">
.settings {
    border: none;
    background: transparent;
    position: absolute;
    cursor: pointer;
    top: 15px;
    right: 15px;
}

.form-group input, .form-group select, .form-group textarea, .form-group button {
  font-family: inherit;
  padding: var(--spacing-sm);
}

ul {
    display: flex;
    flex-direction: row;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-sm);
}

.ACTIVE {
    color: var(--priority-med);
}

.ACTIVE::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--priority-med);
    border-radius: 3em;
    z-index: 0;
}

.INACTIVE {
    color: var(--priority-high);
}

.ARCHIVED {
    color: var(--priority-low);
}

.modal-header {
    display: flex;
    flex-direction: row;
    margin-bottom: var(--spacing-rg);
    > * {
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
</style>