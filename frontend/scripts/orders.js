import orders from "../../backend/data/ordersList.js";
import { addToCart, setHeaderCartQuantity } from "../../backend/data/cart.js";
import setFavicon from "./favicon.js";

const createSingleOrder = (order) => {
  const createOrderHeader = () => {
    const orderInfoHtml = `
    <div class="order-info">
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
        <div class="order-lower-text-id">${order.order_id}</div>
      </div>
    </div>`;
    return orderInfoHtml;
  };

  const getOrderProducts = (productObj) => {
    console.log(productObj)
    const product = productObj.product
    const productsSingleHtml = `   
    <div class="orders">       
      <div class="order-item">
        <div class="order-image-div">
          <img class="order-image" src=${product.image}>
        </div>
        <div class="order-description">
          <div class="description-title">
            ${product.name}
          </div>
          <div class="description-arrival">
            Arriving on: ${productObj.product.arrival}
          </div>
          <div class="description-quantity">
            Quantity: ${productObj.quantity}
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
      </div>
    </div>`;
    return productsSingleHtml;
  };

  const orderInfoHtml = createOrderHeader(order);
  let productsHtml = '';

  order.products.forEach((productObj) => {
    productsHtml += getOrderProducts(productObj);
  });
  return orderInfoHtml + productsHtml;
};

const createOrders = () => {
  let summarizedHtml = '';

  orders.forEach((order) => {
    summarizedHtml += createSingleOrder(order);
  });

  document.querySelector('.js-orders-container').innerHTML = summarizedHtml;
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
    order.products.forEach((productObj) => {
      const product = productObj.product;
      document.querySelectorAll(`.js-track-button-${product.id}`).forEach((button) => {button.addEventListener('click', () => {
        const trackingUrl = "tracking.html?itemId=" + product.id;
        window.location.href = trackingUrl;});
      });
    });
  });
};

setFavicon();
createOrders();
buyAgainButton();
moveToTracking();
setHeaderCartQuantity();