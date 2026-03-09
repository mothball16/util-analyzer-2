<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useMatchStore } from '../../stores/useMatchStore';
import Card from '../base/Card.vue';
import { COLORS } from '../../constants';

const store = useMatchStore();
const { matchTeams, selectedPlayer } = storeToRefs(store);

const teamLeft = computed(() => matchTeams.value[0] || []);
const teamRight = computed(() => matchTeams.value[1] || []);

const selectPlayer = (player) => {
    selectedPlayer.value = player;
}

const buttonIsSelected = (player) => {
    return selectedPlayer.value?.steamid === player.steamid;
}

</script>

<template>
    <div>
        <div class="player-top">
            <h3>Select Player</h3>
        </div>
        
        <div class="player-lists">
            <div class="player-list scrollable">
                <Card 
                    v-for="plr in teamLeft"
                    :accent="COLORS.TEAM_ONE"
                    :key="plr.steamid"
                    :selected="buttonIsSelected(plr)"
                    @click="selectPlayer(plr)"
                >
                    <h4>{{ plr.name }}</h4>
                </Card>
            </div>
            <div class="player-list scrollable">
                <Card 
                    v-for="plr in teamRight"
                    :accent="COLORS.TEAM_TWO"
                    :key="plr.steamid"
                    :selected="buttonIsSelected(plr)"
                    @click="selectPlayer(plr)"
                >
                    <h4>{{ plr.name }}</h4>
                </Card>
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
  flex: 1;
  min-height: 0;
}

.player-list {
  display: flex;
  flex-flow: column nowrap;
  width: 50%;
  gap: 0.2rem;
  justify-content: space-between;
}

.scrollable {
  overflow-y: auto;
  scrollbar-width: thin; 
  scrollbar-color: rgb(121, 121, 121) rgb(24, 24, 24,0);
}
</style>