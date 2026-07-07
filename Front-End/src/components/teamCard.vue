<script setup lang="ts">
import Card from './card.vue';
import { computed } from 'vue';

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
</script>

<template>
    <Card>
        <div class="info">
            <h2>{{ props.itemTeamName }}</h2>
            <p>{{props.itemTeamDescription}}</p>
            <p :class="highlightClass">{{ formatTeamStatus(props.itemTeamStatus) }}</p>
        </div>
    </Card>
</template>

<style scoped lang="css">


.ACTIVE {
    color: var(--priority-med);
}

.INACTIVE {
    color: var(--priority-high);
}

.ARCHIVED {
    color: var(--priority-low);
}
</style>