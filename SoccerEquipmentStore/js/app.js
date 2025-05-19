import { initProductListing } from "./modules/productsListing.js";
import { initLeagues } from "./modules/premierLeague.js";
import { initLeafletMap } from "./modules/map.js";
import { initTeamStandings } from "./modules/teamStandings.js"; 
import { initProductDetails } from "./modules/productDetails.js";
import { initCart } from "./modules/cart.js";

document.addEventListener('DOMContentLoaded', initApp);

async function initApp() {
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

    if (page === "teamStandings") {
        initTeamStandings(); 
    }

    if (page === "productDetails") {
        initProductDetails();
    }

    if (page === "cart") {
        initCart();
    }
}
