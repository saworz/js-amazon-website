import { addToCart, setHeaderCartQuantity } from "../../backend/data/cart.js";
import products from "../../backend/data/products.js";
import convertCentsToDollars from "../../backend/utils/priceConverting.js";
import setFavicon from "./favicon.js";


const drawItems = () => {
  let productsHTML = '';

  products.forEach((product) => {
    const html = `<div class="item-container">
    <div class="item-image-div">
      <img src="${product.image}" class="item-image">
    </div>
    <div class="item-description-div">
      ${product.name}
    </div>
    <div class="item-rating-div">
      <img src="images/ratings/rating-${product.rating.stars*10}.png" class="rating">
      <div class="rating-count-div">
        ${product.rating.count}
      </div>
    </div>
    <div class="item-price-div">
      $${convertCentsToDollars(product.priceCents)}
    </div>
    <div class="item-amount-div js-selected-amount-${product.id}">
      <select>
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>
    <div class="product-spacer"></div>
    <div class="item-add-div">
      <button class="add-button js-add-to-cart" data-product-id="${product.id}" onclick="">Add to Cart</button>
    </div>
  </div>`
  
  productsHTML += html;
  });
  
  document.querySelector('.js-products-grid').innerHTML = productsHTML;
};

const handleAddButton = () => {
  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const listValue = document.querySelector(`.js-selected-amount-${productId} select`).value
  
      for (let i=0; i < listValue; i++) {
        addToCart(productId);
      };
    });
  });
};

setFavicon();
drawItems();
handleAddButton();
setHeaderCartQuantity();