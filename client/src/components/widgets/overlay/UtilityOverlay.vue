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
    v-for="(nade, index) in filteredMatchNades"
    :key="nade.meta.uniqueId"
    :id="nade.meta.uniqueId"
    :nade="nade"
   />
</div>
</template>

<style scoped>

</style>