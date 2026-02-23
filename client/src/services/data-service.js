import localforage from 'localforage';
import { fetchTeams, fetchGrenades } from './match-service.js';

export const getMatchData = async (updateLoadingText) => {
  try {
    updateLoadingText("Retrieving data...");
    let data = await localforage.getItem("data");

    if (!data) {
      updateLoadingText("Formatting player data...");
      const teams = (await fetchTeams()).data;

      updateLoadingText("Aggregating grenade data...");
      const grenades = (await fetchGrenades()).data;

      data = {
        teams,
        grenades,
      };

      updateLoadingText("Saving data to local storage...");
      await localforage.setItem("data", data);
    }
    return data;
  } catch (error) {
    console.error("Error retrieving data:", error);
    await localforage.removeItem("data");
    throw new Error(`Error retrieving data: ${error.message}`);
  }
};

export const clearDataCache = async () => {
  await localforage.removeItem("data");
};