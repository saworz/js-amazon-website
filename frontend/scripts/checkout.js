import { cart, deleteFromCart } from "../../backend/data/cart.js"
import { products } from "../../backend/data/products.js"

const checkoutItems = [];

function getCheckoutItems(productId, quantity) {
  products.forEach((product) => {
    if (product.id == productId) {
      checkoutItems.push({
        product: product,
        quantity: quantity
      });
    };
  });
};

const checkoutItemsHtml = [];

cart.forEach((product) => {
  getCheckoutItems(product.productId, product.quantity)
});

checkoutItems.forEach((checkoutItem) => {
  const html = `<div class="cart-item-container">
    <div class="delivery-date">
      Delivery date: Wednesday, June 15
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${checkoutItem.product.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${checkoutItem.product.name}
        </div>
        <div class="product-price">
          $${(checkoutItem.product.priceCents/100).toFixed(2)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${checkoutItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary">
            Update
          </span>
          <span class="delete-quantity-link link-primary js-delete-item" data-product-id=${checkoutItem.product.id}>
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
            name="delivery-option-${checkoutItem.product.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio" checked class="delivery-option-input"
            name="delivery-option-${checkoutItem.product.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio" class="delivery-option-input"
            name="delivery-option-${checkoutItem.product.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
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

document.querySelector('.js-order-summary').innerHTML = checkoutItemsHtml;

document.querySelectorAll('.js-delete-item').
forEach((button) => {
  button.addEventListener('click', () => {
    deleteFromCart(button, checkoutItems);
  });
});