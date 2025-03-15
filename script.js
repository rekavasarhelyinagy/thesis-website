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

    navElems.forEach((elem) => {
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



// Your original updateCartCount function
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartCount = document.getElementById("cart-count");
  if (cartCount) cartCount.textContent = cart.length;
}

// Ensure cart count is updated when the page loads
document.addEventListener("DOMContentLoaded", updateCartCount);

function loadCartItems() {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.getElementById('cart-items');

  cartItemsContainer.innerHTML = '';

  cartItems.forEach((item, index) => {
      let cartItem = document.createElement('div');
      cartItem.className = 'cart-item';

      cartItem.innerHTML = `
          <img class="item-image" src="${item.image}" alt="${item.name}">
          <span class="item-name">${item.name}</span>
          <button class="delete-btn" onclick="removeItem(${index})">
              <ion-icon name="trash-outline"></ion-icon>
          </button>
          <span class="item-price">$${item.price}</span>
      `;

      cartItemsContainer.appendChild(cartItem);
  });

  updateTotalPrice();
  updateCartCount();
}


function updateTotalPrice() {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  let total = cartItems.reduce((sum, item) => sum + item.price, 0);
  document.getElementById('total-price').innerHTML = `Total: $${total.toFixed(2)}`;
}


function removeItem(index) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.splice(index, 1); // remove the item
    localStorage.setItem('cart', JSON.stringify(cartItems));
    loadCartItems(); // reload cart
}

function checkout() {
  if (JSON.parse(localStorage.getItem("cart"))?.length > 0) {
    window.location.href = "checkout.html";
  } else {
    alert("Your cart is empty!");
  }
}

function updateCartCount(){
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  document.getElementById('cart-count').innerText = cartItems.length;
}

function clearCart() {
  localStorage.removeItem("cart");
  loadCartItems();
  updateCartCount();
}

/* create-account page */

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("createAccountForm");
  const submitBtn = document.getElementById("submitBtn");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const inputs = form.querySelectorAll("input[required]"); // Only required inputs

  // Function to check form validity
  function checkFormValidity() {
      const allFilled = [...inputs].every(input => input.value.trim() !== "");
      const passwordsMatch = document.getElementById("password").value === document.getElementById("confirmPassword").value;
      submitBtn.disabled = !(allFilled && passwordsMatch);
  }

  // Enable "Create Account" button when form is valid
  inputs.forEach(input => {
      input.addEventListener("input", checkFormValidity);
  });

  // Activate "Proceed to Checkout" after account creation
  submitBtn.addEventListener("click", function () {
      alert("Account Created Successfully!");
      checkoutBtn.disabled = false;
  });

  // Proceed to Checkout action
  checkoutBtn.addEventListener("click", function () {
      window.location.href = "checkout.html";  // Change URL if necessary
  });
});