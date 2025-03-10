"use strict";

// Wait for the page to load before running scripts
document.addEventListener("DOMContentLoaded", function () {

  /**
   * Navbar Toggle Functionality
   */
  const overlay = document.querySelector("[data-overlay]");
  const navOpenBtn = document.querySelector("[data-nav-open-btn]");
  const navbar = document.querySelector("[data-navbar]");
  const navCloseBtn = document.querySelector("[data-nav-close-btn]");

  if (overlay && navOpenBtn && navbar && navCloseBtn) {
    const navElems = [overlay, navOpenBtn, navCloseBtn];

    navElems.forEach(elem => {
      elem.addEventListener("click", function () {
        navbar.classList.toggle("active");
        overlay.classList.toggle("active");
      });
    });
  } else {
    console.error("Navbar elements not found in the DOM.");
  }

  /**
   * Header & Go Top Button Activation on Scroll
   */
  const header = document.querySelector("[data-header]");
  const goTopBtn = document.querySelector("[data-go-top]");

  if (header && goTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.scrollY >= 80) {
        header.classList.add("active");
        goTopBtn.classList.add("active");
      } else {
        header.classList.remove("active");
        goTopBtn.classList.remove("active");
      }
    });
  } else {
    console.error("Header or go-top button not found in the DOM.");
  }

});


//everething for shopping cart

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    if (window.location.pathname.includes("cart.html")) {
        loadCartItems();
    }
});

function addToCart(image, name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ image, name, price }); // Now storing the image too
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

  cartItemsDiv.innerHTML = ""; // Clear previous cart display

  cart.forEach((item, index) => {
      let div = document.createElement("div");
      div.classList.add("cart-item");

      let img = document.createElement("img");
      img.src = item.image;
      img.alt = item.name;
      img.classList.add("cart-item-image");

      let span = document.createElement("span");
      span.textContent = `${item.name} - $${item.price}`;

      let button = document.createElement("button");
      button.textContent = "Remove";
      button.classList.add("remove-btn");
      button.addEventListener("click", () => removeFromCart(index));

      div.appendChild(img);
      div.appendChild(span);
      div.appendChild(button);
      cartItemsDiv.appendChild(div);

      totalPrice += item.price;
  });

  document.getElementById("total-price").textContent = "Total: $" + totalPrice;
}



function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCartItems(); // Refresh cart display
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
