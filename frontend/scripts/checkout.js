import { cart, deleteFromCart } from "../../backend/data/cart.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

const today = dayjs();

function drawCheckoutItems() {
  const checkoutItemsHtml = [];
  cart.forEach((item) => {

    const html = `<div class="cart-item-container js-cart-item-container-${item.product.id}">
      <div class="delivery-date js-delivery-date" data-product-id=${item.product.id}>
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
};


let itemsQuantity = 0;

function calculateQuantity() {
  itemsQuantity = 0;

  cart.forEach((item) => {
    itemsQuantity += item.quantity;
  });

  document.querySelector('.js-cart-quantity').innerHTML = `          Checkout (<a class='return-to-home-link' href='main-page.html'>${itemsQuantity} items</a>)`;
};


function handleDeleteButton() {
  document.querySelectorAll('.js-delete-item').
  forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      deleteFromCart(productId);
  
      const itemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
      itemContainer.remove();
      calculateQuantity();
      summarizeOrderCost();
    });
  });
};


function createOrderSummary(totalDeliveryPriceCents, totalItemsPriceCents) {
  const beforeTaxCents = totalDeliveryPriceCents + totalItemsPriceCents;
  const taxValue = 0.1;
  const taxPrice = beforeTaxCents * taxValue;
  const orderTotal = beforeTaxCents + taxPrice;
  const html = `          
  <div class="payment-summary-title">
    Order Summary
  </div>

  <div class="payment-summary-row">
    <div>Items (${itemsQuantity}):</div>
    <div class="payment-summary-money">$${(totalItemsPriceCents/100).toFixed(2)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${(totalDeliveryPriceCents/100).toFixed(2)}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${(beforeTaxCents/100).toFixed(2)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${(taxPrice/100).toFixed(2)}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${(orderTotal/100).toFixed(2)}</div>
  </div>

  <button class="place-order-button button-primary">
    Place your order
  </button>`

  document.querySelector('.js-payment-summary').innerHTML = html
};


function summarizeOrderCost() {
  
  let totalDeliveryPriceCents = 0;
  let totalItemsPriceCents = 0;

  cart.forEach((item) => {
    const deliveryOptions = document.querySelectorAll('input[name="delivery-option-' + item.product.id + '"]');

    for (let i=0; i<item.quantity; i++) {
      totalItemsPriceCents += item.product.priceCents;
    };

    for(let i=0; i<deliveryOptions.length; i++) {
      if (deliveryOptions[i].checked) {
        if (i === 1) {
          totalDeliveryPriceCents += 499;
        } else if (i === 2) {
          totalDeliveryPriceCents += 999;
        };
      };
    };
  });

  createOrderSummary(totalDeliveryPriceCents, totalItemsPriceCents);
};


function setDeliveryDate(productId, optionIndex) {
  const deliveryDate = document.querySelectorAll('.js-delivery-date');
  deliveryDate.forEach((date) => {
    if (date.dataset.productId === productId) {
      let delivery;

      if (optionIndex === 0) {
        delivery = today.add(7, 'days').format('dddd, MMMM D')
      }
      else if (optionIndex === 1) {
        delivery = today.add(3, 'days').format('dddd, D, MMMM')
      }
      else if (optionIndex === 2) {
        delivery = today.add(1, 'days').format('dddd, D, MMMM')
      };

      date.innerHTML = `Delivery date: ${delivery}`;
    };
  });
};


function handleDeliveryChange() {
  cart.forEach((item) => {
    const deliveryOptions = document.querySelectorAll('input[name="delivery-option-' + item.product.id + '"]');
    
    deliveryOptions.forEach((option, index) => {
      setDeliveryDate(item.product.id, 1);
      
      option.addEventListener('change', () => {
        summarizeOrderCost();
        setDeliveryDate(item.product.id, index);
      });
    });
  
  });
};


drawCheckoutItems();
handleDeleteButton();
handleDeliveryChange();
calculateQuantity();
summarizeOrderCost();