import { defineStore } from "pinia"
import { ref, computed, watch } from "vue"
import { UTILITY_OPTS, TEAM_OPTS } from "../constants";
import { MAP_DATA } from "../data/map-data";
import { calculateScore } from "../services/scoring-service";
import { getMatchData } from "../services/data-service.js";



export const filterNades = (nades, steamid, utilityType, team) => {
    if (!nades) return [];
    return Object.values(nades).filter(n => {
        const matchPlayer = steamid === "none" || n.meta.owner === steamid; 
        const matchType = utilityType === "ALL" || n.meta.type === utilityType;
        //const matchTeam = team === "ALL" || n.team === team;
        return matchPlayer && matchType;
    });
}

export const useMatchStore = defineStore('match', () => {
     //--------------------- normal refs ---------------------
    const selectedPlayer = ref({
        steamid: "none",
        name: "none",
    });
    const selectedUtility = ref(UTILITY_OPTS[0].id);
    const selectedTeam = ref(TEAM_OPTS[0].id);
    const selectedGrenadeId = ref(null);

    const rawMatchData = ref(null);
    const matchNades = ref({});

    const loadingStatus = ref(null);
    const errorMessage = ref(null);

    //------------------------- actions -------------------------
    function setMatchData(data) {
        rawMatchData.value = data;
        const processedNades = data?.grenades ?? {};
        for (const nade of Object.values(processedNades)) {
            nade.score = calculateScore(nade);
        }
        matchNades.value = processedNades;
    }

    async function loadMatchData() {
        try {
            loadingStatus.value = "Starting...";
            const data = await getMatchData((msg) => loadingStatus.value = msg);
            setMatchData(data);
            loadingStatus.value = null;
        } catch (error) {
            console.error(error);
            errorMessage.value = error.message;
            loadingStatus.value = null;
        }
    }

    //--------------------- computed refs ---------------------
    const matchTeams = computed(() => rawMatchData.value?.teams ??
    [[{steamid: "1",name: "player1",}], [{steamid: "2",name: "player2",},]]);
    
    const matchHeader = computed(() => rawMatchData.value?.header ?? {});

    const mapInfo = computed(() => {
        const name = matchHeader.value?.map_name;
        if (!name) return { name: "none", data: null };

        const metadata = MAP_DATA[name];
        return {
            name: name,
            data: metadata,
        }
    });

    const filteredMatchNades = computed(() => 
        filterNades(matchNades.value, selectedPlayer.value.steamid, selectedUtility.value, selectedTeam.value));

    //--------------------- watchers ---------------------

    // this removes the user selection if their selection is not currently filtered in
    watch(filteredMatchNades, (newValue) => {
        const selectedUtilExists = newValue.some(
            (g => g.meta.uniqueId === selectedGrenadeId.value))
        if (!selectedUtilExists) {
            selectedGrenadeId.value = null;
        }
    })

  return {
    selectedPlayer,
    selectedUtility,
    selectedTeam,
    selectedGrenadeId,

    rawMatchData,
    matchNades,
    loadingStatus,
    errorMessage,
    matchTeams,
    matchHeader,
    mapInfo,

    filteredMatchNades,

    setMatchData,
    loadMatchData,
   }
})