import { fetchData } from "./fetchWrapper.js";

var cardBodyDiv;

export async function initProductListing() {
    const uri = "data/catalog.json";
    const products = await fetchData(uri);
    loadProducts(products, false);

    const brandsFilter = document.querySelectorAll('.brands');
    brandsFilter.forEach(brandChk => {
        brandChk.addEventListener('change', () => {
            if (brandChk.checked) {
                const filteredProducts = products.products.filter(product => product.brand.includes(brandChk.value));
                loadProducts(filteredProducts, true);
            }
        });
    });

    const searchBar = document.getElementById('search-bar');
   searchBar.addEventListener('keypress', ()=>{
    const searchKeyword = searchBar.value;
    const productList = document.getElementById('product-card');
    const listItems = productList.childNodes;
    listItems.forEach(productItem => {
        if (productItem.textContent.toLowerCase().includes(searchKeyword.toLowerCase())) {
            productItem.style.display = "block";
        } else {
            productItem.style.display = "none";
        }
    })
   })
}

function loadProducts(products, isFiltered) {
    const productContainer = document.getElementById("product-card");
    productContainer.replaceChildren();

    const list = isFiltered ? products : products.products;

    list.forEach(product => {
        const div = document.createElement('div');
        div.className = "card m-2";
        div.style = "width: 12rem; height: 25rem;";
        productContainer.appendChild(div);

        createNewProduct(div, 'img', product.image, "card-img-top");
        createNewProduct(div, 'div', null, "card-body");
        createNewProduct(cardBodyDiv, 'h5', product.itemTitle, "card-title");
        createNewProduct(cardBodyDiv, 'p', product.itemDescription, "card-text");
        createNewProduct(cardBodyDiv, 'p', product.unitPrice, "card-text");

        div.addEventListener("click", () => {
            localStorage.setItem('product-id', product.itemId);
            window.location = "Product-details.html";
        });
    });
}

function createNewProduct(parent, elemName, content, elemClass) {
    const newElem = document.createElement(elemName);
    newElem.className = elemClass;
    newElem.textContent = content;
    parent.appendChild(newElem);

    if (elemName === 'img') {
        newElem.src = content;
        newElem.style.height = "9rem";
    }

    if (elemName === 'div') {
        cardBodyDiv = newElem;
    }

    return newElem;
}
