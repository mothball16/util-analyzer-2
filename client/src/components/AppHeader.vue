<script setup>
</script>

<template>
    <header>
        <h1><img src="/favicon-raw.png" alt="logo">util-analyzer 2</h1>
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
}

.header__sub {
  display: flex;
  gap: 1rem;
  align-items: center;
}
</style>