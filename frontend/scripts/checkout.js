import { cart, deleteFromCart, updateCart, clearCart, getCartQuantity, setCheckoutCartQuantity } from "../../backend/data/cart.js";
import { orders, addToOrders, saveOrdersToStorage } from "../../backend/data/ordersList.js"
import convertCentsToDollars from "../../backend/utils/priceConverting.js";
import deliveryOptions from "../../backend/data/deliveryOptions.js";
import { addDays, getTodayDate } from "../../backend/utils/formatDate.js";
import setFavicon from "./favicon.js";


const emptyCartInfo = () => {
  const html = `
  <div class="cart-item-container">
    Your cart is empty.
    <button onclick="location.href = 'main-page.html'", class="back-to-store-button button-primary">
      Go back to store
    </button>
  </div>`

  document.querySelector('.js-order-summary').innerHTML = html;
};

const singleCheckoutItemHtml = (item) => {
  const html = `
  <div class="cart-item-container js-cart-item-container-${item.product.id}">
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
          <div class="product-display-quantity js-display-quantity-${item.product.id}">
            <span>
              Quantity: <span class="quantity-label">${item.quantity}</span>
            </span>
          </div>

          <span class="update-quantity-link link-primary js-update-quantity" data-product-id=${item.product.id}>
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
              ${addDays(7)}
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
            ${addDays(3)}
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
            ${addDays(1)}
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`

  return html
};

const drawCheckoutItems = () => {
  const checkoutItemsHtml = [];
  if (cart.length === 0) {
    emptyCartInfo();
  } 
  else {
    cart.forEach((item) => {
      checkoutItemsHtml.push(singleCheckoutItemHtml(item));
    });
  document.querySelector('.js-order-summary').innerHTML = checkoutItemsHtml.join("");
  };
};

const clearItemContainer = (productId) => {
  const itemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
  itemContainer.remove();
  setCheckoutCartQuantity();
  createOrderSummary();

  if (cart.length === 0) {
    emptyCartInfo();
  };
};

const handleDeleteButton = () => {
  document.querySelectorAll('.js-delete-item').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      deleteFromCart(productId);
      clearItemContainer(productId);
    });
  });
};

const createOrderSummary = () => {
  const html = `          
  <div class="payment-summary-title">
    Order Summary
  </div>

  <div class="payment-summary-row">
    <div>Items (${getCartQuantity()}):</div>
    <div class="payment-summary-money">$${convertCentsToDollars(getItemsPrice())}</div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${convertCentsToDollars(getDeliveryPrice())}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${convertCentsToDollars(getBeforeTaxPrice())}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${convertCentsToDollars(getTaxPrice())}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${convertCentsToDollars(getTotalPrice())}</div>
  </div>

  <button class="place-order-button button-primary js-place-order">
    Place your order
  </button>`

  document.querySelector('.js-payment-summary').innerHTML = html
};

const getDeliveryPrice = () => {
  let totalDeliveryPrice = 0;

  cart.forEach((item) => {
    const deliveryList = document.querySelectorAll('input[name="delivery-option-' + item.product.id + '"]');

    for(let i=0; i<deliveryList.length; i++) {
      if (deliveryList[i].checked) {
          totalDeliveryPrice += deliveryOptions[i].priceCents;
      };
    };
  });
  return totalDeliveryPrice;
};

const getItemsPrice = () => {
  let totalItemsPrice = 0;
  
  cart.forEach((item) => {
    for (let i=0; i<item.quantity; i++) {
      totalItemsPrice += item.product.priceCents;
    };
  });
  return totalItemsPrice;
};

const getBeforeTaxPrice = () => {
  return getDeliveryPrice() + getItemsPrice();
};

const getTaxPrice = () => {
  const taxValue = 0.1;
  const afterTaxPrice = getBeforeTaxPrice()*taxValue;
  return afterTaxPrice;
};

const getTotalPrice = () => {
  return getDeliveryPrice() + getItemsPrice() + getTaxPrice();
};

const getDeliveryDays = (optionIndex) => {
  return deliveryOptions[optionIndex].days;
};

const setDeliveryDate = (productId, optionIndex) => {
  document.querySelectorAll('.js-delivery-date').forEach((date) => {
    if (date.dataset.productId === productId) {
      const deliveryDays = getDeliveryDays(optionIndex);
      date.innerHTML = `Delivery date: ${addDays(deliveryDays)}`;
    };
  });
};

const handleDeliveryChange = () => {
  cart.forEach((item) => {
    document.querySelectorAll('input[name="delivery-option-' + item.product.id + '"]').forEach((option, index) => {
      setDeliveryDate(item.product.id, 1);

      option.addEventListener('change', () => {
        setDeliveryDate(item.product.id, index);
        createOrderSummary();
      });
    });
  });
};

const displayQuantityList = (productId) => {
  const listElement =     
  `Quantity: 
  <select id="js-dropdown-list-${productId}" class="hidden">
    <option value=""></option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>
    <option value="9">9</option>
    <option value="10">10</option>
  </select>`
  document.querySelector(`.js-display-quantity-${productId}`).innerHTML = listElement;

  const dropdownList = document.getElementById(`js-dropdown-list-${productId}`);
  dropdownList.addEventListener('change', () => {
    const selectedOption = dropdownList.options[dropdownList.selectedIndex];
    const selectedValue = Number(selectedOption.value);
    updateCart(productId, selectedValue);

    drawUI();
    handleDeleteButton();
    handleDeliveryChange();
  });
};

const updateQuantityInCart = () => {
  document.querySelectorAll('.js-update-quantity').forEach((button) => {
    button.addEventListener('click', () => {
      displayQuantityList(button.dataset.productId);
    });
  });
};

const generateRandomId = () => {
  let result = '';
  let length = 30;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

const addCartToOrders = () => {
  const newOrder = {
    order_placed: getTodayDate(),
    total_price_cents: getTotalPrice(),
    order_id: generateRandomId(),
    products: cart,
  };

  addToOrders(newOrder);
};

const placeOrder = () => {
  document.querySelector('.js-place-order').addEventListener('click', () => {
    addCartToOrders();
    clearCart();
    drawUI();
  });
};

const drawUI = () => {
  drawCheckoutItems();
  updateQuantityInCart();
  setCheckoutCartQuantity();
  createOrderSummary();
};

setFavicon();
drawUI();
handleDeleteButton();
handleDeliveryChange();
placeOrder();