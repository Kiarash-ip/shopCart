const products = [
  { id: 1, title: "Album 1", image: "../images/Album 1.png", price: 12.99 },
  { id: 2, title: "Album 2", image: "../images/Album 2.png", price: 14.99 },
  { id: 3, title: "Album 3", image: "../images/Album 3.png", price: 13.99 },
  { id: 4, title: "Album 4", image: "../images/Album 4.png", price: 15.99 },
  { id: 5, title: "Cofee", image: "../images/Cofee.png", price: 7.99 },
  { id: 6, title: "Shirt", image: "../images/Shirt.png", price: 49.99 },
];

let cart = [];

const $ = document;
const shopItemsContainer = $.querySelector(".shop-items");
const cartContainer = $.querySelector(".cart-items");
const cartTotalPrice = $.querySelector(".cart-total-price");
const purchaseBtn = $.querySelector(".btn-purchase");

function priceCounter(products) {
  cartTotalPrice.innerHTML = "";
  let totalPrice = products.reduce((acc, product) => {
    return (acc += product.quantity * product.price);
  }, 0);
  cartTotalPrice.innerHTML = `$${totalPrice.toFixed(2)}`;
}

let cartFragment = $.createDocumentFragment();

function cartGenerator(cart) {
  cartContainer.innerHTML = "";

  cart?.forEach((product) => {
    let containerCartDiv = $.createElement("div");
    containerCartDiv.classList.add("cart-row");
    containerCartDiv.insertAdjacentHTML(
      "beforeend",
      `
                  <div class="cart-item cart-column">
                      <img class="cart-item-image" src="${product.image}" width="100" height="100">
                      <span class="cart-item-title">${product.title}</span>
                  </div>
                  <span class="cart-price cart-column">$${product.price}</span>
                  <div class="cart-quantity cart-column">
                      <input class="cart-quantity-input" data-id="${product.id}"type="number" value="${product.quantity}" oninput="inputChangeHandler(event)">
                      <button class="btn btn-danger" data-id="${product.id}" onclick="removeFromCartHandler(event)" type="button">REMOVE</button>
                  </div>
            `
    );
    cartFragment.append(containerCartDiv);
  });
  cartContainer.append(cartFragment);
}

let productsFragment = $.createDocumentFragment();

function productGenerator(products) {
  products.forEach((product) => {
    let containerDiv = $.createElement("div");
    containerDiv.classList.add("shop-item");
    containerDiv.insertAdjacentHTML(
      "beforeend",
      `
            <span class="shop-item-title">${product.title}</span>
            <img class="shop-item-image" src="${product.image}" />
            <div class="shop-item-details">
              <span class="shop-item-price">$${product.price}</span>
              <button class="btn btn-primary shop-item-button" data-id="${product.id}" onclick="addToCartHandler(event)" type="button">
                ADD TO CART
              </button>
            </div>
          `
    );

    productsFragment.append(containerDiv);
  });

  shopItemsContainer.append(productsFragment);
}

function displayItems() {
  productGenerator(products);
}

function addToCartHandler(event) {
  let productId = +event.target.dataset.id;
  let selectedProduct = products.find((product) => product.id === productId);
  cart.push({ ...selectedProduct, quantity: 1 });
  cartGenerator(cart);
  priceCounter(cart);
}

function removeFromCartHandler(event) {
  let targetIndex = cart.findIndex(
    (item) => item.id === +event.target.dataset.id
  );
  cart.splice(targetIndex, 1);
  cartGenerator(cart);
  priceCounter(cart);
}

function inputChangeHandler(event) {
  let targetIndex = cart.findIndex(
    (item) => item.id === +event.target.dataset.id
  );
  cart[targetIndex].quantity = event.target.value;
}

purchaseBtn.addEventListener("click", () => {
  cart = [];
  cartGenerator(cart);
  priceCounter(cart);
});

displayItems();
