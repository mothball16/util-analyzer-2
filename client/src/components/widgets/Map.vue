<script setup>
import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useMatchStore } from '../../stores/useMatchStore';

const store = useMatchStore();
const { mapInfo } = storeToRefs(store);

const errored = ref(false);

// when the map info is updated, this allows the map to re-attempt display
watch(mapInfo, () => {
    errored.value = false;
});

</script>

<template>
    <div class="container">
        <img 
            v-if="!errored && mapInfo.name"
            class="map-img"
            :src="`/maps/${mapInfo.name}.webp`" 
            :alt="mapInfo.name"
            @error="errored = true"
        />
        <div v-else class="error-msg">
            <p>Map not found: {{ mapInfo.name || 'unknown' }}</p>
        </div>
    </div>
</template>


<style scoped> 
.container {
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.map-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>