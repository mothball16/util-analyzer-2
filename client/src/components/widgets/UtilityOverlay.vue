<script setup>
import { gameToAppAxis } from '../../util/conversion';
import { ref } from 'vue';
import { useMatchStore } from '../../stores/useMatchStore';
import { storeToRefs } from 'pinia';
import UtilityDot from '../base/UtilityDot.vue';

const store = useMatchStore();
const { mapInfo, filteredMatchNades } = storeToRefs(store);
</script>

<template>
<div class="container">
  <div    
    v-for="(nade, id) in filteredMatchNades"
    :key="id">
    <UtilityDot
      :size="2"
      :x="gameToAppAxis(mapInfo.name, nade.detonated.pos.x, 'x')"
      :y="gameToAppAxis(mapInfo.name, nade.detonated.pos.y, 'y')"
    />
    <UtilityDot
      :size="1"
      :x="gameToAppAxis(mapInfo.name, nade.thrown.pos.x, 'x')"
      :y="gameToAppAxis(mapInfo.name, nade.thrown.pos.y, 'y')"
    />
  </div>


</div>
</template>

<style scoped>
.container {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>