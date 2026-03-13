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
    }
})
</script>

<template>
    <div class="main">
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
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 50%;
}
</style>