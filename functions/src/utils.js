
export const findRoundOfTick = (rounds, targetTick) => {
    let low = 0;
    let high = rounds.length - 1;
    let result = -1;
    while(low <= high) {
        const mid = Math.floor((low + high) / 2);
        const startOfThisRound = rounds[mid].tick;
        
        if (startOfThisRound <= targetTick) {
            // round began before tick (look right, could be this round but need closest start)
            result = rounds[mid].round;
            low = mid + 1;
        } else {
            // round began after this tick (look left, definitely not this round)
            high = mid - 1;
        }
    }
    return result;
}

export const getFlashAssists = (nade, kills) => {

}