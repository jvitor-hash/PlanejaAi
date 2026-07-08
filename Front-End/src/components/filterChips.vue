<script setup lang="ts">
const props = defineProps({
  chips: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:modelValue'])

function toggleChip(chip) {
  const selected = [...props.modelValue]

  const index = selected.indexOf(chip)

  if (index > -1) {
    selected.splice(index, 1)
  } else {
    selected.push(chip)
  }

  emit('update:modelValue', selected)
}
</script>

<template>
  <div class="chip-container">
    <div
      v-for="chip in chips"
      :key="chip"
      class="chip"
      :class="{ selected: modelValue.includes(chip) }"
      @click="toggleChip(chip)"
    >
      {{ chip }}
    </div>
  </div>
</template>

<style scoped lang="css">
.chip-container {
  display: flex;
  gap: var(--spacing-sm);
  
}

.chip {
  display: inline-block;
  background-color: var(--bg-dark);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: 3em;
  cursor: pointer;
  user-select: none;
}

.selected {
  background-color: var(--accent-color);
  color: #fff;
}
</style>
