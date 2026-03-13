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
        <!-- note to self - template is inert and not actually treated as a wrapper when rendered -->
        <!-- this is useful for stuff like vue conditionals where i dont want to disrupt the hierarchy -->
        <template v-if="!errored && mapInfo.name">
            <img 
                class="map-img"
                :src="`/maps/${mapInfo.name}.webp`" 
                :alt="mapInfo.name"
                @error="errored = true"
            />
            <slot name="overlay" class="map-img"></slot>
        </template>
        <div v-else class="error-msg">
            <p>Map not found: {{ mapInfo.name || 'unknown' }}</p>
        </div>
    </div>
</template>


<style scoped> 
.container {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.map-img {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>