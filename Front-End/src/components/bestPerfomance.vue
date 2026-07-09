<script setup lang="ts">
import UserProfile from './userProfile.vue';

const prop = defineProps({
    User: {
        type: Object,
        required: true
    }
})

</script>

<template>
    <div>
        <UserProfile />
    </div>
</template>

<style scoped lang="css">

</style>