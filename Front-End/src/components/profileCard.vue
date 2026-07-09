<script setup lang="ts">
import Card from './card.vue'
import UserProfile from './userProfile.vue'
import { computed } from 'vue';

const props = defineProps({
  profile: {
    type: Object,
    required: true
  }
})

function formatStatus(profileStatus) {
  if (profileStatus === 'ACTIVE')
    return 'Ativo';
  else if (profileStatus === 'INACTIVE') 
    return 'Inativo';
  else if (profileStatus === 'VACATION')
    return 'Férias';
}

const highlightClass = computed(() => props.profile.status)
</script>

<template>
  <Card class="wrapper">
    <div>
      <UserProfile />
    </div>

    <div class="info">
      <h2>{{ props.profile.name }}</h2>
      <p class="text-muted"><small>{{ props.profile.role || "Sem Cargo" }}</small></p>
      <p :class="highlightClass">{{ formatStatus(props.profile.status) }}</p>
      <!-- <button class="btn-add">+</button> -->
    </div>
  </Card>
</template>

<style scoped lang="css">
.wrapper {
  display: flex;
  gap: var(--spacing-sm);
  max-height: 125px;
  align-items: center;
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
  inset: 50% auto auto 26%;
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
  inset: 50% auto auto 36%;
  translate: -50% -50%;

  width: 7ch;
  padding: calc(var(--spacing-sm) + 2px) var(--spacing-xs);

  background: var(--priority-high);
  border-radius: 3em;
  opacity: .5;
  z-index: -1;
}

.VACATION {
  position: relative;
  color: hsl(from var(--priority-low) h s 40%);
  z-index: 1;
  user-select: none;
}

.VACATION::before {
  content: "";
  position: absolute;
  inset: 50% auto auto 32%;
  translate: -50% -50%;

  width: 6ch;
  padding: calc(var(--spacing-sm) + 2px) var(--spacing-xs);

  background: var(--priority-low);
  border-radius: 3em;
  opacity: .5;
  z-index: -1;
}

.btn-add {
  padding: var(--spacing-xs);
  border: none;
  background: transparent;
  position: absolute;
  font-size: 1.25rem;
  cursor: pointer;
  top: 10px;
  right: 10px;
}
</style>
