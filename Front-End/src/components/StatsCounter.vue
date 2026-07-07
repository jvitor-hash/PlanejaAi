<script setup lang="ts">
    import Card from '@/components/card.vue'

    const props = defineProps({
        statName: {
            type: String,
            required: true,
            default: '#Stat Name'
        },
        statCount: {
            type: Number,
            required: true,
            default: 0
        }
    })
</script>

<template>
    <Card class="card" :shadow="false">
        <div class="card-accent"></div>
        <div class="card-content">
            <h2>{{ props.statName }}</h2>
            <p class="stat-count">{{ props.statCount }}</p>
        </div>
    </Card>
</template>

<style scoped>
    .card {
        position: relative;
        background-color: var(--bg-light);
        padding: 10px 28px;
        min-height: 128px;
        width: 100%;

        .card-accent {
            position: absolute;
            background-color: var(--accent-color);
            height: 100%;
            width: 28px;
            top: 0;
            left: 0;
        }

        .stat-count {
            font-size: 3rem;
            font-family: 'Share Tech Mono', Arial;
            margin-left: var(--spacing-xs);
        }

        .card-content {
            margin-left: var(--spacing-md);
            h2 {
                margin-bottom: var(--spacing-sm);
                text-wrap: nowrap;
            }
        }
    }
</style>