// part of switch to dark mode and opposite
document.getElementById("mode-switch").innerHTML = `<i class="fa-solid fa-moon"></i>`;

function switchMode(){
    let body = document.body;
    let buttons = document.querySelectorAll("header section button");
    let buttonSwitcher = document.getElementById("mode-switch");

    body.classList.toggle("Dark-Mode");

    buttons.forEach(btn => {
        btn.classList.toggle("Dark-Mode-buttons");
    });

    if(body.classList.contains("Dark-Mode")){
        buttonSwitcher.innerHTML = `<i class="fa-solid fa-sun"></i>`;
    } else {
        buttonSwitcher.innerHTML = `<i class="fa-solid fa-moon"></i>`;
    }
}



// function add product
let productName = document.getElementById("Product-name");
let productPrice = document.getElementById("product-price");
let productCategory = document.getElementById("product-category");
let productDescription = document.getElementById("product-description");

let productList = [];
let editIndex = null;
emptyProducts();

//this method to make "enter" add product
productAddForm.addEventListener("keypress", function(event) {
    if(event.key === "Enter"){
        event.preventDefault();
        addProduct();
    }
});

function addProduct(){
    if(productName.value.trim() ==="" || productPrice.value.trim() ==="" || productCategory.value.trim() ==="" || productDescription.value.trim() ===""){
        showAlert("Please fill all fields!", "danger");
        return;
    }
        let productObj = {
            name: productName.value,
            price: productPrice.value,
            category: productCategory.value,
            description: productDescription.value,
        }
        if(editIndex === null){
                // Add new product
                productList.push(productObj);
                showAlert("Product Added Successfully!", "success");
            } else {
                // Update existing product
                productList[editIndex] = productObj;
                editIndex = null;
                let addUpdateBtn = document.getElementById("add-update-btn");
                addUpdateBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Add Product`;
                showAlert("Product Updated Successfully!", "success");
            }
            displayProducts();
            displayNumOfProducts();
            addProductsInLocalStorage();
    // productList.push(productObj);
    // displayProducts();
    // showAlert("Product Added Successfully!", "success");
    // displayNumOfProducts();
    // addProductsInLocalStorage(productList);
}


function displayProducts(){
    let productBox = "";
    for(let i = 0; i < productList.length; i++){
        productBox +=`
                        <div class="card product-card">
                            <div class="card-body">
                                <div class="d-flex justify-content-between mb-2">
                                    <div class="product-name fs-6">
                                        ${productList[i].name}
                                    </div>
                                    <div class="product-category fs-6">
                                        ${productList[i].category}
                                    </div>
                                </div>
                                <div class="mb-2 product-price fs-5">
                                    $ ${productList[i].price}
                                </div>
                                <div class="mb-3 product-description fs-6  fw-light">
                                    ${productList[i].description}
                                </div>
                                <div class="d-flex justify-content-between">
                                    <div class="product-buttons">
                                        <button class="btn btn-outline-primary btn-sm" type="button" onclick="editProduct(${i})">
                                            <i class="fa-solid fa-pen-to-square"></i> Edit
                                        </button>
                                    </div>
                                    <div class="">
                                        <button class="btn btn-outline-danger btn-sm" type="button" onclick = "deleteProduct(${i})">
                                            <i class="fa-solid fa-trash"></i> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
        `
    }
    let display = document.getElementById("display-products");
    display.className = "products-grid";
    display.innerHTML = productBox;
    clearInputs();
}

//clear inputs from textField after add product
function clearInputs(){
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDescription.value = "";
}

//add products in local storage
function addProductsInLocalStorage() {
    window.localStorage.setItem("products", JSON.stringify(productList));
}

//get product from local storage
function getProductsFromStorage() {
    let data = window.localStorage.getItem("products");
    if (data) {
        productList= JSON.parse(data);
        displayProducts();
        displayNumOfProducts();
    }
    emptyProducts(); 
}

//get product after reload page 
getProductsFromStorage();

//check if  local storage have products
if (localStorage.getItem("products")) {
    productList = JSON.parse(localStorage.getItem("products"));
}

//display Number of Products of Products
function displayNumOfProducts(){
    let total = productList.length;
    let staticsBox = `
    ${total} Products
    `
    document.getElementById("product-number").innerHTML = staticsBox;
}

//delete product from array & local storage
// function deleteProduct(index){
//     productList.splice(index,1);
//     addProductsInLocalStorage(productList);
//     displayProducts();
//     displayNumOfProducts();
//     emptyProducts();
// }
function deleteProduct(index){
    productList.splice(index, 1);

    if(editIndex === index){
        editIndex = null;
        clearInputs();

        let addUpdateBtn = document.getElementById("add-update-btn");
        addUpdateBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Add Product`;
    }

    addProductsInLocalStorage();
    displayProducts();
    displayNumOfProducts();
    emptyProducts();
}

//empty product
function emptyProducts(){
    let emptyBox =  `
        <div class="d-flex flex-column justify-content-center align-items-center text-center py-5" style="color:#6c757d;">
            <i class="fa-solid fa-box" style="font-size: 60px; margin-bottom: 15px;"></i>
            <h4 style="font-weight: 600; margin-bottom: 10px;">
                No Products found
            </h4>
            <p style="font-size: 13px; max-width: 300px;">
                Add your first product using the form on the left
            </p>
        </div>
    `;
    
    let display = document.getElementById("display-products");
    if (productList.length === 0){
        display.className = "empty-products";
        display.innerHTML = emptyBox;
    } else {
        
        displayProducts();
    }
}



// search products
document.querySelector("#product-search").addEventListener("input",filterList);

function filterList(){
    const searchInput = document.querySelector("#product-search");
    const filter = searchInput.value.toLowerCase();
    const listOfProjects = document.querySelectorAll("#display-products .product-card"); 

    listOfProjects.forEach((item) => {
        let text = item.textContent.toLowerCase();
        item.style.display = text.includes(filter) ? "" : "none";
    });
}

// category filter
function filterByCategory(){
    const selectedCategory = document.getElementById("filter-category").value;
    const listOfProducts = document.querySelectorAll("#display-products #product-card");
    listOfProducts.forEach((item) => {
        let category = item.querySelector(".product-category").textContent.trim();
        if (selectedCategory === "All Categories" || category === selectedCategory) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    });
}

// Dynamic Alert
function showAlert(message, type = "success") {
    const alertPlaceholder = document.getElementById("alertPlaceholder");

    const alertHTML = `
        <div class="alert alert-${type} alert-dismissible fade show d-flex align-items-center" role="alert">
            <i class="fa-solid ${type === "success" ? "fa-circle-check" : "fa-triangle-exclamation"} me-2"></i>
            <div>${message}</div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

    alertPlaceholder.innerHTML = alertHTML;

    setTimeout(() => {
        const alert = bootstrap.Alert.getOrCreateInstance(alertPlaceholder.querySelector(".alert"));
        alert.close();
    }, 3000);
}


// Import products from JSON file
document.getElementById("import").addEventListener("click", importProductsFromJson);

async function importProductsFromJson() {
    try {
        const response = await fetch("./products.json");

        if (!response.ok) {
            throw new Error("JSON file not found");
        }

        const importedProducts = await response.json();

        if (!Array.isArray(importedProducts)) {
            showAlert("Invalid JSON format!", "danger");
            return;
        }

        productList = importedProducts;

        displayProducts();
        displayNumOfProducts();
        addProductsInLocalStorage();

        showAlert("Products Imported Successfully!", "success");

    } catch (error) {
        console.error(error);
        showAlert("Failed to import products!", "danger");
    }
}

function editProduct(index){
    productName.value = productList[index].name;
    productPrice.value = productList[index].price;
    productCategory.value = productList[index].category;
    productDescription.value = productList[index].description;

    editIndex = index;

    let addUpdateBtn = document.getElementById("add-update-btn");
    addUpdateBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Update Product`;

    productName.focus();
}