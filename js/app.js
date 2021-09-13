const loadProducts = () => {
    const inputFiled = document.getElementById('input-field')
    const inputValue = inputFiled.value
        //    clear 
    inputFiled.value = ''
        // fetch 
    const url = `https://fakestoreapi.com/products`;
    fetch('https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json?fbclid=IwAR3QEMTi2O-4F6-Ey14y222NKwVZ_oK7GWAvTFnctwh2AGCls3VXYpmze0s')
        // fetch(url)
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

      <div class="text-div">
      <div>
      <h4 class="title">${product.title.slice(0,40)+"..."}</h4>
      <p>Category: ${product.category}</p>
      
      
      <h3>Price: $${product.price}</h3>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-info text-white">Add to cart</button>
      <button onclick="detailsBtn(${product.id})" class="btn button" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
      
      </div>
      <div class="rating-div mt-4 pt-2">
      <p class="rating">Rating: <span> ${product.rating.rate} <i class="far fa-star"></i></span></p>
      <p class="customer"> ${product.rating.count} <i class="fas fa-user-friends"></i> <span > customer rating this product</span></p>
      </div>
      </div>
      </div>
      `;
        document.getElementById("all-products").appendChild(div);
    }
};
// details button 
const detailsBtn = id => {
        const url = `https://fakestoreapi.com/products/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => showProductDetails(data))
    }
    // products detail show on modal 
const showProductDetails = (data) => {
    console.log(data)
    const div = document.getElementById('product-details')
    div.innerHTML = `
        <div class="d-lg-flex h-modal">
        <div class="w-100 h-100 d-flex justify-content-center">
        <img class=" w-50 p-3 " src="${data.image}">
        </div>
<div class="w-100 px-5 py-2 border border-info rounded-2">
<div class="d-flex">
<h4 class="w-90">${data.title} </h4>
<div class="w-10 d-flex justify-content-end"> <a href="#" class="text-decoration-none text-secondary"> <i class="fas fa-share-alt share"></i></a>
</div>
</div>
<small class="">${data.description.slice(0,150)+"..."} <a href="#" class="text-decoration-none text-danger">see more</a></small>
<hr>
<p class="d-lg-flex"><span class="text-warning">
<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i></span> &nbsp;<span class=""> | &nbsp;
Rating: ${data.rating.rate} &nbsp; |&nbsp; ${data.rating.count} people rate this product!</span></p>
<p>Catagories: <span class="text-pink">${data.category}</span></p>
<hr>
<h2>Price: <span class="text-pink">$${data.price}</span></h2>
<hr>
<div class="d-flex gap-2">
<button class="btn w-50 btn-dark rounded-2 text-center px-4 py-2">Add to cart</button>
<button class="btn w-50  rounded-2 border border-primary text-center px-4 py-2">Add to wishlist</button>
</div>
</div>
        </div>
        `
}


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