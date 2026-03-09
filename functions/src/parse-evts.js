import { log } from "firebase-functions/logger";
import { GrenadeType } from "./enums.js";
import { parseEvents, parseGrenades, parsePlayerInfo, parseHeader } from "@laihoe/demoparser2";

// https://gist.github.com/lucasmonstrox/7923db3dbe21536417b266bd4ff6ba44
// TODO: parserounds example

const grenadeEvtDict = {
  "hegrenade_detonate": GrenadeType.HE,
  "smokegrenade_detonate": GrenadeType.SMOKE,
  "flashbang_detonate": GrenadeType.FLASHBANG,
  "inferno_startburn": GrenadeType.MOLOTOV,
  "decoy_detonate": GrenadeType.DECOY,
}

export const extractTeams = (path) => {
  const rawPlrs = parsePlayerInfo(path);
  const teams = [{}, {}];

  for (const p of rawPlrs) {
    const teamDict = p.team_number == 2 ? teams[0] : teams[1];
    teamDict[p.steamid] = {
      name: p.name,
      steamid: p.steamid
    }
  }
  return teams;
}


export const extractHeader = (path) => {
  return parseHeader(path);
}

export const extractRounds = (path) => {
  const roundStartEvts = parseEvents(path, ["round_start"]);
  console.log(roundStartEvts);
  // const rounds = [];
  // for (let roundNum = 0; roundNum < roundStartEvts.length; roundNum++) {
  //   rounds[roundNum] = {
  //     startTick: roundStartEvts[i].
  //   }
  // }
}

export const extractGrenades = (path) => {
  const nadeEvts = parseEvents(path, Object.keys(grenadeEvtDict));
  const blindEvts = parseEvents(path, ["player_blind"]);
  const rawGrenades = parseGrenades(path, [], false); 
  console.log(extractRounds(path));

  // init. the final thing we are returning.
  // this is a dict of info mapped to the grenades unique entity ID
  const grenadeData = {}

  // https://cs2.poggu.me/dumped-data/game-events/
  for (const e of nadeEvts) {
    const grenadeType = grenadeEvtDict[e.event_name];
    // note to self; this is a bit hacky, but a grenade cant be properly mapped if it didnt have an explode evt
    // so this would, on occurence of an explosion event, create an entry to the grenade entity list
    // since its parsed chronologically, the first entry should have where we threw it and which tick we
    // threw it on. nothing past that entry is relevant because the mapping for now is just a simple line from origin to destination
    if (!grenadeData[e.entityid]) {
      grenadeData[e.entityid] = {
        loaded: false,
        type: grenadeType,
        owner: e.user_steamid,
        owner_name: e.user_name,
        // this is grabbed in the pass over the parsed grenade data
        tickThrown: null,
        posThrown: {
          x: null,
          y: null,
          z: null
        },

        tickDetonated: e.tick,
        posDetonated: {
          x: e.x,
          y: e.y,
          z: e.z
        },
        affectedPlayers: {}
      }
    }
  }

  for (const e of blindEvts) {
  //  https://cs2.poggu.me/dumped-data/game-events#player_blind
    // its guaranteed that this event will be after the grenade has been boomed, but it wouldnt be so bad to assert it anyways
    const entry = grenadeData[e.entityid];
    if (!entry)
      throw new Error("player_blind event somehow parsed before flashbang_detonate event, this shouldnt happen");

    // flashbangs also shouldnt be player blinding the same UID more than once
    entry.affectedPlayers[e.user_steamid] = {
      name: e.user_name,
      blinded: e.blind_duration,
      fullBlinded: e.blind_duration > 1.5,
    }
  }

  // from the parsed grenade data, naively check each one and ignore any entries for any entity IDs after the first entry
  // the first entry will have the data about where the grenade originated from
  // this is the only data we need tbh but i dont know enough about demoparser to know if there is a better way to do this
  // instead of looping over 100k+ events
  for (const g of rawGrenades) {
    const grenadeEntry = grenadeData[g.grenade_entity_id];
    if (grenadeEntry && grenadeEntry["loaded"] === false) {
      grenadeEntry.tickThrown = g.tick;
      grenadeEntry.posThrown.x = g.x;
      grenadeEntry.posThrown.y = g.y;
      grenadeEntry.posThrown.z = g.z;
      grenadeEntry["loaded"] = true;
    }
  }

  return grenadeData;

}

