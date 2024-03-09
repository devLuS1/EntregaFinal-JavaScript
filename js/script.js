const products = [];

//PRODUCTS LS
const saveProductsLS = (products) => {
    localStorage.setItem("products", JSON.stringify(products));
}

const getProductsLS = () => {
    return JSON.parse(localStorage.getItem("products")) || [];
}

//CART LS
const saveCartLS = (products) => {
    localStorage.setItem("cart", JSON.stringify(products));
}

const getCartLS = () => {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

//PRODUCT LS
const getIdProductLS = () => {
    return JSON.parse(localStorage.getItem("product")) || 0;
}

const getIdCategoryLS = () => {
    return JSON.parse(localStorage.getItem("category")) || "All";
}

const totalAmountProducts = () => {
    const cart = getCartLS();

    return cart.length;
}

const subtotalCartProducts = () => {
    const cart = getCartLS();

    return cart.reduce((accumulator, item) => accumulator += (item.price * item.quantity), 0);
}

const emptyCart = () => {
    Swal.fire({
        title: "Are you sure you want to empty your bag?",
        text: "All items will be removed",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#78D6C6",
        cancelButtonColor: "#002147",
        confirmButtonText: "Yes, empty it!"
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("cart");
            cartUpload();
            uploadButtonCart();

            Swal.fire({
                title: "Deleted!",
                text: "Your bag is empty",
                icon: "success"
            });
        }
    });
}

//Detailed product information
const showProduct = (id) => {
    localStorage.setItem("product", JSON.stringify(id));
}

const showProductByCategory = (id) => {
    localStorage.setItem("category", JSON.stringify(id));
}

const findProduct = () => {
    const products = getProductsLS();
    const id = getIdProductLS();
    const product = products.find(item => item.id === id);

    return product;
}

//Cart
const productAddCart = () => {
    Toastify({
        text: "Added to Bag",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #78D6C6, #002147)",
            borderRadius: "1rem"
        },
        offset: {
            x: "2rem",
            y: "7rem"
        },
        onClick: function () { }
    }).showToast();

    const product = findProduct();
    const cart = getCartLS();

    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity++;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    
    saveCartLS(cart);
    uploadButtonCart();
    updatePriceTotal();
}

const deleteProductCart = (id) => {
    Toastify({
        text: "Item Removed",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #78D6C6, #002147)",
            borderRadius: "1rem"
        },
        offset: {
            x: "2rem",
            y: "7rem"
        },
        onClick: function () { }
    }).showToast();

    const cart = getCartLS();
    const productIndex = cart.findIndex(item => item.id === id);

    if (cart[productIndex].quantity > 1) {
        cart[productIndex].quantity--;
        saveCartLS(cart);
        cartUpload();
        uploadButtonCart();
        updatePriceTotal();
    } else {
        const uploadedCart = cart.filter(item => item.id !== id);
        saveCartLS(uploadedCart);
        cartUpload();
        uploadButtonCart();
        updatePriceTotal();
    }
}

function updatePriceTotal() {
    const cart = getCartLS();
    const total = cart.reduce((accumulator, item) => accumulator += (item.price * item.quantity), 0);

    document.getElementById("totalCart").textContent = `$${total}`;
}

const uploadButtonCart = () => {
    document.getElementById("cartNumber").innerHTML = totalAmountProducts();
}

//Function Products
async function productsUpload() {
    const response = await fetch('../js/products.json');
    const data = await response.json();

    const products = data;
    const category = getIdCategoryLS();
    let productContent = "";

    const filteredProducts = category === 'All' ? products : products.filter(item => item.category === category);
    const productTitleCategory = document.getElementById("productsTitleCategory");

    if (category != 'All') {
        const productCategory = products.find(item => item.category === category);
        productTitleCategory.innerText = productCategory.category;
    } else {
        productTitleCategory.innerText = "Clothing";
    }

    for (const product of filteredProducts) {
        productContent += `
        <div class="product">
        <a href="product.html" onclick="showProduct(${product.id})" class="text-decoration-none">
        <img class="productImage" src="${product.image}" alt="${product.name}">
        <div class="productDetail">
            <h2 class="productTitle">${product.name}</h2>
            <p class="productPrice">$${product.price}</p>
            </div>
        </a>
        </div>`;
    }

    document.getElementById("productsContainer").innerHTML = productContent;
}

saveProductsLS(products);
productsUpload();
uploadButtonCart();

function submitForm() {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Submitted Form",
        text: "Thank you for contacting us!",
        showConfirmButton: false,
        timer: 3000
    });
}