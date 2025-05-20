import { fetchData } from "./fetchWrapper.js";

export async function initHome(){
    console.log("Home initializing");
    const uri = "data/catalog.json";
    const products = await fetchData(uri);
    renderCarousel(products);
}

function renderCarousel(products){
    const carouselIndicators = document.getElementById('carouselIndicator');
    const carouselContainer = document.getElementById('carouselItemContainer');
    let count = 0;

    products.products.forEach(p => {
        const indicator = document.createElement('button');
        indicator.setAttribute('data-bs-target', '#carouselExampleIndicators');
        indicator.setAttribute('data-bs-slide-to', count);
        indicator.setAttribute('aria-label', `Slide ${count + 1}`);

        if (count === 0) {
            indicator.classList.add('active');
            indicator.setAttribute('aria-current', 'true');
        }
        carouselIndicators.append(indicator);

        const carouselItem = document.createElement('div');
        carouselItem.className = "carousel-item";
        if (count === 0) {
            carouselItem.classList.add('active');
        }

        const imageProduct = document.createElement('img');
        imageProduct.src = p.image;
        imageProduct.className = "d-block w-100";

        carouselItem.append(imageProduct);
        carouselContainer.append(carouselItem);

        count++;
    });
}