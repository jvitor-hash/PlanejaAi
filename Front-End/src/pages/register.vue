<script setup lang="ts">
import FormGroup from '@/components/formGroup.vue'
import Header from '@/layout/Header.vue'
import Sidebar from '@/layout/Sidebar.vue'
import Card from '@/components/card.vue'
import { reactive } from 'vue'
import { createUser } from '@/composable/services/useUserService';
import router from '@/router'

const form = reactive({
  name: '',
  email: '',
  password: '',
})

const submitForm = async () => {
  const { data, error, loading } = await createUser(form);

  if (data)
    router.push('/login');
}
</script>

<template>
  <div class="page-wrapper">
    <header>
      <Header />
    </header>

    <aside>
      <Sidebar />
    </aside>

    <main>
      <Card class="login-card">
        <h1>Registrar-se</h1>
        <form @submit.prevent="submitForm">
          <FormGroup label-text="Nome:">
            <input v-model="form.name" type="text" placeholder="Nome" required />
          </FormGroup>

          <FormGroup label-text="E-mail:">
            <input v-model="form.email" type="email" placeholder="E-mail" required />
          </FormGroup>

          <FormGroup label-text="Senha:">
            <input v-model="form.password" type="password" placeholder="Senha" required />
          </FormGroup>

          <FormGroup :no-label="true">
            <button class="submit-button" type="submit">Registrar-se</button>
          </FormGroup>

          <p>Ja tem uma conta? <RouterLink to="/login">Login</RouterLink></p>
        </form>
      </Card>
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

.page-wrapper a {
  color: var(--accent-color);
}

.page-wrapper main {
  grid-area: c;
  padding: var(--spacing-sm);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  justify-content: center;
  align-items: center;

  overflow-y: auto;
  overflow-x: auto;

  h1 {
    color: var(--accent-color);
    text-align: center;
  }
}

.form-group input {
  padding: var(--spacing-sm) var(--spacing-sm);
  outline-color: var(--accent-color);
}

.page-wrapper .submit-button {
  display: block;
  cursor: pointer;
  color: #fff;
  background-color: var(--accent-color);
  border: 1px solid var(--accent-color);
  border-radius: 6px;
  padding: var(--spacing-rg) var(--spacing-sm);
  font-size: 1rem;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
  &:hover {
    background-color: transparent;
    color: var(--accent-color);
  }
}

.page-wrapper .login-card {
  min-width: 600px;
  padding: var(--spacing-xl);
  height: fit-content;
}

.page-wrapper .login-card p {
  margin-block-start: var(--spacing-sm);
  text-align: center;
}

:root[data-theme='dark'] {
  .page-wrapper main {
    h1 {
      color: constrast-color(var(--accent-color));
    }
  }

  .page-wrapper a {
    color: #fff;
  }
}
</style>
