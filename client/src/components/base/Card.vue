<script setup>
const props = defineProps({
    selected: {
      type: Boolean,
      default: false,
    },
    accent: {
      type: String,
      default: '#ffffff',
    },
    title: {
      type: String,
      default: 'title',
    },
});
</script>

<template>
    <div class="card" :class="{ 'card--selected': selected }">
      <div class="header">
        <h4>{{ title }}</h4> 
      </div>
      <div class="content" v-if="selected">
        <slot></slot>
      </div>
    </div>
</template>

<style scoped>
.content {
  width: 100%;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.card {
  padding: 0.25rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;

  border-radius: 2px;
  border-left: 2px solid v-bind(accent);
}

.card:hover {
  cursor: pointer;
  color: #c9c9c9;
}

.card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 0%;
  background-color: #343434;
  z-index: -1;
  transition: width 0.3s ease;
}


.card--selected, .card--selected::before {
  width: 100%;
}
</style>