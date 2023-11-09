import orders from "../../backend/data/ordersList.js";
import { addToCart, calculateQuantity } from "../../backend/data/cart.js";
import setFavicon from "./favicon.js";


const drawOrders = () => {
  let ordersHtml = '';

  orders.forEach((order) => {
    const html = `          
    <div class="order-item">
      <div class="order-image-div">
        <img class="order-image" src=${order.image}>
      </div>
      <div class="order-description">
        <div class="description-title">
          ${order.name}
        </div>
        <div class="description-arrival">
          Arriving on: ${order.arrival}
        </div>
        <div class="description-quantity">
          Quantity: ${order.quantity}
        </div>
        <button class="buy-again-button button-primary js-buy-again" data-product-id="${order.id}">
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
          <button class="track-package-button button-secondary js-track-button-${order.id}">
            Track package
          </button>
      </div>
    </div>`;
  
    ordersHtml += html;
  });
  document.querySelector('.js-orders').innerHTML = ordersHtml;
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
    const trackButton = document.querySelector(`.js-track-button-${order.id}`);
    trackButton.addEventListener('click', () => {
      const trackingUrl = "tracking.html?itemId=" + order.id;
      window.location.href = trackingUrl;
    });
  });
};


setFavicon();
drawOrders();
buyAgainButton();
moveToTracking();
calculateQuantity();