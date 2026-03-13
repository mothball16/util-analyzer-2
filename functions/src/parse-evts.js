import { GrenadeType } from "./enums.js";
import { parseEvents, parseGrenades, parsePlayerInfo, parseHeader } from "@laihoe/demoparser2";
import { findRoundOfTick } from "./utils.js";
// https://gist.github.com/lucasmonstrox/7923db3dbe21536417b266bd4ff6ba44
// TODO: parserounds example

const GRENADE_EVENT_TO_TYPES = {
  "hegrenade_detonate": GrenadeType.HE,
  "smokegrenade_detonate": GrenadeType.SMOKE,
  "flashbang_detonate": GrenadeType.FLASHBANG,
  "inferno_startburn": GrenadeType.MOLOTOV,
  "decoy_detonate": GrenadeType.DECOY,
}

const ROUND_EVENT_NAMES = Object.freeze({
  ROUND_START: "round_start",
  ROUND_END: "round_end"
});

const CONTEXT_EVENT_NAMES = Object.freeze({
  PLAYER_BLIND: "player_blind",
  PLAYER_HURT: "player_hurt",
  PLAYER_DEATH: "player_death",

});

// the events that get parsed
const EVENTS_TO_PARSE = [
  ...Object.values(ROUND_EVENT_NAMES),
  ...Object.values(CONTEXT_EVENT_NAMES),
  ...Object.keys(GRENADE_EVENT_TO_TYPES)
];



// ------------------------------------------------------------------------------------------------------------


const getUniqueID = (round, entityId) => {
  return `${round}_${entityId};`
}

const extractTeams = (rawPlrs) => {
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

const extractRounds = (rawStartEvents) => {
  const rounds = [];
  //. { event_name: 'round_start', round: 1, tick: 65 },/
  for (let roundNumber = 0; roundNumber < rawStartEvents.length; roundNumber++) {
    rounds[roundNumber] = {
      tick: rawStartEvents[roundNumber].tick,
      round: rawStartEvents[roundNumber].round
    }
  }
  return rounds;
}


const extractGrenades = (rounds, rawGrenadeInstances, rawGrenadeEvents) => {
  // init. the final thing we are returning.
  // this is a dict of info mapped to the grenades unique entity ID
  const grenadeData = {
    valid: {},
    processing: {}
  }

  // https://cs2.poggu.me/dumped-data/game-events/
  for (const e of rawGrenadeEvents) {
    const roundOfDetonation = findRoundOfTick(rounds, e.tick);
    const grenadeType = GRENADE_EVENT_TO_TYPES[e.event_name];
    const ID = getUniqueID(roundOfDetonation, e.entityid);
    // note to self; this is a bit hacky, but a grenade cant be properly mapped if it didnt have an explode evt
    // so this would, on occurence of an explosion event, create an entry to the grenade entity list
    // since its parsed chronologically, the first entry should have where we threw it and which tick we
    // threw it on. nothing past that entry is relevant because the mapping for now is just a simple line from origin to destination
    if (!grenadeData.processing[ID]) {
      grenadeData.processing[ID] = {
        meta: {
          type: grenadeType,
          owner: e.user_steamid,
          ownerName: e.user_name,
          entityId: e.entityid,
        },
        context: {
          
        },
        thrown: {
          tick: null,
          round: null,
          pos: {
            x: null,
            y: null,
            z: null
          }
        },
        detonated: {
          time: e.game_time - e.round_start_time,
          tick: e.tick,
          round: roundOfDetonation,
          pos: {
            x: e.x,
            y: e.y,
            z: e.z
          }
        }
      }
    }
  }

  /*
  for (const e of rawContextEvents) {
  //  https://cs2.poggu.me/dumped-data/game-events#player_blind
    // its guaranteed that this event will be after the grenade has been boomed, but it wouldnt be so bad to assert it anyways
    const entry = grenadeData[e.entityid];
    if (!entry)
      throw new Error("player_blind event somehow parsed before flashbang_detonate event, this shouldnt happen");

    // flashbangs also shouldnt be player blinding the same UID more than once
    entry.context.affectedPlayers[e.user_steamid] = {
      name: e.user_name,
      blinded: e.blind_duration,
      fullBlinded: e.blind_duration > 1.5,
    }
  }*/

  // from the parsed grenade data, naively check each one and ignore any entries for any entity IDs after the first entry
  // the first entry will have the data about where the grenade originated from
  // this is the only data we need tbh but i dont know enough about demoparser to know if there is a better way to do this
  // instead of looping over 100k+ events
  for (const g of rawGrenadeInstances) {
    const roundThrown = findRoundOfTick(rounds, g.tick);
    const ID = getUniqueID(roundThrown, g.grenade_entity_id);
    const entry = grenadeData.processing[ID];
    if (entry) {
      entry.thrown.tick = g.tick;
      entry.thrown.round = roundThrown;
      entry.thrown.pos.x = g.x;
      entry.thrown.pos.y = g.y;
      entry.thrown.pos.z = g.z;

      
      grenadeData.valid[ID] = entry;
      grenadeData.processing[ID] = null;
    }
  }
  // TODO: log the failed (still processing after second pass) grenades somewhere
  return grenadeData.valid;
}

const fillGrenadeContexts = (grenades, rawContextEvents) => {
}

const filterEventsSingle = (events, eventType) => {
  return events.filter(e => e.event_name === eventType);
}
const filterEventsArray = (events, eventTypes) => {
  return events.filter(e => eventTypes.includes(e.event_name));
}
// the main one!!!
export const extractMatchData = (path) => {
  // get raw events
  const rawHeader = parseHeader(path);
  const rawPlayers = parsePlayerInfo(path);
  const rawEvents = parseEvents(path, EVENTS_TO_PARSE, [], ["game_time", "round_start_time"]);
  const rawGrenadeInstances = parseGrenades(path, [], false); 

  // todo: round extraction should also account round_end event
  const rawStartEvents = filterEventsSingle(rawEvents, ROUND_EVENT_NAMES.ROUND_START);

  const rawContextEvents = filterEventsSingle(rawEvents, CONTEXT_EVENT_NAMES.PLAYER_BLIND);  
  const rawGrenadeEvents = filterEventsArray(rawEvents, Object.keys(GRENADE_EVENT_TO_TYPES));

  // call helper funcs
  const teams = extractTeams(rawPlayers);
  const rounds = extractRounds(rawStartEvents);
  const grenades = extractGrenades(rounds, rawGrenadeInstances, rawGrenadeEvents);
  fillGrenadeContexts(grenades, rawContextEvents);

  const header = rawHeader;
  return {
    teams,
    grenades,
    header
  };
}