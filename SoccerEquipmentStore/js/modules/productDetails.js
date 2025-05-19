export async function initProductDetails() {
    console.log("Initializing product details");

    
    const productId = localStorage.getItem('product-id');
    if (!productId) {
        alert("No product selected.");
        return;
    }

    
    const response = await fetch("data/catalog.json");
    const catalog = await response.json();

  
    const product = catalog.products.find(p => p.itemId === productId);
    if (!product) {
        alert("Product not found.");
        return;
    }

  
    const category = catalog.categories.find(c => c.categoryId === product.categoryId)?.categoryName || "Unknown";

  
    document.getElementById("productTitle").textContent = product.itemTitle;
    document.getElementById("productImage").src = product.image;
    document.getElementById("productPrice").textContent = product.unitPrice;
    document.getElementById("productCategory").textContent = category;
    document.getElementById("productAvailability").textContent = product.quantity > 0 ? "In Stock" : "Out of Stock";
    document.getElementById("productDescription").textContent = product.itemDescription;

   
    const features = [product.brand, product.make, "High Quality"];
    const ul = document.getElementById("productFeatures");
    features.forEach(feature => {
        const li = document.createElement("li");
        li.textContent = feature;
        ul.appendChild(li);
    });

    console.log("Product loaded:", product);
}
