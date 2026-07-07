<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  direction: {
    type: String,
    required: false,
    default: 'top-left',
  },
})

const classes = computed(() => [props.direction])
const emit = defineEmits(['click']);

function handleClick(event) { emit('click', event) }
</script>

<template>
  <button :class="classes" @click="handleClick">
    <slot></slot>
  </button>
</template>

<style scoped lang="css">
button {
  position: fixed;
  background: #101010;
  color: #fff;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  width: fit-content;
  border-radius: 8px;
  font-size: 20px;
  z-index: 8;
  box-shadow: 3px 3px 8px rgb(0 0 0 / 0.2);
}

:root[data-theme="dark"] {
    background-color: #fff;
    color: #000;
}

button.top-left {
    top: 10px;
    left: 10px;
}
button.top-right {
    top: 10px;
    right: 10px;
}
button.bottom-left {
    bottom: 10px;
    left: 10px;
}
button.bottom-right {
    bottom: 10px;
    right: 10px;
}
</style>
