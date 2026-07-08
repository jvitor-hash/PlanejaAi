<script setup lang="ts">
import { RouterView } from 'vue-router';
import '@/assets/main.css';
import { useTeamStore } from '@/stores/teamStore';

const store = useTeamStore();
// await store.initStore();

</script>

<template>
  <RouterView></RouterView>
</template>