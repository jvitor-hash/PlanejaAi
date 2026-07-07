<script setup lang="ts"></script>

<template>
    <div class="modal-overlay">
        <div class="modal">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="css">
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10;
    }

    .modal {
        background: var(--bg-light);
        border: 1px solid var(--border-color);
        padding: var(--spacing-rg);
        border-radius: 8px;
        box-shadow: 0 0 8px 8px rgb(0 0 0 / 0.2);
        width: 550px;
    }
</style>