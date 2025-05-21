import { initProductListing } from "./modules/productsListing.js";
import { initLeagues } from "./modules/premierLeague.js";
import { initLeafletMap } from "./modules/map.js";
import { initTeamStandings } from "./modules/teamStandings.js"; 
import { initProductDetails } from "./modules/productDetails.js";
import { initCart } from "./modules/cart.js";
import { initHome } from "./modules/home.js";

window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
  }

  const toggleButton = document.getElementById("lightModeButton");
  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
      localStorage.setItem(
        "theme",
        document.body.classList.contains("dark-theme") ? "dark" : "light"
      );
    });
  }
});

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
        initProductDetails().then(product => {
        window.loadedProduct = product;
     });
    }
    if (page === "cart") {
        initCart();
    }

    if (page === "home") {
        initHome();
    }
}
