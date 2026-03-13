<script setup>

const props = defineProps({
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    },
    size: {
        type: Number,
        default: 2
    },
    accent: {
        type: String,
        default: "#ffffff"
    },
    image: {
        type: String,
        default: ""
    },
    opacity: {
        type: Number,
        default: 50
    }
})
</script>

<template>
        <div class="main" :class="{ 'main--circle': !image }">
            <img v-if="image" class="main__img" :src="image" :alt="image"/>
            <slot></slot>
        </div>

</template>

<style scoped>
.main {
    position: absolute;
    width: v-bind("size + 'rem'");
    height: v-bind("size + 'rem'");
    top: v-bind("y + '%'");
    left: v-bind("x + '%'");
    background: v-bind("accent");
    opacity: v-bind("opacity / 100");
    transform: translate(-50%, -50%);
    /* outline: 2px solid red; */

}

.main__img {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
}

.main--circle {
    border-radius: 50%;
}
</style>