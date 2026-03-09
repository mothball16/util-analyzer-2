<script setup>
import { gameToAppAxis } from '../../util/plot';
import { ref } from 'vue';
import { useMatchStore } from '../../stores/useMatchStore';
import { storeToRefs } from 'pinia';

const store = useMatchStore();
const { filteredMatchNades } = storeToRefs(store);


</script>

<template>

</template>

<style scoped>

</style>