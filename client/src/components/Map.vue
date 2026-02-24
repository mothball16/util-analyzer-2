<script setup>
import { computed, ref } from 'vue';
const props = defineProps({
    matchHeader: {
    type: Object,
    required: true
}});

const mapName = computed(() => props.matchHeader?.map_name);
const errored = ref(false);

</script>

<template>
    <div class="container">
        <img 
            v-if="!errored && mapName"
            class="map-img"
            :src="`/maps/${mapName}.webp`" 
            :alt="mapName"
            @error="errored = true"
        />
        <div v-else class="error-msg">
            <p>Map not found: {{ mapName || 'unknown' }}</p>
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