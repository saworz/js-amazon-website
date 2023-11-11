import orders from "../../backend/data/ordersList.js";
import { addToCart, calculateQuantity } from "../../backend/data/cart.js";
import setFavicon from "./favicon.js";


const drawOrders = () => {
  let productsHtml = '';

  orders.forEach((order) => {
    const orderInfoHtml = `
    <div class="order-placed">
      <span class="order-upper-text">Order placed:</span>
      <div class="order-lower-text">${order.order_placed}</div>
    </div>
    <div class="order-total">
      <span class="order-upper-text">Total:</span>
      <div class="order-lower-text">$${(order.total_price_cents/100).toFixed(2)}</div>
    </div>
    <div class="order-id">
      <span class="order-upper-text">Order ID:</span>
      <div class="order-lower-text">${order.order_id}</div>
    </div>
    `
    document.querySelector('.js-order-info').innerHTML = orderInfoHtml;

    order.products.forEach((product) => {
      const productsSingleHtml = `          
      <div class="order-item">
        <div class="order-image-div">
          <img class="order-image" src=${product.image}>
        </div>
        <div class="order-description">
          <div class="description-title">
            ${product.name}
          </div>
          <div class="description-arrival">
            Arriving on: ${product.arrival}
          </div>
          <div class="description-quantity">
            Quantity: ${product.quantity}
          </div>
          <button class="buy-again-button button-primary js-buy-again" data-product-id="${product.id}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
          <div class="product-actions-mobile">
            <a href="tracking.html">
              <button class="track-package-button button-secondary">
                Track package
              </button>
            </a>
          </div>
        </div>
        <div class="product-actions">
            <button class="track-package-button button-secondary js-track-button-${product.id}">
              Track package
            </button>
        </div>
      </div>`;
    
      productsHtml += productsSingleHtml;
    });
    document.querySelector('.js-products').innerHTML = productsHtml;
    });
};


const buyAgainButton = () => {
  document.querySelectorAll('.js-buy-again').forEach((button) => {
    button.addEventListener('click', () => {
      addToCart(button.dataset.productId);
    });
  });
};


const moveToTracking = () => {
  orders.forEach((order) => {
    order.products.forEach((product) => {
      const trackButton = document.querySelector(`.js-track-button-${product.id}`);
      trackButton.addEventListener('click', () => {
        const trackingUrl = "tracking.html?itemId=" + product.id;
        window.location.href = trackingUrl;
      });
    });
  });
};


setFavicon();
drawOrders();
buyAgainButton();
moveToTracking();
calculateQuantity();