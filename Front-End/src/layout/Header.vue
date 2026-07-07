<script setup lang="ts">
import UserProfile from '@/components/userProfile.vue';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const router = useRouter();
const nameStore = ref('');

function handleLoginClick() {
    router.push('/login');
}

function handleRegisterClick() {
    router.push('/register');
}

async function handleLogout() {
    const response = await fetch('http://localhost:3000/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    })

    if (!response.ok) {
        throw new Error('Unable to log-out');
    }

    localStorage.setItem('name', '');

    router.push('/login');
}

onMounted(() => {
    nameStore.value = localStorage.getItem('name');
})

</script>

<template>
    <div class="header-wrapper">
        <div class="title">
            <h1>PlanejaAí</h1>
        </div>

        <div>
            <div v-if="nameStore" class="signup">
                <UserProfile/>
                <p>{{ nameStore }}</p>
                <button @click="handleLogout">Log-out</button>
            </div>
            <div v-else class="signup">
                <button @click="handleLoginClick">Entrar</button>
                <button @click="handleRegisterClick">Registrar-se</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .header-wrapper {
        margin: 5px;
        padding: 10px;

        border: 1px solid var(--border-color);
        background-color: var(--bg-light);
        border-radius: 8px;
        box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.2);
        min-width: fit-content;
        
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }

    .header-wrapper .signup {
        display: flex;
        justify-content: end;
        align-items: center;
        gap: 10px;
        padding-right: 5px;

        button {
            background-color: var(--accent-color);
            border: 1px solid var(--accent-color);
            color: white;
            padding-left: var(--spacing-rg);
            padding-right: var(--spacing-rg);
            padding-top: var(--spacing-sm);
            padding-bottom: var(--spacing-sm);
            border-radius: 6px;
            cursor: pointer;
            text-wrap: nowrap;

            transition: background-color 0.3s ease, color 0.3s ease;
            
            &:hover {
                background-color: transparent;
                color: var(--accent-color);
            }
        }
    }

    .header-wrapper .title {
        padding-left: 5px;
        display: flex;
        justify-content: start;
        align-items: center;
    }
</style>