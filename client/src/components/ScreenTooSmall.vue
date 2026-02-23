<!-- first non tutorial vue component  :o -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
    const props = defineProps({
        limit: {
            type: Number,
            required: true,
        }
    });

    const isTooSmall = ref(false);
    const checkSize = () => {        
        isTooSmall.value = window.innerWidth < props.limit;
    }

    onMounted(() => {
        checkSize();
        window.addEventListener('resize', checkSize);
    });

    onUnmounted(() => {
        window.removeEventListener('resize', checkSize);
    });
</script>

<template>
  <div v-if="isTooSmall">
    <h2>Screen is too small to display this site properly!</h2>
    <h2>Please use a screen with a width above {{props.limit}}px.</h2>
</div>
</template>

<style scoped>

</style>
