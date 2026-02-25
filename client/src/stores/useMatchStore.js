import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { UTILITY_OPTS, TEAM_OPTS } from "../constants";
import { MAP_DATA } from "../data/map-data";


export const filterNades = (nades, steamid, utilityType, team) => {
    if (!nades) return [];
    return nades.filter(n => {
        const matchPlayer = steamid === "none" || n.owner === steamid; 
        const matchType = utilityType === "ALL" || n.type === utilityType;
        //const matchTeam = team === "ALL" || n.team === team;

        return matchPlayer && matchType;
    });
}

export const useMatchStore = defineStore('match', () => {
    const selectedPlayer = ref({
        steamid: "none",
        name: "none",
    });
    const selectedUtility = ref(UTILITY_OPTS[0].id);
    const selectedTeam = ref(TEAM_OPTS[0].id);

    const matchData = ref(null);
    const matchNades = computed(() => matchData.value?.grenades ?? []);
    const matchTeams = computed(() => matchData.value?.teams ??
    [[{steamid: "1",name: "player1",}], [{steamid: "2",name: "player2",},]]);
    const matchHeader = computed(() => matchData.value?.header ?? {});

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

    matchData,
    matchNades,
    matchTeams,
    matchHeader,
    mapInfo,

    filteredMatchNades
   }
})