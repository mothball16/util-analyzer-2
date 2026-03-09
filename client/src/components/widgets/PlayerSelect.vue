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
                    :title="plr.name"
                    :accent="COLORS.TEAM_ONE"
                    :key="plr.steamid"
                    :selected="buttonIsSelected(plr)"
                    @click="selectPlayer(plr)"
                >
                </Card>
            </div>
            <div class="player-list scrollable">
                <Card 
                    v-for="plr in teamRight"
                    :title="plr.name"
                    :accent="COLORS.TEAM_TWO"
                    :key="plr.steamid"
                    :selected="buttonIsSelected(plr)"
                    @click="selectPlayer(plr)"
                >
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
  flex-flow: column nowrap;
  gap: 1rem;
  flex: 1;
  min-height: 0;
}

.player-list {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  gap: 0.2rem;
  justify-content: space-between;
}
</style>