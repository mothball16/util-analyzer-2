import {setGlobalOptions} from "firebase-functions/v2";
import {onCall, HttpsError} from "firebase-functions/v2/https";
import { parseEvents, parseTicks, parsePlayerInfo } from "@laihoe/demoparser2";
import { extractGrenades, extractTeams, extractHeader} from "./parse-evts.js"
setGlobalOptions({maxInstances: 10});

const demoPath = "test.dem";



export const fetchTicks = onCall({cors: true},async (req) => {
  return parseTicks(demoPath, ["X", "Y"]);
});

export const fetchTeams = onCall({cors: true},async (req) => {
  return extractTeams(demoPath);
});

export const fetchGrenades = onCall({memory: "1GiB", timeoutSeconds: 300, cors: true},async (req) => {
  return extractGrenades(demoPath);
});

export const fetchHeader = onCall({cors: true},async (req) => {
  return extractHeader(demoPath);
});