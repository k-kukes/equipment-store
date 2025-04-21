import { fetchData } from "./fetchWrapper.js";

export function initLeagues() {
    console.log("Football Competitions API initializing...");
    const btnFetchTeams = document.querySelector("#btn-fetch-teams");
    btnFetchTeams.addEventListener('click',()=>{
        fetchTeams();
    }
    );
}

async function fetchTeams(){
    try {
        console.log("Fetching Premier League Teams");
        const uri = "https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=English%20Premier%20League"
        const teams = await fetchData(uri);
        parseTeams(teams.teams);
    }
    catch (error){
        console.log(`An error has occured while fetching teams. ${error.message}`);
    }
}

function parseTeams(teams){
    const tblTeams = document.getElementById("tbl-premier-league");
    console.log(teams);
    
    teams.forEach(team => {
        const tr = createCustomElement(tblTeams, 'tr', '');
        const colId = createCustomElement(tr, 'td', team.idTeam);
        createCustomElement(tr, 'td', team.strTeam);
        createCustomElement(tr, 'td', team.strStadium);
        createCustomElement(tr, 'td', team.intStadiumCapacity);
        createCustomElement(tr, 'td', team.strLocation);
        const siteLink = createCustomElement(tr, 'td', '');
        const showLink = createCustomElement(siteLink, 'a', team.strWebsite)
        showLink.href = team.strWebsite;
        const imageID = createCustomElement(tr, 'td', '');
        const imageCol = createCustomElement(imageID, 'img', '');
        imageCol.src = team.strBadge;
        imageCol.width = 100;
        imageCol.height = 100;
    });
}

function createCustomElement(parent, newElemName, content){
    const newElem = document.createElement(newElemName);
    newElem.textContent = content;
    parent.appendChild(newElem);
    return newElem;
}