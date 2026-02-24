<script setup>
  const props = defineProps({
    message: {
      type: String,
    }
  });
</script>

<template>
    <div>
        <div class="loading-ring"></div>
        <p v-if="message">{{message}}</p>
    </div>
</template>


<style scoped>
/* https://www.w3schools.com/howto/howto_css_loader.asp */
.loading-ring {
  border: 8px solid #555555; /* Light grey */
  border-top: 8px solid #9ab5ff; /* Blue */
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>