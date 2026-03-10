import localforage from 'localforage';
import { fetchMatchData } from './match-service.js';

export const getMatchData = async (updateLoadingText) => {
  try {
    updateLoadingText("Retrieving data...");
    let data = false;//await localforage.getItem("data");

    if (!data) {

      updateLoadingText("Retrieving data...");
      data = (await fetchMatchData()).data;

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