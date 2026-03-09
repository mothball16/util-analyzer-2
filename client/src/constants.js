export const UI = {
    TOO_SMALL: 1024,
};


export const UTILITY_DATA = {
    flashbang: {id: "flashbang", label: "Flashbang"},
    hegrenade: {id: "hegrenade", label: "HE"},
    smokegrenade: {id: "smokegrenade", label: "Smoke"},
    molotov: {id: "molotov", label: "Molotov"},
    incendiary: {id: "incendiary", label: "Incendiary"},
    decoy: {id: "decoy", label: "Decoy"},
};

export const UTILITY_OPTS = Object.values(UTILITY_DATA);

export const TEAM_OPTS = [
    {id: "ALL", label: "Both"},
    {id: "CT", label: "CTs"},
    {id: "T", label: "Ts"}
];

export const COLORS = {
    TEAM_ONE: "#ff4d4d",
    TEAM_TWO: "#4d4dff",
    POS_CONNOTATION: "#33ff00",
    NEG_CONNOTATION: "#ff5151",
}