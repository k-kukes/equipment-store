import { fetchData } from "./fetchWrapper.js";

var cardBodyDiv;

export async function initProductListing(){
    console.log("Product Listing Initialized");
    const uri = "data/catalog.json"
    const products = await fetchData(uri);
    loadProducts(products);
}

function loadProducts(products){
    const productContainer = document.getElementById("product-card");
    
    products.products.forEach(product => {
        console.log(product);

        const div = document.createElement('div');
        div.className = "card"
        div.style = "width: 17rem; height: 20rem"
        productContainer.appendChild(div);

        createNewProduct(div, 'img', product.image, "card-img-top");
        createNewProduct(div, 'div', null, "card-body");
        createNewProduct(cardBodyDiv, 'h5', product.itemTitle, "card-title")
        createNewProduct(cardBodyDiv, 'p', product.itemDescription, "card-text")
        createNewProduct(cardBodyDiv, 'p', product.unitPrice, "card-text")

        div.addEventListener("click", () => {
            sessionStorage.setItem(product.itemId,product);
        })
    });
}

function createNewProduct(parent, elemName, content, elemClass){
    const newElem = document.createElement(elemName);
    newElem.textContent = content;
    newElem.className = elemClass;
    parent.appendChild(newElem);

    if (elemName === 'div') {
        cardBodyDiv = newElem;
    }

    return newElem
}
