import orders from "../../backend/data/orders.js";

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
      <button class="buy-again-button button-primary">
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
      <a href="tracking.html">
        <button class="track-package-button button-secondary">
          Track package
        </button>
      </a>
    </div>
  </div>`;

  ordersHtml += html;
});

document.querySelector('.js-orders').innerHTML = ordersHtml;