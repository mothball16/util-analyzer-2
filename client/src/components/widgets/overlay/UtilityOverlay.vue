<script setup>
import { ref } from 'vue';
import { useMatchStore } from '../../../stores/useMatchStore';
import { storeToRefs } from 'pinia';
import UtilityLineup from './UtilityLineup.vue';

const store = useMatchStore();
const { filteredMatchNades } = storeToRefs(store);
</script>

<template>
<div class="container">
  <UtilityLineup    
    v-for="(nade, id) in filteredMatchNades"
    :key="id"
    :nade="nade"
    :id="id"
   />
</div>
</template>

<style scoped>

</style>