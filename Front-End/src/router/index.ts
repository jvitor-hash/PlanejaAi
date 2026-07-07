import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/home.vue')
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import('@/pages/tasks.vue')
    },
    {
      path: '/teams',
      name: 'teams',
      component: () => import('@/pages/teams.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/pages/register.vue')
    },
    {
      path: '/communication',
      name: 'communication',
      component: () => import('@/pages/communication.vue')
    }
  ],
})

export default router
