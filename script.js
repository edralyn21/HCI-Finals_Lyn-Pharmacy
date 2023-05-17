// start products data
var products = [{
    "product-type": "medicines",
    "on-cart": 0,
    "name": "Paracetamol",
    "price": 20,
    "image": "img/paracetamol.webp",
    "description": "Paracetamol is a commonly used medicine for pain relief and fever reduction."
},
{
    "product-type": "medicines",
    "on-cart": 0,
    "name": "Ibuprofen",
    "price": 20,
    "image": "img/ibuprofen.webp",
    "description": "Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) used to relieve pain, reduce inflammation, and lower fever."
},
{
    "product-type": "medicines",
    "on-cart": 0,
    "name": "Salbutamol",
    "price": 20,
    "image": "img/salbutamol.webp",
    "description": "Salbutamol is a bronchodilator used to treat bronchospasm and asthma."
},
{
    "product-type": "vitamins",
    "on-cart": 0,
    "name": "Growee",
    "price": 20,
    "image": "img/growee.webp",
    "description": "Growee is a multivitamin syrup specially formulated for children to support their growth and development."
},
{
    "product-type": "vitamins",
    "on-cart": 0,
    "name": "Centrum",
    "price": 20,
    "image": "img/centrum.webp",
    "description": "Centrum is a multivitamin supplement that provides essential nutrients to support overall health and well-being."
},
{
    "product-type": "vitamins",
    "on-cart": 0,
    "name": "Tiki-Tiki",
    "price": 20,
    "image": "img/tiki-tiki.webp",
    "description": "Tiki-Tiki is a multivitamin syrup that helps meet the nutritional needs of children for proper growth and development."
},
{
    "product-type": "skin-care",
    "on-cart": 0,
    "name": "Papaya Soap",
    "price": 20,
    "image": "img/papaya-soap.webp",
    "description": "Papaya soap is a natural soap enriched with papaya extract, known for its skin brightening and exfoliating properties."
},
{
    "product-type": "skin-care",
    "on-cart": 0,
    "name": "Face Wash",
    "price": 20,
    "image": "img/face-wash.webp",
    "description": "Face wash is a cleansing product formulated to remove dirt, oil, and impurities from the face, leaving it clean and refreshed."
},
{
    "product-type": "skin-care",
    "on-cart": 0,
    "name": "Moisturizer",
    "price": 20,
    "image": "img/moisturizer.webp",
    "description": "Moisturizer is a hydrating lotion or cream that helps nourish and protect the skin, keeping it moisturized and supple."
},
{
    "product-type": "makeup",
    "on-cart": 0,
    "name": "Foundation",
    "price": 20,
    "image": "img/Foundation.webp",
    "description": "Foundation is a cosmetic product used to even out the skin tone, provide coverage, and create a smooth base for makeup."
},
{
    "product-type": "makeup",
    "on-cart": 0,
    "name": "Concealer",
    "price": 20,
    "image": "img/concealer.webp",
    "description": "Concealer is a makeup product used to cover blemishes, dark circles, and other imperfections on the skin."
},
{
    "product-type": "makeup",
    "on-cart": 0,
    "name": "Eye Liner",
    "price": 20,
    "image": "img/eye-liner.webp",
    "description": "Eye liner is a cosmetic product used to define the eyes and create different eye makeup looks."
}];
// end product data




// start displaying the products into html
var cartCount = 0;
var cartCountElement = document.getElementById("cartCount");
var productContainer = document.getElementById("product-container");
var cartProductsContainer = document.getElementById("cart-products");



//function to update products
function updateProducts() {
    productContainer.innerHTML = "";

    var groupedProducts = {};
    products.forEach(function (product) {
        var productType = product["product-type"];
        if (!groupedProducts[productType]) {
            groupedProducts[productType] = [];
        }
        groupedProducts[productType].push(product);
    });

    for (var productType in groupedProducts) {
        if (groupedProducts.hasOwnProperty(productType)) {
            var section = document.createElement("div");
            section.className = "product-type-section";
            section.id = productType;

            var heading = document.createElement("h1");
            heading.className = "product-type";
            heading.textContent = productType.charAt(0).toUpperCase() + productType.slice(1);
            section.appendChild(heading);

            var productsContainer = document.createElement("div");
            productsContainer.className = "products";
            section.appendChild(productsContainer);

            groupedProducts[productType].forEach(function (product) {
                var productDiv = document.createElement("div");
                productDiv.className = "product";

                var img = document.createElement("img");
                img.src = product.image;
                img.alt = "product-image";
                productDiv.appendChild(img);

                var description = document.createElement("p");
                description.className = "product-description";
                description.textContent = product.name;
                productDiv.appendChild(description);

                var price = document.createElement("p");
                price.className = "product-price";
                price.textContent = "Price: " + product.price;
                productDiv.appendChild(price);

                var count = document.createElement("p");
                count.className = "product-count";
                count.setAttribute("data-count", product["on-cart"]);
                count.textContent = "On cart: " + product["on-cart"];
                productDiv.appendChild(count);

                var button = document.createElement("button");
                button.className = "add-to-cart";
                button.textContent = "Add to Cart";
                button.addEventListener("click", function () {
                    product["on-cart"]++;
                    cartCount++;
                    count.textContent = "On cart: " + product["on-cart"];
                    updateProducts();
                    updateCart();
                });
                productDiv.appendChild(button);

                productsContainer.appendChild(productDiv);
            });

            productContainer.appendChild(section);
        }
    }
}




// Function to update the cart
function updateCart() {
    cartProductsContainer.innerHTML = "";

    if (cartCount === 0) {
        var message = document.createElement("h1");
        message.textContent = "Your Cart is Empty";

        cartProductsContainer.appendChild(message);
        return;
    }

    // Loop through the products
    products.forEach(function (product) {
        if (product["on-cart"] > 0) {
            var cartItem = document.createElement("div");
            cartItem.className = "product"; // Use the same class as product

            var img = document.createElement("img");
            img.src = product.image;
            img.alt = "product-image";
            cartItem.appendChild(img);

            var name = document.createElement("p");
            name.className = "product-description"; // Use the same class as product description
            name.textContent = product.name;
            cartItem.appendChild(name);

            var totalPrice = product.price * product["on-cart"]; // Calculate the total price
            var price = document.createElement("p");
            price.className = "product-price"; // Use the same class as product price
            price.textContent = "Total Price: " + totalPrice; // Display the total price
            cartItem.appendChild(price);

            var quantity = document.createElement("p");
            quantity.className = "product-count"; // Use the same class as product count
            quantity.textContent = "Quantity: " + product["on-cart"];
            cartItem.appendChild(quantity);

            var removeButton = document.createElement("button");
            removeButton.textContent = "Remove from cart";
            removeButton.addEventListener("click", function () {
                if (product["on-cart"] > 0) {
                    product["on-cart"]--;
                    cartCount--
                }
                updateProducts();
                updateCart();
            });
            cartItem.appendChild(removeButton);

            cartProductsContainer.appendChild(cartItem);
        }
    });
    //end product foreach
}
//end cartUpdate func

// Initial update of the cart and products
updateProducts();
updateCart();
