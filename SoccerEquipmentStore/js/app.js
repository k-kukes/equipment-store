import { fetchData } from "./modules/fetchWrapper.js";
import { loadProducts } from "./modules/productsListing.js";

document.addEventListener('DOMContentLoaded', initApp)

async function initApp(){
    console.log("Initializing the app...");
    const uri = "data/catalog.json"
    const products = await fetchData(uri);
    loadProducts(products);
}
