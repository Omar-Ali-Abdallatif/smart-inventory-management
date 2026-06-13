# Smart Inventory

A responsive **Smart Inventory Management Web App** built with **HTML**, **CSS**, **Bootstrap**, and **Vanilla JavaScript**.  
The project allows users to add, display, search, filter, edit, delete, and import products from a local **JSON file** with support for **Dark Mode** and **Local Storage**.

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Project Preview](#-project-preview)
- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Project Structure](#-project-structure)
- [How the App Works](#-how-the-app-works)
- [JSON Import Feature](#-json-import-feature)
- [Product Object Structure](#-product-object-structure)
- [Local Storage](#-local-storage)
- [Dark Mode](#-dark-mode)
- [Search and Filter](#-search-and-filter)
- [Edit Product Feature](#-edit-product-feature)
- [Responsive Design](#-responsive-design)
- [How to Run the Project](#-how-to-run-the-project)
- [Important Notes](#-important-notes)
- [Possible Future Improvements](#-possible-future-improvements)
- [Author](#-author)

---

## 📖 Overview

**Smart Inventory** is a front-end inventory management system designed to help users manage a list of products in a simple and organized way.

The application provides a clean dashboard where users can:

- Add new products manually.
- Import products from a `products.json` file.
- View products as responsive cards.
- Search for products by text.
- Filter products by category.
- Edit existing product data.
- Delete products.
- Switch between Light Mode and Dark Mode.

This project is useful for practicing core front-end concepts such as **DOM manipulation**, **events**, **arrays**, **objects**, **JSON**, **Local Storage**, and **responsive layouts**.

---

## 🖼 Project Preview

The interface consists of two main sections:

1. **Add Product Section**  
   A form used to enter product details such as name, price, category, and description.

2. **Products Section**  
   A display area that shows all products as cards with product name, category, price, description, and action buttons.

Main UI elements include:

- Navbar with project name and action buttons.
- Import button.
- Dark Mode switch button.
- Product form.
- Search input.
- Category filter dropdown.
- Product cards.
- Product counter.
- Empty state message when no products exist.

---

## ✨ Features

### ✅ Add Product

Users can add a product by filling in:

- Product Name
- Product Price
- Product Category
- Product Description

If any required field is empty, the app shows a Bootstrap alert asking the user to fill all fields.

---

### ✅ Display Products

All products are displayed dynamically using JavaScript.  
Each product appears inside a card containing:

- Product name
- Product category badge
- Product price
- Product description
- Edit button
- Delete button

---

### ✅ Import Products from JSON

The app supports importing products from a local `products.json` file.  
Products are loaded only when the user clicks the **Import** button.

This means products from the JSON file do not appear automatically when the project opens.

---

### ✅ Edit Product

The Edit button allows users to update an existing product.

When the user clicks **Edit**:

- Product data is placed back into the form.
- The Add Product button changes to Update Product.
- After updating, the product is replaced in the same position.
- The product list is refreshed.

---

### ✅ Delete Product

Users can remove a product by clicking the Delete button.  
The product is removed from the array and the UI is updated immediately.

---

### ✅ Search Products

The search input allows users to search products dynamically.  
The search checks the visible text inside each product card.

Users can search by:

- Product name
- Category
- Price
- Description

---

### ✅ Filter by Category

Users can filter products by category using the dropdown list.

Available categories include:

- Electronics
- Clothing
- Books
- Home & Garden
- Sports
- Food & Beverages
- Healthy & Beauty
- Other

---

### ✅ Product Counter

The app displays the total number of products currently stored in the product list.

Example:

```text
15 Products
```

When products are added, imported, or deleted, the number updates automatically.

---

### ✅ Empty State

If there are no products, the app displays a clean empty state message:

```text
No Products found
Add your first product using the form on the left
```

This improves the user experience by clearly showing that the product list is currently empty.

---

### ✅ Dark Mode

The application includes a Dark Mode feature.

When Dark Mode is enabled:

- The background becomes dark.
- Cards use darker colors.
- Inputs and selects switch to dark styling.
- Text colors are adjusted for readability.
- The mode icon changes from moon to sun.

---

### ✅ Responsive Design

The layout is responsive and adapts to different screen sizes.

Product cards can be displayed as:

- 4 products per row on large screens.
- 3 products per row on medium screens.
- 2 products per row on tablets.
- 1 product per row on mobile screens.

---

## 🛠 Technologies Used

The project uses the following technologies:

- **HTML5** — page structure.
- **CSS3** — custom styling and responsive design.
- **Bootstrap** — layout, buttons, forms, alerts, and utilities.
- **Font Awesome** — icons.
- **JavaScript** — logic, DOM manipulation, events, search, filter, import, edit, and delete.
- **JSON** — external product data source.
- **Local Storage** — optional browser storage for saved products.

---

## 📁 Project Structure

Recommended project structure:

```text
Smart-Inventory/
│
├── index.html
├── products.json
├── README.md
│
├── CSS/
│   ├── bootstrap.min.css
│   ├── all.min.css
│   └── style.css
│
├── JS/
│   └── main.js
│
└── Icons/
    └── boxes-stacked-solid-full.svg
```

---

## ⚙ How the App Works

The app uses an array called `productList` to store all products during runtime.

```javascript
let productList = [];
```

When a product is added or imported, the product object is pushed into the array or assigned to it.

Then the app calls:

```javascript
displayProducts();
displayNumOfProducts();
```

These functions update the UI and the product counter.

---

## 📥 JSON Import Feature

The Import button loads products from the `products.json` file using `fetch()`.

Basic logic:

```javascript
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

        showAlert("Products Imported Successfully!", "success");

    } catch (error) {
        console.error(error);
        showAlert("Failed to import products!", "danger");
    }
}
```

### Important Behavior

Products from the JSON file appear only after clicking the **Import** button.

To prevent products from appearing automatically when opening the project, avoid calling:

```javascript
getProductsFromStorage();
```

on page load if the desired behavior is manual import only.

---

## 🧾 Product Object Structure

Each product should follow this structure:

```json
{
  "name": "Wireless Mouse",
  "price": 25,
  "category": "Electronics",
  "description": "Ergonomic wireless mouse with USB receiver."
}
```

Required fields:

| Field | Type | Description |
|---|---|---|
| `name` | String | Product name |
| `price` | Number or String | Product price |
| `category` | String | Product category |
| `description` | String | Product description |

Example `products.json`:

```json
[
  {
    "name": "Wireless Mouse",
    "price": 25,
    "category": "Electronics",
    "description": "Ergonomic wireless mouse with USB receiver."
  },
  {
    "name": "Cotton T-Shirt",
    "price": 15,
    "category": "Clothing",
    "description": "Soft cotton t-shirt available in multiple sizes."
  }
]
```

---

## 💾 Local Storage

The project includes functionality for storing products in the browser using `localStorage`.

Example:

```javascript
function addProductsInLocalStorage() {
    window.localStorage.setItem("products", JSON.stringify(productList));
}
```

And products can be retrieved using:

```javascript
function getProductsFromStorage() {
    let data = window.localStorage.getItem("products");
    if (data) {
        productList = JSON.parse(data);
        displayProducts();
        displayNumOfProducts();
    }
    emptyProducts();
}
```

### Note

If the goal is to show JSON products only after clicking Import, do not automatically load products from `localStorage` when the page starts.

---

## 🌙 Dark Mode

Dark Mode is controlled by toggling a class on the `body` element.

```javascript
body.classList.toggle("Dark-Mode");
```

The mode switch button changes its icon depending on the active mode:

- Moon icon for Light Mode.
- Sun icon for Dark Mode.

Dark Mode styles are defined in CSS using selectors like:

```css
.Dark-Mode #display-products .card {
    background-color: #3A3A3A;
    color: #E0E0E0;
    border: 1px solid #555555;
}
```

---

## 🔎 Search and Filter

### Search

Search works by listening to the `input` event on the search field.

```javascript
document.querySelector("#product-search").addEventListener("input", filterList);
```

The function checks each product card text and hides cards that do not match the search value.

---

### Category Filter

The category filter compares the selected category with the category text inside each product card.

```javascript
function filterByCategory(){
    const selectedCategory = document.getElementById("filter-category").value;
    const listOfProducts = document.querySelectorAll("#display-products .product-card");

    listOfProducts.forEach((item) => {
        let category = item.querySelector(".product-category").textContent.trim();

        if (selectedCategory === "All Categories" || category === selectedCategory) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    });
}
```

---

## ✏ Edit Product Feature

The project supports editing products using an `editIndex` variable.

```javascript
let editIndex = null;
```

When Edit is clicked:

```javascript
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
```

Then the `addProduct()` function checks if the app is adding or updating:

```javascript
if(editIndex === null){
    productList.push(productObj);
} else {
    productList[editIndex] = productObj;
    editIndex = null;
}
```

---

## 📱 Responsive Design

The product cards can be organized using CSS Grid.

```css
#display-products.products-grid {
    display: grid !important;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    padding: 1rem;
    align-items: stretch;
}
```

Responsive breakpoints:

```css
@media (max-width: 1199px) {
    #display-products.products-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 991px) {
    #display-products.products-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 575px) {
    #display-products.products-grid {
        grid-template-columns: 1fr;
    }
}
```

For empty state layout:

```css
#display-products.empty-products {
    display: flex !important;
    justify-content: center;
    align-items: center;
    min-height: 420px;
    padding: 1rem;
}
```

---

## 🚀 How to Run the Project

### 1. Download or clone the project

```bash
git clone https://github.com/your-username/smart-inventory.git
```

### 2. Open the project folder

```bash
cd smart-inventory
```

### 3. Run using Live Server

Open the folder in **Visual Studio Code** and run the project using the **Live Server** extension.

This is important because the JSON import feature uses `fetch()`.

Opening the file directly as:

```text
file:///...
```

may cause the JSON import to fail in some browsers.

---

## ⚠ Important Notes

- The `products.json` file must be in the correct path used by `fetch()`.
- If the code uses `fetch("./products.json")`, the file should be beside `index.html`.
- Product categories in JSON should match the category values in the HTML dropdown.
- Avoid using the same `id` for multiple product cards. Use a class such as `.product-card` instead.
- If products appear automatically after reloading, check `localStorage` or remove the automatic call to `getProductsFromStorage()`.
- To clear stored products from the browser, run this in the console:

```javascript
localStorage.removeItem("products");
```

or:

```javascript
localStorage.clear();
```

---

## 🧩 Possible Future Improvements

Future versions of this project could include:

- Product image upload.
- Product quantity field.
- Stock status such as In Stock, Low Stock, or Out of Stock.
- Sorting by price or name.
- Export products to JSON.
- Import products from a selected file instead of a fixed file path.
- Confirmation modal before deleting products.
- Form validation with custom messages.
- Save Dark Mode preference in Local Storage.
- Add product IDs.
- Add pagination for large product lists.
- Add charts for product statistics.

---

## 👨‍💻 Author

**Omar Ali Abdullatif Khalifa**

Software Engineer,QA Engineer & Front-End Developer.

---

## 📄 License

This project is open for learning and personal use.

You can modify, improve, and reuse the code for educational purposes.
