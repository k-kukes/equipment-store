export function initProductDetails(){
    console.log("Initializing product details");
    const productString = localStorage.getItem('product-id');
    const product = JSON.parse(productString);
    console.log(product);
}