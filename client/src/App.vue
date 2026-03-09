<script setup>
import { ref, computed} from 'vue';
import LoadingScreen from './components/widgets/LoadingScreen.vue';
import AppHeader from './components/AppHeader.vue';
import Map from './components/widgets/Map.vue';
import MatchFilters from './components/widgets/MatchFilters.vue';
import MatchSummary from './components/widgets/MatchSummary.vue';
import PlayerSelect from './components/widgets/PlayerSelect.vue';
import ScreenTooSmall from './components/ScreenTooSmall.vue';
import UtilityCatalog from './components/widgets/UtilityCatalog.vue';
import { UI, UTILITY_OPTS, TEAM_OPTS } from "./constants.js";
import { getMatchData } from './services/data-service.js';
import { useMatchStore } from './stores/useMatchStore.js';
import { storeToRefs } from 'pinia';

const loadingStatus = ref(null);
const errorMessage = ref(null);

const store = useMatchStore();
const { rawMatchData } = storeToRefs(store);


getMatchData((value) => {
  loadingStatus.value = value;
}).then((data) => {
  store.setMatchData(data);
  loadingStatus.value = null;
  console.log(rawMatchData.value);
}).catch((error) => {
  console.error(error);
  loadingStatus.value = null;
  errorMessage.value = error.message;
});

</script>

<template>
    <AppHeader/>
    <main>
        <!-- todo: overhaul error message - shouldn't be a random div -->
        <ScreenTooSmall class="overlay" :limit="UI.TOO_SMALL"/>
        <LoadingScreen v-if="loadingStatus" class="overlay" :message="loadingStatus"/>
        <div v-if="errorMessage" class="overlay"><p>{{ errorMessage }}</p></div>

        <Map id="map" class="card stay-in-grid"/>
        <MatchSummary id="summary" class="card stay-in-grid"/>
        <MatchFilters id="filter" class="card stay-in-grid"/>
        <PlayerSelect id="select-player" class="card stay-in-grid"/>
        <UtilityCatalog id="catalog" class="card stay-in-grid"/>
    </main>
    <footer>
      <h2>Work in progress - shoot me a msg @mothball16 on discord if u actually use this</h2>
    </footer>
</template>

<style scoped>
body {
  margin: 0 auto;
}

footer {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #1a1a1a;
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
  grid-column: 2 / 4;
  grid-row: 4;
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
  grid-column: 4;
  grid-row: 1 / 5;
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

.scrollable {
  overflow-y: auto;
  scrollbar-width: thin; 
  scrollbar-color: rgb(121, 121, 121) rgb(24, 24, 24,0);
}
</style>