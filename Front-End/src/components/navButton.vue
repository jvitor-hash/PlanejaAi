<script setup lang="ts">
    import ToolTip from './toolTip.vue';
    import { ref } from 'vue'

    interface Props {
        tooltipEnabled: Boolean,
        tooltipText: String,
        tooltipDirection: String,
        routeTo: String
    }

    const isHovered = ref(false);

    const props = defineProps<Props>();

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
        <button class="nav-button" @mouseenter="mouseenter" @mouseleave="mouseleave">
            <RouterLink :to="props.routeTo">
                <slot></slot>
            </RouterLink>
        </button>

        <ToolTip :direction="props.tooltipDirection" :active="isHovered">{{ props.tooltipText }}</ToolTip>
    </span>
</template>

<style scoped lang="css">
    .button-wrapper {
        position: relative;

        .nav-button {
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