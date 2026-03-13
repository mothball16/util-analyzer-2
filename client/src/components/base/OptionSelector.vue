<script setup>

const props = defineProps({
    options: {
        type: Array,
        required: true,
    }
});
const selection = defineModel();

</script>

<template>
    <div>
        <select v-model="selection">
            <option 
                v-for="opt in options" 
                :key="opt.id" 
                :value="opt.id"
            >
                {{ opt.label }}
            </option>
        </select>
    </div>
</template>

<style scoped>
    
</style>