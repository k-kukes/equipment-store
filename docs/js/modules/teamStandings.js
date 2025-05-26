import { fetchData } from "./fetchWrapper.js";

export function initTeamStandings() {
    console.log("Squiggle Standings API initializing...");

    const btnFetchStandings = document.querySelector("#btn-fetch-standings");
    btnFetchStandings.addEventListener('click', () => {
        fetchStandings();
    });
}

async function fetchStandings() {
    try {
        console.log("Fetching standings from Squiggle API...");
        const uri = "https://api.squiggle.com.au/?q=standings";
        const data = await fetchData(uri);
        parseStandings(data.standings);
    } catch (error) {
        console.error("Error fetching standings:", error.message);
    }
}

function parseStandings(standings) {
    const tbl = document.getElementById("tbl-standings");

    // Clear table body if reloading
    tbl.querySelector("tbody").innerHTML = "";

    standings.sort((a, b) => a.rank - b.rank);

    standings.forEach(team => {
        const tr = createElement(tbl.querySelector("tbody"), "tr", "");

        createElement(tr, "td", team.rank);
        createElement(tr, "td", team.name);
        createElement(tr, "td", team.played);
        createElement(tr, "td", team.wins);
        createElement(tr, "td", team.losses);
        createElement(tr, "td", team.draws);
        createElement(tr, "td", team.pts);
        createElement(tr, "td", team.percentage.toFixed(2) + "%");
    });
}

function createElement(parent, type, text) {
    const el = document.createElement(type);
    el.textContent = text;
    parent.appendChild(el);
    return el;
}
