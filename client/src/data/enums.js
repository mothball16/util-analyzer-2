
export const GrenadeType = Object.freeze({
    HE: 'hegrenade',
    SMOKE: 'smokegrenade',
    FLASHBANG: 'flashbang',
    MOLOTOV: 'molotov',
    INCENDIARY: 'incendiary',
    DECOY: 'decoy'
});

export const FactionType = Object.freeze({
    T: "terrorist",
    CT: "counterterrorist",
    ALL: "all"
})

export const UtilityImage = Object.freeze({
    [GrenadeType.HE]: "images/icons/flashbang-pop.png",
    [GrenadeType.SMOKE]: "images/icons/flashbang-pop.png",
    [GrenadeType.FLASHBANG]: "images/icons/flashbang-pop.png"
});