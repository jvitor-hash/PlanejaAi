11
<script setup lang="ts">
import { computed } from 'vue'

enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

const props = defineProps({
  direction: {
    type: String,
    required: true,
    default: Direction.UP,
  },
  active: {
    type: Boolean,
    required: true,
    default: false,
  },
})

const classes = computed(() => ['tooltip-text', props.direction, props.active ? 'active' : ''])
</script>

<template>
  <span :class="classes">
    <slot></slot>
  </span>
</template>

<style scoped lang="css">
.tooltip-text.UP,
.tooltip-text.DOWN,
.tooltip-text.LEFT,
.tooltip-text.RIGHT {
  position: absolute;
  pointer-events: none;
  visibility: visible;
  width: 140px;
  background-color: var(--bg-light);
  color: var(--text-color);
  text-align: center;
  padding: 5px;
  border-radius: 6px;
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.1);

  opacity: 0;
}

:root[data-theme='dark'] {
  .tooltip-text.UP,
  .tooltip-text.DOWN,
  .tooltip-text.LEFT,
  .tooltip-text.RIGHT {
    background-color: var(--bg-dark);
  }
}

.tooltip-text.active.UP,
.tooltip-text.active.DOWN,
.tooltip-text.active.LEFT,
.tooltip-text.active.RIGHT {
  opacity: 1;
}

.tooltip-text.active.UP {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 8px;
  visibility: visible;
}

.tooltip-text.active.DOWN {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 8px;
  visibility: visible;
}

.tooltip-text.active.LEFT {
  top: 50%;
  right: 100%;
  transform: translateY(-50%);
  margin-right: 8px;
}

.tooltip-text.active.RIGHT {
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  margin-left: 8px;
  visibility: visible;
}
</style>
