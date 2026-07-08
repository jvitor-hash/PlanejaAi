<script setup lang="ts">
import Card from './card.vue';
import ModalPanel from '@/components/modalPanel.vue'
import { ref, reactive, computed } from 'vue';

const isModalOpen = ref(false)

const props = defineProps({
    itemId: {
        type: Number,
        required: true,
        default: 0
    },
    itemTeamName: {
        type: String,
        required: true,
        default: '#Team Name'
    },
    itemTeamDescription: {
        type: String,
        required: true,
        default: '#Team description'
    },
    itemTeamStatus: {
        type: String,
        required: true,
        default: '#Team Status'
    }
})

function formatTeamStatus(itemTeamStatus: String) {
    if( itemTeamStatus === 'ACTIVE' )
        return 'Ativo';
    else if ( itemTeamStatus === 'INACTIVE' )
        return 'Inativo';
    else if ( itemTeamStatus === 'ARCHIVED' )
        return 'Arquivado';
} 

const highlightClass = computed(() => props.itemTeamStatus)

function handleForm() {

}

function toggleModal() {
    isModalOpen.value = !isModalOpen.value
}
</script>

<template>
    <Card>
        <div class="info">
            <h2>{{ props.itemTeamName }}</h2>
            <p>{{props.itemTeamDescription}}</p>
            <p :class="highlightClass">{{ formatTeamStatus(props.itemTeamStatus) }}</p>
        </div>

        <button class="settings" @click="toggleModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
            </svg>
        </button>
    </Card>

    <ModalPanel v-if="isModalOpen">
        <div class="modal-header">
            <h2>{{ props.itemTeamName }}</h2>
            <button class="close-btn" @click="toggleModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-octagon" viewBox="0 0 16 16">
                    <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
            </button>
        </div>
        
        <div>

        </div>
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

.ACTIVE {
    color: var(--priority-med);
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
}
</style>