import orders from "../../backend/data/ordersList.js"
import setFavicon from "./favicon.js";

const drawTrackedOrder = () => {
  const getTrackedOrderHtml = (item) => {
    const html = `
    <div class="order-tracking">
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>
  
      <div class="delivery-date">
        Arriving on ${item.arrival}
      </div>
  
      <div class="product-info">
        ${item.product.name}
      </div>
  
      <div class="product-info">
        Quantity: ${item.quantity}
      </div>
  
      <img class="product-image" src=${item.product.image}>
  
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
  
    return html;
  };

  const getMatchingItem = (itemId) => {
    let item;
    orders.forEach((order) => {
      order.products.forEach((productObj) => {
        const product = productObj.product
        if (product.id === itemId) {
          item = productObj;
        };
      });
    });
    return item;
  };
  
  const urlParams = new URLSearchParams(window.location.search);
  const itemId = urlParams.get('itemId');
  const item = getMatchingItem(itemId);
  document.querySelector('.js-tracking').innerHTML = getTrackedOrderHtml(item);
};

setFavicon();
drawTrackedOrder();
