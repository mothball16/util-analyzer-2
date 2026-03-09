<script setup>
import { watch } from 'vue';
import { useMatchStore } from '../../stores/useMatchStore';
import { storeToRefs } from 'pinia';
import Card from '../base/Card.vue';

const store = useMatchStore();
const { filteredMatchNades } = storeToRefs(store);

watch(filteredMatchNades, () => {
    console.log(filteredMatchNades.value);
});
</script>


<template>
    <div class="container scrollable">
        <Card v-for="nade in filteredMatchNades">
            g
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