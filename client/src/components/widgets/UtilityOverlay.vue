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
.plot-point {
  position: absolute;
  width: 2rem;
  height: 2rem;
  background: rgb(250, 192, 67);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 50%;
}
</style>