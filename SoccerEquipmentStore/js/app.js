import { fetchData } from "./modules/fetchWrapper.js";
import { initProductListing } from "./modules/productsListing.js";

document.addEventListener('DOMContentLoaded', initApp)

async function initApp(){
    console.log("Initializing the app...");

    const page = document.querySelector("[data-page]").dataset.page;
    if (page === "productListing") {
        initProductListing();
    }
}
