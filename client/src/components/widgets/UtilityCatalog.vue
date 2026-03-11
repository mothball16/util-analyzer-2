<script setup>
import { watch } from 'vue';
import { useMatchStore } from '../../stores/useMatchStore';
import { storeToRefs } from 'pinia';
import Card from '../base/Card.vue';
import { UTILITY_DATA, COLORS } from '../../constants';
import { lerpHex } from '../../util/lerp-hex';


const store = useMatchStore();
const { filteredMatchNades, selectedGrenadeId } = storeToRefs(store);

watch(filteredMatchNades, () => {
    console.log(filteredMatchNades.value);
});

const setSelectedGrenadeId = (id) => {
    selectedGrenadeId.value = id;
}

const isSelectedGrenade = (id) =>
    selectedGrenadeId.value === id;


const getAccent = (score) => {
    return lerpHex(COLORS.NEG_CONNOTATION, COLORS.POS_CONNOTATION, score);
}

</script>


<template>
    <div class="container scrollable">
        <Card 
            v-for="(nade, id) in filteredMatchNades"
            :key="id"
            :title="UTILITY_DATA[nade.meta.type]?.label || nade.meta.type"
            :accent="getAccent(nade.score)"
            :selected="isSelectedGrenade(id)"
            @click="setSelectedGrenadeId(id)"
        >
        {{ nade.thrown.round }}
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