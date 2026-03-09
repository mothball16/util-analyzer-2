<script setup>
import { watch } from 'vue';
import { useMatchStore } from '../../stores/useMatchStore';
import { storeToRefs } from 'pinia';

const store = useMatchStore();
const { filteredMatchNades } = storeToRefs(store);

watch(filteredMatchNades, () => {
    console.log(filteredMatchNades.value);
});
</script>


<template>
    <div id="container">
        <div v-for="nade in filteredMatchNades">
            g
        </div>
    </div>

</template>

<style scoped>
#container {
    display: flex;
    flex-flow: column nowrap;
    overflow-y: scroll;
}
</style>