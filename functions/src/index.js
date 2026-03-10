import {setGlobalOptions} from "firebase-functions/v2";
import {onCall, HttpsError} from "firebase-functions/v2/https";
import { extractMatchData} from "./parse-evts.js"
setGlobalOptions({maxInstances: 10});

const demoPath = "test.dem";

export const fetchMatchData = onCall({memory: "1GiB", timeoutSeconds: 300, cors: true},async (req) => {
  return extractMatchData(demoPath);
});

