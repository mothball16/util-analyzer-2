import {setGlobalOptions} from "firebase-functions/v2";
import {onCall, HttpsError} from "firebase-functions/v2/https";
import { extractMatchData} from "./parse-evts.js"
import * as path from "path";
import * as fs from "fs";

setGlobalOptions({maxInstances: 10});

const demoPath = path.resolve("test.dem");

export const fetchMatchData = onCall({memory: "1GiB", timeoutSeconds: 300, cors: true},async (req) => {
  if (!fs.existsSync(demoPath)) {
    throw new HttpsError("not-found", `demo file not found @ ${demoPath}`);
  }
  return extractMatchData(demoPath);
});
