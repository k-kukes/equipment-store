export function initCart(){
    console.log("Initializing Cart");
    const productString = localStorage.getItem('product-id');
    const products = JSON.parse(productString);
    console.log(products);

    renderCart(products);
}

function renderCart(products){
    const cartContainer = document.querySelector('.shopping-cart-container')
    const Productcontainer = createNewCartItem(cartContainer, 'div', null, "shopping-cart-items");
    createNewCartItem(Productcontainer, 'img', products.image, "");
    const productInfo = createNewCartItem(Productcontainer, 'div', null, "shopping-cart-item-info");
    createNewCartItem(productInfo, 'p', products.itemTitle, "productName");
    createNewCartItem(productInfo, 'p', products.itemDescription, "productDesc");
    const productPrice = createNewCartItem(Productcontainer, 'div', null, "shopping-cart-item-price");
    createNewCartItem(productPrice, 'strong', products.unitPrice, "productPrice");
    productPrice.appendChild(document.createElement('hr'));
    createNewCartItem(productPrice, 'p', "Quantity", "productPrice");
    createNewCartItem(productPrice, 'input', "+", "")
    createNewCartItem(productPrice, 'input', "0", "")
    createNewCartItem(productPrice, 'input', "+", "")
    productPrice.appendChild(document.createElement('br'));
    productPrice.appendChild(document.createElement('br'));
    createNewCartItem(productPrice, 'input', "Remove", "")
}

function createNewCartItem(parent, elemName, content, elemClass){
    const newElem = document.createElement(elemName);
    newElem.className = elemClass;
    newElem.textContent = content;
    parent.appendChild(newElem);

    if (elemName === 'img'){
        newElem.src = content;
        newElem.style.height = "10rem";
    }

    if (elemName == 'input') {
        newElem.type = "button";
        newElem.value = content;
    }

    return newElem
}

                // <br>
                // <input type="button" class="removeItemQty" value="-">
                // <input type="button" class="itemQty" value="0">
                // <input type="button" class="addItemQty" value="+">
                // <br>
                // <input type="button" class="removeItem" value="Remove"></input>