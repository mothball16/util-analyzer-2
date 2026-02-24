<script setup>
import { ref, computed} from 'vue';
import LoadingScreen from './components/widgets/LoadingScreen.vue/index.js';
import Map from './components/widgets/Map.vue/index.js';
import MatchFilters from './components/widgets/MatchFilters.vue/index.js';
import MatchSummary from './components/widgets/MatchSummary.vue/index.js';
import PlayerSelect from './components/widgets/PlayerSelect.vue/index.js';
import ScreenTooSmall from './components/ScreenTooSmall.vue';
import UtilityCatalog from './components/widgets/UtilityCatalog.vue';
import { UI, UTILITY_OPTS, TEAM_OPTS } from "./constants.js";
import { getMatchData } from './services/data-service.js';

const selectedPlayer = ref({
  steamid: "none",
  name: "none",
});
const selectedUtility = ref(UTILITY_OPTS[0].id);
const selectedTeam = ref(TEAM_OPTS[0].id);

const loadingStatus = ref(null);
const errorMessage = ref(null);

const matchData = ref(null);
const matchNades = computed(() => matchData.value ? matchData.value.grenades : []);
const matchTeams = computed(() => matchData.value ? matchData.value.teams : 
  [[{steamid: "1",name: "player1",}], [{steamid: "2",name: "player2",},]]);
const matchHeader = computed(() => matchData.value ? matchData.value.header : {});



getMatchData((value) => {
  loadingStatus.value = value;
}).then((data) => {
  matchData.value = data;
  loadingStatus.value = null;
}).catch((error) => {
  loadingStatus.value = null;
  errorMessage.value = error.message;
});

</script>

<template>
    <header>
        <h1><img src="./flashbang-icon.png" alt="logo">NadeAnalyzer</h1>
        <div class="header__sub">
            <p><a href="https://steamcommunity.com/my/gcpd/730?tab=matchhistorypremier">Find your .dem files here.</a></p>
            <button id="upload-btn">Upload .dem file</button>
        </div>
    </header>
    <main>
        <ScreenTooSmall 
          class="overlay" 
          :limit="UI.TOO_SMALL"/>
        <LoadingScreen 
          v-if="loadingStatus"
          class="overlay"
          :message="loadingStatus"/>
        <div v-if="errorMessage" class="overlay">
          <p>{{ errorMessage }}</p>
        </div>

        <Map 
          id="map" 
          class="card stay-in-grid"
          v-if="matchData"
          :matchHeader="matchHeader"/>
        <MatchSummary 
          id="summary" 
          class="card stay-in-grid"/>
        <MatchFilters 
          id="filter" 
          class="card stay-in-grid"
          v-model:selectedUtility="selectedUtility"
          v-model:selectedTeam="selectedTeam"
        />
        <PlayerSelect 
          id="select-player" 
          class="card stay-in-grid"
          :teams="matchTeams"
          v-model="selectedPlayer"
        />
        <UtilityCatalog 
          id="catalog"
          class="card stay-in-grid"
          />
          
    </main>
    <footer>
      <h2>Work in progress - shoot me a msg @mothball16 on discord if u actually use this</h2>
    </footer>
</template>

<style scoped>
body {
  margin: 0 auto;
}

header, footer {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #1a1a1a;
}

.header__sub {
  display: flex;
  gap: 1rem;
  align-items: center;
}

main {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  width: 95%;
  margin: 0 auto;
  aspect-ratio: 1.5;
  padding: 1.5rem;
}

/* https://getcssscan.com/css-box-shadow-examples */
/* https://stackoverflow.com/questions/43311943/prevent-content-from-expanding-grid-items */
.card {
  border-radius: 1rem;
  border: 1px solid rgb(134, 134, 134);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  padding: 1rem;
}



.plot-point {
  position: absolute;
  width: 2rem;
  height: 2rem;
  background: rgb(250, 192, 67);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 50%;
}
.stay-in-grid {
  min-width: 0;
  min-height: 0;
}

#map {
  position: relative;
  grid-column: 2 / 4;
  grid-row: 1 / 4;
}


#map__points {
  position: absolute;
  inset: 0;
  z-index: 100;
}

#summary {
  grid-column: 4;
  grid-row: 1 / 5;
}

#summary > ul {
  margin-left: 1rem;
}

#summary tr :nth-child(2) {
  text-align: right;
  width: 40%;
}

#catalog {
  grid-column: 1;
  grid-row: 1 / 4;
}

#filter {
  grid-column: 1;
  grid-row: 4;
}

#select-player {
  grid-column: 2 / 4;
  grid-row: 4;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2em;
  z-index: 999;
}

</style>