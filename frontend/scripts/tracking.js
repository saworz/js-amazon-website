import orders from "../../backend/data/ordersList.js"

const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get('itemId');
let item;

orders.forEach((order) => {
  if (order.id === itemId) {
    item = order;
  };
});
  
const html = `
  <div class="order-tracking">
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${item.arrival}
    </div>

    <div class="product-info">
      ${item.name}
    </div>

    <div class="product-info">
      Quantity: ${item.quantity}
    </div>

    <img class="product-image" src=${item.image}>

    <div class="progress-labels-container">
      <div class="progress-label">
        Preparing
      </div>
      <div class="progress-label current-status">
        Shipped
      </div>
      <div class="progress-label">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar"></div>
    </div>
  </div>`

document.querySelector('.js-tracking').innerHTML = html;
