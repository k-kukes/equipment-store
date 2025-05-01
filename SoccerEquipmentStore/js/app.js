import { initProductListing } from "./modules/productsListing.js";
import { initLeagues } from "./modules/premierLeague.js";
import { initLeafletMap } from "./modules/map.js";

document.addEventListener('DOMContentLoaded', initApp)

async function initApp(){
    console.log("Initializing the app...");

    const page = document.querySelector("[data-page]").dataset.page;
    if (page === "productListing") {
        initProductListing();
    }
    if (page === "premierLeague") {
        initLeagues();
    }
    if (page === "map") {
        initLeafletMap();
    }
}
