// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";
import localforage from 'localforage';
import { LoadingScreen } from "./loading-screen.js";
import { PlotPoint } from "./plot-point.js";
import { FactionType, GrenadeType } from "../util/enums.js";
import { PlotLineup } from "./plot-lineup.js";

//#region - - - [ firebase setup ] - - -
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjBdTcPy-M619idWz9NQPcv-0SvHvw8lg",
  authDomain: "utilanalyzer.firebaseapp.com",
  projectId: "utilanalyzer",
  storageBucket: "utilanalyzer.firebasestorage.app",
  messagingSenderId: "76887110280",
  appId: "1:76887110280:web:a0d5a2178f733df65b653d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);
// emulator debugging
//connectFunctionsEmulator(functions, "localhost", 5001);
//#endregion - - - [ firebase setup ] - - -

//const parseDemo = httpsCallable(functions, "parseDemo");
const fetchTicks = httpsCallable(functions, "fetchTicks");
const fetchTeams = httpsCallable(functions, "fetchTeams");
const fetchGrenades = httpsCallable(functions, "fetchGrenades");


const loadingScreen = new LoadingScreen();
const utilityFilter = {
  faction: FactionType.ALL,
  type: "all",
  id: 0
}


let currentlyRetrieving = false;
let selectedPlayer;

let points = [];

let mapNameTest = "de_dust2";

let loadedData = {
  teams: [],
  ticks: [],
  grenades: [],
  perPlayer: {},
}

const createPlayerCard = (player) => {
    const e = document.createElement("div");
  e.classList.add("player-card");
  e.innerHTML= `<h4>${player.name}</h4>`;

  // to select the player
  e.addEventListener('click', () => {
    new Audio("../click.mp3").play();
    selectedPlayer = player.steamid;
    for (const card of document.querySelectorAll(".player-card")){
      card.classList.remove("player-card--sel");
    }
    e.classList.add("player-card--sel");
    buildSummary(selectedPlayer);
  });
  return e;
}

const buildPlayerList = (teams) => {
  selectedPlayer = null;
  const widget = document.getElementById('select-player');
  const playersR = widget.querySelector(".player-list--r");
  const playersB = widget.querySelector(".player-list--b");
  playersR.innerHTML = '';
  playersB.innerHTML = '';
  //console.log(teams);
  for (const [id, player] of Object.entries(teams[0])){
    playersR.appendChild(createPlayerCard(player));
  }  
  for (const [id, player] of Object.entries(teams[1])){
    playersB.appendChild(createPlayerCard(player));
  }
}

const buildUtility = (targetid) => {
  const mapPoints = document.getElementById("map__points");
  mapPoints.innerHTML = "";
  points = [];
  for (const [entityid, grenade] of Object.entries(loadedData.grenades)) {
    if (grenade.owner !== targetid) continue;
    const plotLineup = new PlotLineup(grenade, 1.5, mapNameTest);
    plotLineup.render(mapPoints);
    plotLineup.hideLanding();
    plotLineup.element.addEventListener("mouseenter", () => {
      plotLineup.showLanding();
    });
    plotLineup.element.addEventListener("mouseleave", () => {
      plotLineup.hideLanding();
    });
    
    points.push(plotLineup);
  }
  updateFilter(utilityFilter);
}

const updateFilter = (filter) => {
  for (const point of points) {
    point.show();
   // console.log(point.data);  
    if(filter.type !== "all" && point.data.type !== filter.type) {
      point.hide();
    }
  }
}

const buildSummary = (steamid) => {
  document.getElementById("summary").innerHTML = `
    <h2>Summary</h2>
      <br/>
    <h3>Positive</h3>
    <table>
      <tr>
        <td>Impactful Flashes</td>
        <td>10</td>
      </tr>
      <tr>
        <td>Enemies Flashed</td>
        <td>10</td>
      </tr>
      <tr>
        <td>EF Duration</td>
        <td>100s</td>
      </tr>
      <tr>
        <td>Flash Assists</td>
        <td>10</td>
      </tr>
      <tr>
        <td>\>1.5s FA</td>
        <td>10</td>
      </tr>
    </table>

    <br/>

    <h3>Negative</h3>
    <table>
      <tr>
        <td>Not Impactful</td>
        <td>10</td>
      </tr>
      <tr>
        <td>Teammates Flashed</td>
        <td>10</td>
      </tr>
      <tr>
        <td>TF Duration</td>
        <td>100s</td>
      </tr>
    </table>
  `;
  buildUtility(selectedPlayer);
}

const retrieveData = async() => {
  try {
    if (currentlyRetrieving) return;
    currentlyRetrieving = true;
    loadingScreen.show();
    loadingScreen.update("Retrieving data...");
    let data = await localforage.getItem("data");
    if (!data){
      data = {
        teams: [],
        ticks: [],
        grenades: [],
      }

      loadingScreen.update("Formatting ticks... this may take up to 30 seconds.<br/>If an error occurs, you'll see the loading screen change.");
      //data.ticks = (await fetchTicks()).data;
      
      loadingScreen.update("Formatting player data...");
      data.teams = (await fetchTeams()).data;
      
      loadingScreen.update("Aggregating grenade data...");
      data.grenades = (await fetchGrenades()).data;

      loadingScreen.update("Saving data to local storage...");
      await localforage.setItem("data", data);
    }

    loadingScreen.hide();
    currentlyRetrieving = false;
    return data;
  } catch (error) {
    console.error(error);
    loadingScreen.update("Error retrieving data: " + error.message + "<br/>(if you see this, refresh the page)");
    localforage.removeItem("data");
  }
  
}

//https://cs-demo-manager.com/docs/guides/maps
const init = async () => {
  loadedData = await retrieveData();
  
  document.getElementById('upload-btn').addEventListener('click', async () => {
    localforage.removeItem("data");
    loadedData = await retrieveData();
  });

 //console.log(loadedData);
  buildPlayerList(loadedData.teams);

  document.getElementById('app').innerHTML = `
    <img class="map" src="./maps/${mapNameTest}.webp" alt="CS Map">
    <div id="map__points">      
    </div>
  `;

  document.getElementById("side-select").addEventListener("change", (e) => {
    utilityFilter.faction = e.target.value;

    updateFilter(utilityFilter);
  });
  
  document.getElementById("type-select").addEventListener("change", (e) => {
    utilityFilter.type = e.target.value;
    updateFilter(utilityFilter);
  })
}


init();