import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { UTILITY_OPTS, TEAM_OPTS } from "../constants";
import { MAP_DATA } from "../data/map-data";
import { calculateScore } from "../services/scoring-service";

export const filterNades = (nades, steamid, utilityType, team) => {
    if (!nades) return [];
    return Object.values(nades).filter(n => {
        const matchPlayer = steamid === "none" || n.owner === steamid; 
        const matchType = utilityType === "ALL" || n.type === utilityType;
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

    const rawMatchData = ref(null);
    const matchNades = ref({});

    //------------------------- actions -------------------------
    function setMatchData(data) {
        rawMatchData.value = data;
        const processedNades = data?.grenades ?? {};
        for (const nade of Object.values(processedNades)) {
            nade.score = calculateScore(nade);
        }
        matchNades.value = processedNades;
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

  return {
    selectedPlayer,
    selectedUtility,
    selectedTeam,

    rawMatchData,
    matchNades,
    matchTeams,
    matchHeader,
    mapInfo,

    filteredMatchNades,

    setMatchData,
   }
})