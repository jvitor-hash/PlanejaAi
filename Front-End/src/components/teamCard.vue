<script setup lang="ts">
import Card from './card.vue';
import ModalPanel from '@/components/modalPanel.vue'
import FormGroup from '@/components/formGroup.vue'
import { ref, computed } from 'vue';
import { useTeamStore } from '@/stores/teamStore';

const isModalOpen = ref(false)


const props = defineProps({
    team: {
        type: Object,
        required: true
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

const highlightClass = computed(() => props.team.team_status)

const emit = defineEmits<{
  (e: 'settings-click', payload?: any): void
}>()

function onSettingsClick() {
  emit('settings-click', {
    team: props.team
  })
}
</script>

<template>
    <Card>
        <div class="info">
            <h2>{{ props.team.name }}</h2>
            <p>{{props.team.description}}</p>
            <p :class="highlightClass">{{ formatTeamStatus(props.team.team_status) }}</p>
        </div>

        <button class="settings" @click="onSettingsClick">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
            </svg>
        </button>
    </Card>
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

.ACTIVE {
  position: relative;
  color: hsl(from var(--priority-med) h s 40%);
  z-index: 1;
  user-select: none;
}

.ACTIVE::before {
  content: "";
  position: absolute;
  inset: 50% auto auto calc(5% - 2px);
  translate: -50% -50%;

  width: 5ch;
  padding: calc(var(--spacing-sm) + 2px) var(--spacing-xs);

  background: var(--priority-med);
  border-radius: 3em;
  opacity: .5;
  z-index: -1;
}

.INACTIVE {
  position: relative;
  color: hsl(from var(--priority-high) h s 40%);
  z-index: 1;
  user-select: none;
}

.INACTIVE::before {
  content: "";
  position: absolute;
  inset: 50% auto auto 6%;
  translate: -50% -50%;

  width: 7ch;
  padding: calc(var(--spacing-sm) + 2px) var(--spacing-xs);

  background: var(--priority-high);
  border-radius: 3em;
  opacity: .5;
  z-index: -1;
}

.ARCHIVED {
  position: relative;
  color: hsl(from var(--priority-low) h s 40%);
  z-index: 1;
  user-select: none;
}

.ARCHIVED::before {
  content: "";
  position: absolute;
  inset: 50% auto auto calc(10% - 3px);
  translate: -50% -50%;

  width: 9ch;
  padding: calc(var(--spacing-sm) + 2px) var(--spacing-xs);

  background: var(--priority-low);
  border-radius: 3em;
  opacity: .5;
  z-index: -1;
}
</style>