<script setup>
</script>

<template>
    <header>
        <h1><img src="/flashbang-icon.png" alt="logo">NadeAnalyzer</h1>
        <div class="header__sub">
            <p><a href="https://steamcommunity.com/my/gcpd/730?tab=matchhistorypremier" target="_blank">Find your .dem files here.</a></p>
            <button id="upload-btn">Upload .dem file</button>
        </div>
    </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #1a1a1a;
  color: white; /* Inherited from body usually, but good to be explicit if isolated */
}

.header__sub {
  display: flex;
  gap: 1rem;
  align-items: center;
}
</style>