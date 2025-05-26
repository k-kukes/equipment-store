export function initCart(){
    console.log("Initializing Cart");
    const productString = localStorage.getItem('cart');
    const products = JSON.parse(productString);
    console.log(products);

    renderCart(products);
    const purchaseProduct = document.getElementById('checkoutBtn');
    purchaseProduct.addEventListener('click', ()=>{
        alert("Purchased succesfully!")
    })
}

function renderCart(products){
        const cartContainer = document.querySelector('.shopping-cart-container')
        cartContainer.innerHTML = '';
    products.forEach(product => {
        const Productcontainer = createNewCartItem(cartContainer, 'div', null, "shopping-cart-items");
        createNewCartItem(Productcontainer, 'img', product.image, "");
        const productInfo = createNewCartItem(Productcontainer, 'div', null, "shopping-cart-item-info");
        createNewCartItem(productInfo, 'p', product.itemTitle, "productName");
        createNewCartItem(productInfo, 'p', product.itemDescription, "productDesc");
        const productPrice = createNewCartItem(Productcontainer, 'div', null, "shopping-cart-item-price");
        createNewCartItem(productPrice, 'strong', product.unitPrice, "productPrice");
        productPrice.appendChild(document.createElement('hr'));
        createNewCartItem(productPrice, 'p', "Quantity", "productPrice");
        const add = createNewCartItem(productPrice, 'input', "+", "")
        const quantity = createNewCartItem(productPrice, 'input', product.quantity, "")
        const substract = createNewCartItem(productPrice, 'input', "-", "")
        productPrice.appendChild(document.createElement('br'));
        productPrice.appendChild(document.createElement('br'));
        const remove = createNewCartItem(productPrice, 'input', "Remove", "");
        calculateTotal(products);

        add.addEventListener('click', ()=>{
            products.forEach(p => {
                if (p === product) {
                    p.quantity += 1;
                    localStorage.setItem('cart', JSON.stringify(products));
                    renderCart(JSON.parse(localStorage.getItem('cart')))
                    calculateTotal(products);
                }
            })
        })

        substract.addEventListener('click', ()=>{
            products.forEach(p => {
                if (p === product) {
                    if (p.quantity == 1) {
                        const newCart = products.filter(p => p != product);
                        localStorage.setItem('cart', JSON.stringify(newCart));
                        renderCart(JSON.parse(localStorage.getItem('cart')))
                        calculateTotal(newCart);
                    }
                    else{
                        p.quantity -= 1;
                        localStorage.setItem('cart', JSON.stringify(products));
                        renderCart(JSON.parse(localStorage.getItem('cart')))
                        calculateTotal(products);
                    }
                }
            })
        })

        remove.addEventListener('click', ()=>{
            const removeCart = products.filter(p => p != product);
            localStorage.setItem('cart', JSON.stringify(removeCart));
            renderCart(JSON.parse(localStorage.getItem('cart')))
            calculateTotal(removeCart);
        })
    });
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

    if (elemName == 'input' && content != "Remove") {
        newElem.type = "button";
        newElem.value = content;
        newElem.style.margin = "5px";
    }
    else if (elemName == 'input'){
        newElem.type = "button";
        newElem.value = content;
        newElem.style.width = "100%";
        newElem.className = "btn btn-danger";
    }
    return newElem
}

function calculateTotal(products){
    var total = 0;
    const totalTxt = document.getElementById('totalTxt');
    products.forEach(p => {
        const price = parseFloat(p.unitPrice.replace('$', ''));
        total += (price * p.quantity);
    })
    totalTxt.textContent = "$" + total;
}