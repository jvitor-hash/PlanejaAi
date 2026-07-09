<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  modelValue: Boolean,
  style: {
    type: Object,
    default: () => ({
      top: "80px",
      left: "50%",
      transform: "translateX(-50%)",
    }),
  },
  closeOnOutside: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const popover = ref(null);

function onClickOutside(event) {
  if (
    props.closeOnOutside &&
    popover.value &&
    !popover.value.contains(event.target)
  ) {
    emit("update:modelValue", false);
  }
}

onMounted(() => {
  document.addEventListener("mousedown", onClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("mousedown", onClickOutside);
});
</script>

<template>
  <Teleport to="body">
    <Transition name="popover">
      <div v-if="modelValue" ref="popover" class="popover" :style="style">
        <slot></slot>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.popover {
  position: fixed;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  padding: 12px;
  z-index: 1000;
}

.popover-enter-active,
.popover-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.popover-enter-from,
.popover-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>