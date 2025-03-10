document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    if (window.location.pathname.includes("cart.html")) {
        loadCartItems();
    }
});

function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartCount = document.getElementById("cart-count");
    if (cartCount) cartCount.textContent = cart.length;
}

function loadCartItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsDiv = document.getElementById("cart-items");
    let totalPrice = 0;

    cartItemsDiv.innerHTML = ""; // Clear the cart items display
    cart.forEach((item, index) => {
        let div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <span>${item.name} - $${item.price}</span>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsDiv.appendChild(div);
        totalPrice += item.price;
    });

    document.getElementById("total-price").textContent = "Total: $" + totalPrice;
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartItems();
    updateCartCount();
}

function checkout() {
    if (JSON.parse(localStorage.getItem("cart"))?.length > 0) {
        window.location.href = "checkout.html";
    } else {
        alert("Your cart is empty!");
    }
}

function clearCart() {
    localStorage.removeItem("cart");
    loadCartItems();
    updateCartCount();
}
