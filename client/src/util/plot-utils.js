import { MAP_DATA } from "./map-consts";

const PX_TO_PCT_FACTOR = 10.24
// translated game_to_pixel_axis from awpy and made it percent based instead
// https://github.com/pnxenopoulos/awpy/blob/main/awpy/plot/utils.py
export const gameToAppAxis = (mapName, position, axis) => {
    if (!["x","y"].includes(axis))
        throw new Error("invalid axis");

    const start = MAP_DATA[mapName]["pos_" + axis];
    const scale = MAP_DATA[mapName]["scale"];

    if (axis == "x")
        return ((position - start) / scale) / PX_TO_PCT_FACTOR;
    return ((start - position) / scale) / PX_TO_PCT_FACTOR;
}