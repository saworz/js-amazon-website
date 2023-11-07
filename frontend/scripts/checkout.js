import { cart, deleteFromCart } from "../../backend/data/cart.js";
import products from "../../backend/data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

const checkoutItems = [];
const checkoutItemsHtml = [];

const today = dayjs();

cart.forEach((item) => {

  const html = `<div class="cart-item-container js-cart-item-container-${item.product.id}">
    <div class="delivery-date js-delivery-date">
      Delivery date: Wednesday, June 15
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${item.product.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${item.product.name}
        </div>
        <div class="product-price">
          $${(item.product.priceCents/100).toFixed(2)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${item.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary">
            Update
          </span>
          <span class="delete-quantity-link link-primary js-delete-item" data-product-id=${item.product.id}>
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>

        <div class="delivery-option">
          <input type="radio" class="delivery-option-input"
            name="delivery-option-${item.product.id}">
          <div>
            <div class="delivery-option-date">
              ${today.add(7, 'days').format('dddd, D, MMMM')}
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio" checked class="delivery-option-input"
            name="delivery-option-${item.product.id}">
          <div>
            <div class="delivery-option-date">
            ${today.add(3, 'days').format('dddd, D, MMMM')}
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio" class="delivery-option-input"
            name="delivery-option-${item.product.id}">
          <div>
            <div class="delivery-option-date">
            ${today.add(1, 'days').format('dddd, D, MMMM')}
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`

  checkoutItemsHtml.push(html)
});

document.querySelector('.js-order-summary').innerHTML = checkoutItemsHtml.join("");

function calculateQuantity() {
  let itemsQuantity = 0;

  cart.forEach((item) => {
    itemsQuantity += item.quantity;
  });

  document.querySelector('.js-cart-quantity').innerHTML = `          Checkout (<a class='return-to-home-link' href='main-page.html'>${itemsQuantity} items</a>)`;
};

calculateQuantity();

document.querySelectorAll('.js-delete-item').
forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    deleteFromCart(productId);

    const itemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
    itemContainer.remove();
    calculateQuantity();
  });
});
