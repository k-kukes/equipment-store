import { fetchData } from "./modules/fetchWrapper.js";

document.addEventListener('DOMContentLoaded', initApp)

function initApp(){
    console.log("Initializing the app...");
    const uri = "data/catalog.json"
    console.log(fetchData(uri));
}