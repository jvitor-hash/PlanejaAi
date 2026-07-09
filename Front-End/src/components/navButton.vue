<script setup lang="ts">
    import ToolTip from './toolTip.vue';
    import { ref } from 'vue'

    const isHovered = ref(false);

    const props = defineProps({
        tooltipEnabled: {
            type: Boolean,
            required: true
        },
        tooltipText: {
            type: String,
            required: true
        },
        tooltipDirection: {
            type: String,
            required: true
        },
        routeTo: {
            type: String,
            required: true
        }
    });

    function mouseenter() {
        if (props.tooltipEnabled)
            isHovered.value = true
    }

    function mouseleave() {
        if (props.tooltipEnabled)
            isHovered.value = false
    }
</script>

<template>
    <span class="button-wrapper">
        <RouterLink :to="props.routeTo" @mouseenter="mouseenter" @mouseleave="mouseleave">
            <slot></slot>
        </RouterLink>

        <ToolTip :direction="props.tooltipDirection" :active="isHovered">{{ props.tooltipText }}</ToolTip>
    </span>
</template>

<style scoped lang="css">
    .button-wrapper {
        position: relative;

        a {
            padding: var(--spacing-sm);
            border-radius: 4px;
            background-color: var(--bg);
            border: none;
            min-width: 24px;
            min-height: 24px;
            cursor: pointer;

            display: flex;
            justify-content: center;
            align-items: center;

            height: 30px;
            width: 30px;

            max-width: 38px;
            max-height: 38px;
        }
    }
</style>