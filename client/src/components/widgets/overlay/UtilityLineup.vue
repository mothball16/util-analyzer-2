<script setup>
import Dot from "./Dot.vue"
import { useMatchStore } from "../../../stores/useMatchStore";
import { storeToRefs } from 'pinia';
import { UtilityImage } from "../../../data/enums";
import { gameToAppAxis } from "../../../util/conversion";
import { ref, computed } from "vue";

const DRAW_STATE = Object.freeze({
    NEUTRAL: "neutral",
    SELECTED: "selected",
    FADE: "fade",
});

const store = useMatchStore();
const { mapInfo, selectedGrenadeId } = storeToRefs(store);
const props = defineProps({
    nade: {
        type: Object,
        required: true
    },
    id: {
        type: String,
        required: true
    }
})

const hovering = ref(false);

const state = computed(() => {
    if (selectedGrenadeId.value === props.id) {
        return DRAW_STATE.SELECTED;
    } else if (!selectedGrenadeId.value) {
        return DRAW_STATE.NEUTRAL;
    }
    return DRAW_STATE.FADE;
});

const opacity = computed(() => {
    switch (state.value) {
        case DRAW_STATE.NEUTRAL:
            return hovering.value ? 100 : 30;
        case DRAW_STATE.SELECTED:
            return 100;
        case DRAW_STATE.FADE:
            return 15;
        default:
            return 30;
    }
});

const handleClick = () => {
    if (selectedGrenadeId.value === props.id) {
        selectedGrenadeId.value = null;
    } else {
        selectedGrenadeId.value = props.id;
    }
}
</script>

<template>
<div class="container">
    <Dot
        :opacity="opacity"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false"
        @click="handleClick"
        accent="#ffffff00"
        :size="3"
        
        :image="UtilityImage[nade.meta.type]"
        :x="gameToAppAxis(mapInfo.name, nade.detonated.pos.x, 'x')"
        :y="gameToAppAxis(mapInfo.name, nade.detonated.pos.y, 'y')"
    />
    <Dot
        :opacity="opacity"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false"
        @click="handleClick"

        accent="#ffffff00"
        :size="1"

        image="images/icons/throw-pos.png"
        :x="gameToAppAxis(mapInfo.name, nade.thrown.pos.x, 'x')"
        :y="gameToAppAxis(mapInfo.name, nade.thrown.pos.y, 'y')"
    />
</div>

</template>


<style scoped>
</style>