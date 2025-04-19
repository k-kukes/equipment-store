var cardBodyDiv;

export function initProductListing(){
    console.log("Product Listing Initialized");
    
}

export function loadProducts(products){
    const productContainer = document.getElementById("product-card");
    
    products.products.forEach(product => {
        console.log(product);

        const div = document.createElement('div');
        div.class = "card"
        productContainer.appendChild(div);

        createNewProduct(div, 'img', product.image, "card-img-top");
        createNewProduct(div, 'div', null, "card-body");
        createNewProduct(cardBodyDiv, 'h5', product.itemTitle, "card-title")
        createNewProduct(cardBodyDiv, 'p', product.itemDescription, "card-text")
    });
}

function createNewProduct(parent, elemName, content, elemClass){
    const newElem = document.createElement(elemName);
    newElem.textContent = content;
    newElem.class = elemClass;
    parent.appendChild(newElem);

    if (elemName === 'div') {
        cardBodyDiv = newElem;
    }

    return newElem
}

/* <div class="card" id="product-card">
<img src="" alt="" class="card-img-top">
<div class="card-body">
    <h5 class="card-title">Product</h5>
    <p class="card-text">Card text</p>
</div>
</div> */