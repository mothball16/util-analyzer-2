<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useMatchStore } from '../../stores/useMatchStore';

const store = useMatchStore();
const { matchTeams, selectedPlayer } = storeToRefs(store);

const teamLeft = computed(() => matchTeams.value[0] || []);
const teamRight = computed(() => matchTeams.value[1] || []);

const selectPlayer = (player) => {
    selectedPlayer.value = player;
}
</script>

<template>
    <div>
        <div class="player-top">
            <h2>Select Player</h2>
        </div>
        
        <div class="player-lists">
            <div class="player-list player-list--r scrollable">
                <div 
                    v-for="plr in teamLeft"
                    :key="plr.steamid"
                    class="player-card"
                    :class="{ 'player-card--sel': selectedPlayer?.steamid === plr.steamid}"
                    @click="selectPlayer(plr)"
                >
                    <h4>{{ plr.name }}</h4>
                </div>
            </div>
            <div class="player-list player-list--b scrollable">
                <div 
                    v-for="plr in teamRight"
                    :key="plr.steamid"
                    class="player-card" 
                    :class="{ 'player-card--sel': selectedPlayer?.steamid === plr.steamid}"
                    @click="selectPlayer(plr)"
                >
                    <h4>{{ plr.name }}</h4>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
.player-top {
  display: flex;
  justify-content: space-between;
}

.player-lists {
  display: flex;
}

.player-list {
  display: flex;
  flex-flow: column nowrap;
  width: 50%;
  gap: 0.2rem;
  justify-content: space-between;
}

.player-list--r {
  border-radius: 2px;
  border-left: 2px solid #ff4d4d;
}

.player-list--b {

  border-radius: 2px;
  border-left: 2px solid #4d4dff;
}

.player-card {
  padding: 0rem 0.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1;
}

.player-card:hover {
  cursor: pointer;
  color: #c9c9c9;
}

.player-card::before {
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

.player-card--sel, .player-card--sel::before {
  width: 100%;
}





.scrollable {
  overflow-y: auto;
  scrollbar-width: thin; 
  scrollbar-color: rgb(121, 121, 121) rgb(24, 24, 24,0);
}
</style>