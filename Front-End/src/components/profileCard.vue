<script setup lang="ts">
import Card from './card.vue'
import UserProfile from './userProfile.vue'
import { computed } from 'vue';

const props = defineProps({
  profileName: {
    type: String,
    required: true,
    default: 'Profile Name',
  },
  profileRole: {
    type: String,
    required: true,
    default: 'Profile Role',
  },
  profileStatus: {
    type: String,
    required: true,
    default: 'Active',
  },
})

function formatStatus(profileStatus) {
  if (profileStatus === 'ACTIVE')
    return 'Ativo';
  else if (profileStatus === 'INACTIVE') 
    return 'Inativo';
  else if (profileStatus === 'VACATION')
    return 'Férias';
}

const highlightClass = computed(() => props.profileStatus)
</script>

<template>
  <Card class="wrapper">
    <div>
      <UserProfile />
    </div>

    <div class="info">
      <h2>{{ props.profileName }}</h2>
      <h3>{{ props.profileRole }}</h3>
      <p :class="highlightClass">{{ formatStatus(props.profileStatus) }}</p>
    </div>

    <!-- <button class="settings">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-three-dots-vertical"
        viewBox="0 0 16 16"
      >
        <path
          d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
        />
      </svg></button
    > -->
  </Card>
</template>

<style scoped lang="css">
.wrapper {
  display: flex;
  gap: var(--spacing-sm);
  max-height: 125px;
  align-items: center;
}

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

.VACATION {
    color: var(--priority-low);
}
</style>
