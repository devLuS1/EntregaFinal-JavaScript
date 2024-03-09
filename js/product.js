function productUpload() {
    const product = findProduct();
    let productContent = `<div class="productDetailedInfo">
    <img class="productImageDetailed" src="${product.image}" alt="${product.name}">
    <div class="productDetailedInfoText">
        <h2 class="productDetailedTitle">${product.name}</h2>
        <p class="productDetailedPrice">$${product.price}</p>
        <p class="productDetailedDescriptionTitle">Description</p>
        <p class="productDetailedDescription">${product.description}</p>
        <button class="productAddCart" onclick="productAddCart()">Add to Bag</button>
    </div>
    </div>`;

    document.getElementById("productContainer").innerHTML = productContent;
}

productUpload();
uploadButtonCart();