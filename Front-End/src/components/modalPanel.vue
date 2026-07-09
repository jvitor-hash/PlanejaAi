<script setup lang="ts"></script>

<template>
    <transition name="modal">
        <div class="modal-overlay">
            <div class="modal">
                <slot></slot>
            </div>
        </div>
    </transition>
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
        width: 575px;
    }

    .modal-enter-active,
    .modal-leave-active {
        transition: opacity 0.25s ease;
    }

    .modal-enter-active .modal,
    .modal-leave-active .modal {
        transition: transform 0.3s ease, opacity 0.3s ease;
    }

    .modal-enter-from {
        opacity: 0;
    }

    .modal-leave-to {
        opacity: 0;
    }

    .modal-enter-from .modal {
        transform: translateY(40px);
        opacity: 0;
    }

    .modal-leave-to .modal {
        transform: translateY(40px);
        opacity: 0;
    }
</style>