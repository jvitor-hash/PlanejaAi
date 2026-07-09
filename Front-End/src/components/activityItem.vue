<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getUserById } from '@/composable/services/useUserService';

const user = ref();

const props = defineProps({
    ticket: {
        type: Object,
        required: true
    }
});

function formatDate(date) {
  const d = new Date(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatType(type) {
    if (type === 'CREATED')
        return 'Criação'
    else if (type === 'STATUS_CHANGED')
        return 'Atualização'
    else if (type === 'PRIORITY_CHANGED')
        return 'Mudança de prioridade'
    else if (type === 'ASSIGNED')
        return 'Atribuído'
    else if (type === 'UNASSIGNED')
        return 'Não atribuído'
    else if (type === 'COMMENT_ADDED')
        return 'Comentário adicionado'
}

async function getUser(user_id : Number) {
    const { data, error, loading } = await getUserById(user_id);

    if (data)
        user.value = data.value
}

onMounted(async () => {
    await getUser(props.ticket.user_id)
})
</script>

<template>
  <div class="item">
    <div class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-activity" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2"/>
        </svg>
    </div>
    <div class="info">
        <p class="muted"><small>{{ formatDate(props.ticket.createdAt) }}</small></p>
        <p class="muted"><small>{{ props.ticket.name }}</small></p>
        <p class="action"><span>{{ user?.name }}</span> {{ props.ticket.action }}</p>
        <p class="muted"><small>{{ formatType(props.ticket.type) }}</small></p>
    </div>
    <div></div>
  </div>
</template>

<style scoped lang="css">
    .item {
        display: flex;
        gap: var(--spacing-sm);
        margin-left: var(--spacing-sm);
    }

    .action, .muted {
        margin-left: var(--spacing-rg);
    }

    .info {
        display: grid;
        gap: var(--spacing-xs);
    }

    .icon {
        display: grid;
        place-items: center;
        position: relative;
        > svg {
            z-index: 1;
            transform: scale(1.35);
            color: #fff;
        }
    }

    .icon::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        border-radius: 50%;
        width: 48px;
        height: 48px;
        background-color: rgb(from var(--secondary-color) r g b / 0.8);
    }

    .muted {
        opacity: 0.5;
    }

    .action span {
        /* text-decoration: underline; */
        color: var(--secondary-color);
    }
</style>