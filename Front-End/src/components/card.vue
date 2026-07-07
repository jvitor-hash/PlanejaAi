<script setup lang="ts">
    const props = defineProps({
        shadow: {
            type: Boolean,
            required: false,
            default: true
        }
    })
</script>

<template>
    <div :class="props.shadow ? '' : 'no-shadow'">
        <slot></slot>
    </div>
</template>

<style scoped>
    div {
        position: relative;
        background-color: var(--bg);
        border: 1px solid var(--border-color);
        box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.2);
        border-radius: 8px;
        overflow: hidden;
        padding: 20px;

        min-width: fit-content;
        min-height: fit-content;
    }

    div.no-shadow {
        box-shadow: none;
    }
</style>