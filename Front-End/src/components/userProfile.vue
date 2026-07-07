<script setup lang="ts">
import defaultProfileImage from '@/assets/images/userProfile.png'

const props = defineProps({
  profileImagePath: {
    type: String,
    default: defaultProfileImage
  }
})
</script>

<template>
    <img :src="props.profileImagePath">
</template>

<style scoped lang="css">
    img {
        border-radius: 50%;
        width: 48px;
        height: 48px;
        aspect-ratio: 1 / 1;
    }
</style>