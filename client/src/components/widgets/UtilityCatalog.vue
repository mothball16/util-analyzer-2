<script setup>
import { watch } from 'vue';
import { useMatchStore } from '../../stores/useMatchStore';
import { storeToRefs } from 'pinia';
import Card from '../base/Card.vue';
import { UTILITY_DATA, COLORS } from '../../constants';
import { lerpHex } from '../../util/lerp-hex';


const store = useMatchStore();
const { filteredMatchNades } = storeToRefs(store);

watch(filteredMatchNades, () => {
    console.log(filteredMatchNades.value);
});

const getAccent = (score) => {
    return lerpHex(COLORS.NEG_CONNOTATION, COLORS.POS_CONNOTATION, score);
}

</script>


<template>
    <div class="container scrollable">
        <Card 
            v-for="(nade, index) in filteredMatchNades"
            :key="`${nade.owner}-${nade.tickThrown}-${index}`"
            :title="UTILITY_DATA[nade.type]?.label || nade.type"
            :accent="getAccent(nade.score)"
        >
        </Card>
    </div>

</template>

<style scoped>
.container {
    display: flex;
    flex-flow: column nowrap;
    gap: 0.5rem;
}
</style>