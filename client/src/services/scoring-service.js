
export const calculateScore = (nade) => {
    switch(nade.type) {
        case UTILITY_DATA.flashbang.id:
            return 1;
        case UTILITY_DATA.hegrenade.id:
            return 1;
        case UTILITY_DATA.smokegrenade.id:
            return 1;
        case UTILITY_DATA.decoy.id:
            return 1;
        case UTILITY_DATA.incendiary.id:
        case UTILITY_DATA.molotov.id:
            return 1;
        default:
            return 1;
    }
}