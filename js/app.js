const loadProducts = () => {
    const url = `https://fakestoreapi.com/products`;
    // fetch('https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json?fbclid=IwAR3QEMTi2O-4F6-Ey14y222NKwVZ_oK7GWAvTFnctwh2AGCls3VXYpmze0s')
    fetch(url)
        .then((response) => response.json())
        .then((data) => showProducts(data));
};


// show all product in UI 
const showProducts = (products) => {
    // console.log(products)
    const allProducts = products.map((pd) => pd);
    for (const product of allProducts) {
        const image = product.image;
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `<div class="card h-100 single-product">
      <div class="image-div ">
    <img class="card-img-top w-50 h-100 p-3 " src="${image}">
      </div>
      <div >
      <h4 class="title">${product.title.slice(0,40)+"..."}</h4>
      <p>Category: ${product.category}</p>
      
      
      <h3>Price: $ ${product.price}</h3>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-info text-white">Add to cart</button>
      <button id="details-btn" class="btn button">Details</button>
      
      </div>
      <div class="rating-div mt-4 pt-2">
      <p class="rating">Rating: <span> ${product.rating.rate} <i class="far fa-star"></i></span></p>
      <p class="customer"> ${product.rating.count} <i class="fas fa-user-friends"></i> <span > customer rating this product</span></p>
      </div>
      </div>
      `;
        document.getElementById("all-products").appendChild(div);
    }
};

// product price update on side navbar 
let count = 0;
const addToCart = (id, price) => {
    count = count + 1;
    updatePrice("price", price);

    updateTaxAndCharge();
    document.getElementById("total-Products").innerText = count;
    updateTotal()
};

const getInputValue = (id) => {
    const element = document.getElementById(id).innerText;
    const converted = parseFloat(element);
    return converted;
};

// main price update function
const updatePrice = (id, value) => {
    const convertedOldPrice = getInputValue(id);
    const convertPrice = parseFloat(value);
    const total = convertedOldPrice + convertPrice;
    document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
    document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
    const priceConverted = getInputValue("price");
    if (priceConverted > 200) {
        setInnerText("delivery-charge", 30);
        setInnerText("total-tax", priceConverted * 0.2);
    }
    if (priceConverted > 400) {
        setInnerText("delivery-charge", 50);
        setInnerText("total-tax", priceConverted * 0.3);
    }
    if (priceConverted > 500) {
        setInnerText("delivery-charge", 60);
        setInnerText("total-tax", priceConverted * 0.4);
    }
};

//grandTotal update function
const updateTotal = () => {
    const grandTotal = getInputValue("price") + getInputValue("delivery-charge") +
        getInputValue("total-tax");
    document.getElementById("total").innerText = grandTotal.toFixed(2);
};
updateTotal()

loadProducts();