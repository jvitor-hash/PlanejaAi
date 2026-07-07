<script setup lang="ts">
const props = defineProps({
    labelText: {
        type: String,
        require: true,
        default: 'Label'
    },
    noLabel: {
        type: Boolean,
        required: false,
        default: false
    }
})
</script>

<template>
    <div class="form-group">
        <label for="item" :class="props.noLabel ? 'no-label' : ''">{{ props.labelText }}</label>
        <slot id="item"></slot>
    </div>
</template>

<style scoped lang="css">
    .form-group {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xs);
        margin-block-start: var(--spacing-sm);
    }

    .form-group label.no-label {
        display: none;
    }

    .form-group:has(input[required]) label::after {
        content: " *";
        color: red;
    }

    .form-group:has(select[required]) label::after {
        content: " *";
        color: red;
    }

    .form-group:has(textarea[required]) label::after {
        content: " *";
        color: red;
    }
</style>